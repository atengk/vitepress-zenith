# 容器化多阶段镜像构建与 GHCR 多架构发布体系

为了支持私有云、本地化部署及离线运行场景，我们决定为 VitePress Zenith 提供基于多阶段构建的轻量级 Docker 镜像，并在 GitHub Actions 发版流中集成多架构自动推送至 GHCR。

## 决策背景

VitePress Zenith 原工程交付依赖 Node.js 环境或 GitHub Pages 公网托管。在企业内部知识库、私有私网部署及 Kubernetes 生产集群场景中，下游用户强烈需要开箱即用、资源消耗极低且安全的容器镜像。

## 决策内容

1. **多阶段构建架构 (Multi-stage Build)**：采用 `node:20-alpine` 作为构建阶段，执行 `pnpm install` 与 `pnpm build`；采用 `nginx:alpine` 作为运行时阶段，仅拷贝编译生成的纯静态产物（`docs/.vitepress/dist`），镜像整体积由 1GB+ 骤降至约 25MB。
2. **Nginx 路由与缓存加固**：针对 VitePress 的页面组织结构配置针对性 Nginx 规则，支持 HTML 文件的协商缓存（no-cache）与资产文件（assets）的年级强缓存（Cache-Control: max-age=31536000, immutable），并配置 gzip 压缩。
3. **GHCR 多架构自动化流水线**：在 `release.yml` 中激活 Docker 构建任务，借助 Docker Buildx 与 QEMU 自动化构建 `linux/amd64` 与 `linux/arm64` 双架构镜像，自动推送至 GitHub Container Registry (`ghcr.io`)。

## 备选方案

- **方案 A（Node.js 运行时宿主镜像）**：直接在容器中使用 `pnpm preview` 托管。被否决，因为 Node.js 运行时内存占用高（>100MB），攻击面大且并发吞吐远逊于 Nginx。
- **方案 B（纯手动镜像构建）**：不配置 GitHub Actions，要求用户自行下载源码本地 docker build。被否决，违背自动化开箱即用交付原则。

## 影响与后果

- **正面**：用户可通过一行命令 `docker run -d -p 8080:80 ghcr.io/<owner>/vitepress-zenith:latest` 秒级启动完整文档系统；兼容 ARM 架构（如 Apple Silicon、树莓派、AWS Graviton）。
- **注意项**：需在工程中纳管 `.dockerignore`、`Dockerfile` 与 `deploy/nginx.conf`。
