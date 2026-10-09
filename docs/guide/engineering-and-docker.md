---
title: 开源工程化与容器化交付
order: 10
description: 深入解析 VitePress Zenith 的工业级开源底座、双通道自动化发版、git-cliff 日志与多阶段 Docker 容器化部署实践。
---

# 开源工程化与容器化交付

VitePress Zenith 不仅是一套高颜值的技术文档与知识库矩阵，更是一座**具备工业级软件交付质量的开源工程底座**。项目深度吸纳了 [atengk/oss-template](https://github.com/atengk/oss-template) 的工程规范，集成了严格的 CI 质量门禁、双通道发版防呆、语义化更新日志以及极简多阶段 Docker 容器交付能力。

---

## 🎯 核心能力一览

- 🤖 **CI/CD 三维矩阵**：PR/Push 类型检查与编译门禁、Push main 即时 Pages 部署、打 Tag 自动发版归档；
- 🛡️ **发版五大防呆自检**：主干分支检验、脏工作区拦截、远端同步校验、自动化构建验证与版本号冲突排查；
- 📝 **语义化变更追踪**：集成 `git-cliff`，自动根据 Conventional Commits 将功能、缺陷、重构与破坏性变更分类提取至 Release Notes；
- 🐳 **轻量多阶段容器交付**：基于 Node.js 编译与 Nginx Alpine 运行时的 Dockerfile（镜像体积仅 ~25MB），原生支持 Clean URLs 友好路由与多架构（`amd64` / `arm64`）自动发布至 GHCR。

---

## ✍️ 规范化提交助手

本项目严格遵循 **Conventional Commits** 提交规范。为了降低记忆负担，项目内置了全交互式提交助手：

```bash
pnpm commit
```

运行后将通过终端交互界面引导您完成提交：
1. **选择变更类型**：`feat`（新特性）、`fix`（修复缺陷）、`docs`（文档）、`perf`（性能优化）、`refactor`（重构）等；
2. **输入作用域 (Scope)**：例如 `shortcode`、`pwa`、`theme` 等；
3. **输入清晰中文简述**；
4. **自动完成 Conventional 格式规整与 Git Commit**。

这些规范化的提交记录将作为后续自动化生成更新日志的核心数据源。

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

脚本将依次执行 5 大前置自检：
1. 校验当前是否处于合规主干分支（`master` / `main`）；
2. 拦截本地未提交的修改或未跟踪文件；
3. 校验本地分支与远程仓库是否处于同步状态；
4. 校验本地编译与类型检查是否通过；
5. 校验目标 Tag 是否已被占用。

### 2. 正式发版并推送
当自检全部通过后，执行发版命令：

```bash
pnpm release v1.2.0
```

脚本将自动执行：
- 联动更新 `package.json` 中的 `"version": "1.2.0"`；
- 自动创建版本提交 `chore(release): bump version to v1.2.0`；
- 创建附注 Git Tag `v1.2.0` 并一键推送至 GitHub；
- 自动唤起 GitHub Actions 云端发版流水线！

---

## 🐳 轻量容器化部署 (Docker & Nginx)

为了满足企业私有内网、离线环境或 Kubernetes 集群的托管需求，Zenith 提供了精心优化的多阶段构建方案。

### 1. 多阶段构建架构
- **构建阶段 (`node:20-alpine`)**：启用 Corepack，利用缓存安装 `pnpm-lock.yaml` 锁定依赖，并执行 `pnpm build` 静态编译；
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

## 🤖 GitHub Actions 流水线三维矩阵

Zenith 的 GitHub 自动化流水线遵循职责单一与解耦设计：

| 流水线名称 | 配置文件 | 触发时机 | 核心职责 |
| :--- | :--- | :--- | :--- |
| **持续集成门禁** | `.github/workflows/ci.yml` | Pull Request / Push 至开发分支 | 自动执行 `pnpm typecheck` 与 `pnpm build`，杜绝缺陷合入 |
| **即时持续部署** | `.github/workflows/deploy.yml` | Push 合并至 `master` / `main` | 实时将最新文档静态编译并部署至 GitHub Pages，改动即时可见 |
| **自动化发版与分发**| `.github/workflows/release.yml` | 推送标签 `v*` 或手动网页调度 | 渲染 `git-cliff` 变更日志、打包静态产物 Zip、挂载校验和并向 GHCR 推送多架构 Docker 镜像 |
