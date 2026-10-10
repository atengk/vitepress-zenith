# 0014. Docker 镜像流水线解耦、拓扑防双跑门禁与原子发版加固

为了彻底消灭分支推送与版本标签推送并发时的重复构建开销、消除云端镜像竞态条件，并将本地发版过程提升至原子级故障防御标准，我们决定将 Docker 容器镜像流水线从发版流水线中独立解耦，引入基于 Git 原生拓扑自检的防双跑感知门禁，并重构本地发版脚本为分支与标签原子合并推送。

## 决策背景

在代码库演进至 `v1.4.x` 阶段，随着开源工程化体系（基于 `atengk/oss-template`）的深化演进，我们在 CI/CD 交付链路中发现了以下潜在痛点与算力浪费：
1. **发版时的双重构建与竞态浪费**：在常规发版流程中，维护者通常先将版本号 Bump 提交推送到主干分支，紧接着推送附注 Tag。此前 `docker.yml` 同时监听分支 Push 与 Tag Push，导致单次发版瞬间触发两套并行的 Docker 构建流水线；这不仅浪费多架构（`amd64`/`arm64`）编译的长达数分钟的 Runner 算力，还可能在 GHCR 远端引发 `latest` 标签竞态覆盖；
2. **非原子推送导致的脏状态与中断风险**：此前本地发版脚本（`scripts/release.sh`）采用“先推分支提交、再推版本标签”的分步推送策略（`git push origin $CURRENT_BRANCH && git push origin $TARGET_VERSION`）。若在两次网络调用之间发生网络抖动、凭证失效或并发冲突，极易造成“分支已入库但 Tag 失败”或“本地与远端版本状态脱节”的半提交死锁；
3. **主干双分支兼容性与最小权限原则**：下游衍生项目在初始化或历史迁移过程中，主干可能处于 `main` 或 `master`。若 CI 仅硬编码单分支触发，将导致分支兼容中断；同时工作流若未显式收紧 `permissions`，可能造成过宽的 Token 权限暴露。

## 决策内容

1. **Docker 流水线独立解耦与 Git 原生拓扑防双跑门禁**：
   - 将多架构 Docker 构建全量收敛至独立流水线 `.github/workflows/docker.yml`，解除与 `release.yml` 的强耦合依赖；
   - 在 `docker.yml` 中设计纯原生 Shell 拓扑自检步骤（`check-tag`）：
     - 当触发事件为分支推送（`event_name == 'push'` 且 `ref_type == 'branch'`）时，执行 `TAGS=$(git tag --points-at HEAD)`；
     - 若当前提交已附加版本标签（如 `v1.4.2`），则输出 `is_release_tag=true`，并在 `build` 任务前置条件（`if: steps.check-tag.outputs.is_release_tag != 'true'`）中直接跳过分支构建；
     - 当事件为手动调度（`workflow_dispatch`）或无 Tag 的常规开发提交时，正常执行构建；当 Tag 推送触发时，则完整生成 SemVer 五维标签矩阵；
     - 彻底杜绝发版瞬间分支与 Tag 双重跑现象，Runner 耗时与镜像推送次数减少 50%。
2. **分支与版本标签原子合并推送 (`Atomic Push`)**：
   - 重构 `scripts/release.sh` 推送指令为原生单次原子推送：
     ```bash
     git push origin "$CURRENT_BRANCH" "$TARGET_VERSION"
     ```
   - Git 协议在此模式下会将分支指针更新与标签引用作为一个不可分割的原子事务提交至远端，要么全成功，要么全失败，彻底消除半提交悬空状态；
   - **自愈式回滚防护**：当网络或鉴权导致推送失败时，脚本自动捕获并执行 `git tag -d "$TARGET_VERSION"` 抹除本地临时标签，杜绝本地残留脏 Tag 阻塞后续重试。
3. **`main` / `master` 双主干平滑兼容**：
   - 在 `docker.yml` 与 `release.yml` 中统一扩展触发分支矩阵为 `branches: [main, master]`；
   - 在本地 `scripts/release.sh` 的分支前置校验中，原生支持 `main` 或 `master` 自动识别放行。
4. **工作流安全权限细粒度收紧**：
   - 显式声明工作流顶层权限（`packages: write`、`contents: read` 等），杜绝全局宽松权限，完全符合 GitHub 供应链最佳安全实践。

## 考虑备选

- **备选 A（继续在 release.yml 尾部串行调用 docker 构建）**：导致 `release.yml` 过于庞大臃肿，违背职责单一原则；且无法满足日常主干提交自动刷新 Docker 测试镜像的诉求；
- **备选 B（通过 GitHub API 查询 Release 状态）**：增加额外的 `GITHUB_TOKEN` 请求与 API 限流风险；使用 Git 原生 `git tag --points-at HEAD` 纯本地执行，零网络开销、毫秒级响应；
- **备选 C（分步推送并在失败时人工排查）**：严重依赖维护者个人排查经验，易在 CI 中遗留无法对齐的幽灵版本。

## 产生的后果

- **正面影响**：
  - 发版体验达到工业级原子防御标准，杜绝发版中间态；
  - 节省大量 GitHub Actions 双架构容器编译时间与算力配额；
  - GHCR 镜像标签与 Git 提交版本绝对一致，无并发竞态；
  - 兼容 `main` / `master` 任意命名偏好，降低下游开发者采用门槛。
- **负面成本/注意事项**：
  - `git tag --points-at HEAD` 依赖于 `actions/checkout` 拉取全量或足够的提交历史（`fetch-depth: 0`），需确保检出步骤包含完整的引用图谱。
