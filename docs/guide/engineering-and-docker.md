---
title: 开源工程化与容器化交付
order: 10
description: 深入解析 VitePress Zenith 的工业级开源底座、纯原生 Git 提交守卫、双通道自动化发版、git-cliff 日志与多阶段 Docker 容器化部署实践。
---

# 开源工程化与容器化交付

VitePress Zenith 不仅是一套高颜值的技术文档与知识库矩阵，更是一座**具备工业级软件交付质量的开源工程底座**。项目深度吸纳了 [atengk/oss-template](https://github.com/atengk/oss-template) 的工程规范，集成了严格的 CI 质量门禁、纯原生 Git 提交拦截守卫、双通道发版防呆、语义化更新日志以及极简多阶段 Docker 容器交付能力。

---

## 🎯 核心能力一览

- 🤖 **CI/CD 三维矩阵**：PR 标题语义门禁、ShellCheck 静态分析、类型检查与编译验证、Push main 即时 Pages 部署、打 Tag 自动发版归档；
- 🛡️ **纯原生 Git 提交守门**：基于 `.githooks/commit-msg` 的纯 Shell 本地拦截机制，零外部依赖（无需 Husky / Node 进程开销），毫秒级自愈生效；
- 🚀 **发版五大防呆自检**：主干分支检验、脏工作区拦截、远端同步校验、标签推送失败自动回滚与版本号冲突排查；
- 📝 **增量语义化变更追踪**：集成 `git-cliff`（锁定 `--latest`），自动按 Conventional Commits 分组提取功能、缺陷、重构与破坏性变更，杜绝历史日志重复混入；
- 🐳 **轻量多阶段容器交付**：基于 Node.js 编译与 Nginx Alpine 运行时的 Dockerfile（镜像体积仅 ~25MB），原生支持 Clean URLs 友好路由与多架构（`amd64` / `arm64`）自动发布至 GHCR；
- 🔒 **社区治理与安全合规**：内置 Contributor Covenant v2.1 行为准则、GitHub Security Advisories 私密漏洞披露策略与 Issues 智能导流体系。

---

## ✍️ 规范化提交助手与本地守门

本项目严格遵循 **Conventional Commits** 提交规范。为了兼顾灵活性与强制性，项目提供了双层保障体系：

### 1. 本地提交守卫钩子 (`.githooks/commit-msg`)
项目在 `.githooks/commit-msg` 中内置了纯原生 Bash 提交信息拦截钩子：
- **零外部依赖**：无需安装或启动庞大的 Node.js / Husky 工具链，原生毫秒级响应；
- **智能免检放行**：自动放行 `Merge`、`Revert` 以及临时变基提交（`fixup!` / `squash!`）；
- **静默自愈机制**：首次运行任意提交脚本，或手动执行 `git config core.hooksPath .githooks`，即可自动完成仓库级注册；
- **友好诊断引导**：格式不合规时拦截提交，并在终端输出规范格式示例与推荐向导指令。

### 2. 交互式向导模式
在日常开发中，您可以直接在终端运行交互式提交向导：

```bash
pnpm commit
```

向导将引导您选择变更类型（`feat`、`fix`、`docs` 等）、输入作用域（`Scope`）以及提交简述，并自动格式化提交。

### 3. 参数化与 AI 自动化调用模式
针对脚本编排、AI Agent 协同或熟练开发者的快速提交，`scripts/commit.sh` 支持完整命令行参数：

```bash
# 推荐工作流: 先精准暂存变动，再通过参数化命令一键提交并推送
git add <file-path>
bash scripts/commit.sh -t feat -s core -m "实现新功能" -p -y
```

| 参数项 | 说明 |
| :--- | :--- |
| `-t, --type <type>` | 必填（非交互模式）。提交类型（`feat`、`fix`、`docs`、`refactor` 等） |
| `-s, --scope <scope>` | 可选。影响范围模块（如 `theme`、`pwa`、`cli`） |
| `-m, --message <msg>` | 必填。简明扼要的提交描述 |
| `-b, --breaking` | 可选。标记为破坏性更新（自动追加 `!`） |
| `-a, --all` | 可选。自动暂存全部变动（等同于 `git add -A`） |
| `-p, --push` | 可选。提交成功后自动推送至当前分支远程仓库 |
| `-y, --yes` | 可选。跳过人工确认直接执行提交 |

---

## 🚀 全生命周期安全发版

项目内置 `scripts/release.sh` 脚本，支持在本地快速推进版本演进并具备完善的防呆自检。

### 1. 演练模式 (`--dry-run`)
在正式发版前，您可以随时执行演练模式，仅预览拟执行的步骤，**不产生任何真实 Git 改动**：

```bash
pnpm release -- --dry-run
# 或指定目标版本演练
pnpm release v1.2.0 --dry-run
```

脚本将依次执行严密的前置自检：
1. 校验当前是否处于合规主干分支（`main`）；
2. 拦截本地未提交的修改或未跟踪文件；
3. 校验本地分支与远程仓库是否同步，并自动感知超前提交；
4. 校验目标 Tag 是否已被本地或远端占用。

### 2. 正式发版并推送
当自检全部通过后，执行发版命令：

```bash
# 交互向导发版 (终端会提示输入确认)
pnpm release v1.2.0

# CI / 脚本 / AI 一键自动化静默发版 (-y)
bash scripts/release.sh v1.2.0 -y
```

脚本将自动执行：
- 触发 `custom_bump_version` 钩子，联动更新 `package.json` 中的 `"version": "1.2.0"`；
- 自动创建规范化版本提交 `chore(release): bump version to v1.2.0`；
- 同步推送本地超前提交至主干分支；
- 创建附注 Git Tag `v1.2.0` 并一键推送至 GitHub；
- **回滚防死锁保障**：若网络中断导致标签推送远端失败，脚本将自动清理本地临时 Tag，彻底防止本地脏 Tag 阻塞后续发版；
- 自动唤起 GitHub Actions 云端发版流水线！

---

## 🐳 轻量容器化部署 (Docker & Nginx)

为了满足企业私有内网、离线环境或 Kubernetes 集群的托管需求，Zenith 提供了精心优化的多阶段构建方案。

### 1. 多阶段构建架构
- **构建阶段 (`node:20-alpine`)**：安装 `libc6-compat` 兼容层，启用 Corepack 锁定 `pnpm@9.15.4`，利用缓存层安装锁定依赖并执行 `pnpm build` 静态编译；
- **运行阶段 (`nginx:alpine`)**：从构建阶段仅提取 `docs/.vitepress/dist` 纯静态文件，丢弃所有 Node.js 运行时与源码，镜像最终体积**小于 25MB**！

### 2. 本地构建与启动
```bash
# 1. 构建本地生产镜像
docker build -t vitepress-zenith:latest .

# 2. 启动容器 (映射至宿主机 8080 端口)
docker run -d --name zenith-docs -p 8080:80 vitepress-zenith:latest
```
访问 `http://localhost:8080` 即可查阅完整文档系统。

### 3. Nginx 生产环境最佳实践 (`deploy/nginx.conf`)
- **Clean URLs 友好回退**：内置 `try_files $uri $uri.html $uri/ /index.html =404;` 规则，完美支持直接输入页面深层路由而不出现 404；
- **长效强缓存策略**：针对 `/assets/` 静态指纹哈希文件配置 `Cache-Control: public, max-age=31536000, immutable`，极大减少网络传输并提升二次加载速度；
- **HTML 协商缓存**：针对 `.html` 入口文件配置 `Cache-Control: no-cache, must-revalidate`，确保文档每次改动发布后读者刷新即可获取最新版本；
- **Gzip 压缩**：开启高压缩比 Gzip 引擎，HTML 与 JS 文本体积压缩达 70% 以上。

---

## 🤖 GitHub Actions 流水线矩阵

Zenith 的 GitHub 自动化流水线遵循职责单一与解耦设计：

| 流水线名称 | 配置文件 | 触发时机 | 核心职责 |
| :--- | :--- | :--- | :--- |
| **持续集成门禁** | `.github/workflows/ci.yml` | PR (opened/edited/sync) / Push 分支 | 校验 PR 标题符合 Conventional 规范、执行 ShellCheck 脚本安全分析、TypeScript 类型检查与生产静态编译 |
| **即时持续部署** | `.github/workflows/deploy.yml` | Push 合并至 `main` | 实时将最新文档静态编译并部署至 GitHub Pages，改动即时可见 |
| **自动化发版与分发**| `.github/workflows/release.yml` | 推送标签 `v*` 或手动网页调度 | 提取增量 `git-cliff --latest` 分类日志、打包静态产物 Zip、挂载 SHA-256 校验和并向 GHCR 推送多架构 Docker 镜像 |
| **自动化依赖巡检** | `.github/dependabot.yml` | 每月定时执行 | 自动检测并提交 GitHub Actions 与包管理器依赖升级 PR |

---

## 🔒 社区治理与负责任安全披露

作为一个严谨的开源技术模板与知识库基建，Zenith 遵循顶级开源社区的标准治理范式：

1. **社区行为准则 (`CODE_OF_CONDUCT.md`)**：采纳 Contributor Covenant v2.1，营造友善、包容且多元的协作生态；详见根目录 [CODE_OF_CONDUCT.md](https://github.com/atengk/vitepress-zenith/blob/main/CODE_OF_CONDUCT.md)；
2. **安全策略与漏洞披露 (`SECURITY.md`)**：明确支持版本矩阵，建立基于 GitHub Security Advisories 的私密上报机制，杜绝在公开 Issue 泄露漏洞 PoC；详见根目录 [SECURITY.md](https://github.com/atengk/vitepress-zenith/blob/main/SECURITY.md)；
3. **Issue 治理与导流 (`.github/ISSUE_TEMPLATE/config.yml`)**：禁用无模板空白 Issue，引导日常技术答疑前往 GitHub Discussions，保持 Issue 跟踪专注于高价值缺陷与特性规格。
