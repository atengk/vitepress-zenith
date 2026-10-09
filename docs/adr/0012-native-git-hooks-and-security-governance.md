# 0012. 采用纯原生 Git 提交守卫与全套社区安全治理体系

为了在零额外依赖的前提下保障 Conventional Commits 提交规范的严肃落地，并使本项目达到标准开源工程的最高健康度，我们决定引入纯原生 Git 钩子拦截守卫、CI 语义强门禁与标准化社区安全治理资产。

## 决策背景

在引入 Conventional Commits 与 git-cliff 自动化发版日志机制后，团队协作中仍面临以下挑战：
1. **本地提交缺乏低成本拦截**：开发者直接执行 `git commit` 时若忘记规范，脏提交合入主干将污染更新日志；若采用 Husky / Commitlint 等 Node.js 重型框架，会引入大量额外依赖与较慢的启动开销；
2. **PR 标题与发版日志缺陷**：外部贡献者提交的 PR 标题往往随意书写，且此前 Release 流水线中 git-cliff 缺少 `--latest` 参数导致历史日志重复混入；
3. **开源治理合规资产缺失**：缺少负责任的安全漏洞披露流程（容易导致 PoC 在公开 Issue 被泄露）、缺少社区行为准则与 Issue 导流规则。

## 决策内容

1. **纯原生 Git 提交守门 (`.githooks/commit-msg`)**：
   - 采用纯 Shell 脚本编写校验逻辑，零 npm/外部依赖，毫秒级执行；
   - 智能放行 `Merge`、`Revert` 与临时变基提交；
   - 在 `scripts/commit.sh` 中注入自动自愈机制：每次执行提交或帮助指令时，自动执行 `git config core.hooksPath .githooks`，无需开发者手动配置。
2. **CI/CD 语义强门禁与日志修复**：
   - 在 `ci.yml` 引入 `amannn/action-semantic-pull-request@v6` 校验 PR 标题，并在构建前集成 `ShellCheck` 脚本静态分析；
   - 在 `release.yml` 为 git-cliff 注入 `--latest`、`--github-repo` 与 `GITHUB_TOKEN`，保障增量发版日志纯净精准；
   - 引入 `.github/dependabot.yml` 月度自动巡检 GitHub Actions。
3. **社区治理与负责任安全披露**：
   - 引入 `SECURITY.md`，推荐使用 GitHub Security Advisories 私密通道报告漏洞；
   - 引入 `CODE_OF_CONDUCT.md`（Contributor Covenant v2.1）；
   - 引入 `.github/ISSUE_TEMPLATE/config.yml` 关闭空白 Issue，引导日常交流前往 GitHub Discussions。
4. **脚手架联动解耦**：
   - 在 `scripts/init-new-project.mjs` 中对上述新增资产进行全生命周期管控，支持派生项目一键干净脱敏清理或自适应更新。

## 考虑备选

- **备选 A（引入 Husky + Commitlint）**：前端常见方案，但需额外安装 5+ 个 npm 包，拖慢 `pnpm install` 速度，对非 Node 纯文档编写者不够友好；
- **备选 B（仅依靠 CI 远端拦截）**：虽省去本地配置，但反馈链路长达数分钟，开发者频繁需要修改本地 commit 重推，体验割裂。

## 产生的后果

- **正面影响**：
  - 实现了本地（毫秒级钩子）与云端（PR 标题校验）的双重闭环守卫；
  - 保持全工程依赖极其纯净（零新增 npm 依赖）；
  - 修复了发版日志累积混入历史的缺陷；
  - 达到 GitHub Community Standards 100% 满分合规评级。
- **负面成本/注意事项**：
  - 提交守卫钩子依赖类 Unix 环境或 Windows 下的 Git Bash / WSL；在极其罕见的纯原生 CMD 环境下无法自动执行，但仍可通过 `scripts/commit.sh` 跨平台向导保底。
