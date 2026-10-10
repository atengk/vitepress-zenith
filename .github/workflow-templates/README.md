# GitHub Actions 生产级部署流水线模版资产库 (Deployment Templates)

本目录为 VitePress Zenith 技术文档、博客与容器化应用提供标准、开箱即用的 GitHub Actions 生产部署参考模版。

> [!NOTE] **为什么放在本目录？**
> GitHub Actions 引擎**仅会自动执行** `.github/workflows/` 顶层目录下的工作流。
> 存放在 `.github/workflow-templates/` 下的模版文件**绝不会被自动触发**，可安全作为工程资产库进行版本化纳管、团队规范共享与按需选用。

---

## 🚀 8 大通用生产上线部署流水线 (`deployments/`)

解耦目标基础设施环境，覆盖公有云 Serverless 托管、全球边缘计算网络、云原生容器及自建主机运维：

| 部署目标 | 模版文件 | 适用场景与核心机制 | 核心依赖凭据 |
| :--- | :--- | :--- | :--- |
| **GitHub Pages** | [`deployments/github-pages.yml`](./deployments/github-pages.yml) | 官方静态文档站点自动化部署，开箱即用，免任何外部凭据配置 | 零外部凭据 (原生 `GITHUB_TOKEN`) |
| **Vercel** | [`deployments/vercel.yml`](./deployments/vercel.yml) | 全球边缘极速加速，支持 PR 预览环境自动构建与主干生产环境 (`--prod`) 部署 | `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` |
| **Cloudflare Pages** | [`deployments/cloudflare-pages.yml`](./deployments/cloudflare-pages.yml) | 利用 Wrangler CLI 将静态构建产物极速同步部署至 Cloudflare 全球边缘静态网络 | `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` |
| **Cloudflare Workers** | [`deployments/cloudflare-workers.yml`](./deployments/cloudflare-workers.yml) | 利用 Wrangler 自动化编译并发布边缘函数、代理网关或 Serverless API | `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` |
| **云主机 / VPS** | [`deployments/ssh-docker-compose.yml`](./deployments/ssh-docker-compose.yml) | 云主机远端执行 `docker compose pull && up -d` 滚动更新，支持 GHCR 登录凭证注入 | `SERVER_HOST`, `SERVER_USER`, `SSH_PRIVATE_KEY` |
| **AWS S3 & CloudFront** | [`deployments/aws-s3-cloudfront.yml`](./deployments/aws-s3-cloudfront.yml) | 静态产物增量同步至 S3，自动触发 CloudFront 全球边缘 CDN 缓存刷新 (Invalidation) | `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION` |
| **Kubernetes 集群** | [`deployments/k8s-kubectl.yml`](./deployments/k8s-kubectl.yml) | 声明式更新 (`set image`) 与滚动重启 (`rollout restart`) 双模式，含健康就绪状态探测 | `KUBE_CONFIG_DATA` |
| **通用 Webhook** | [`deployments/webhook.yml`](./deployments/webhook.yml) | 向 Portainer / Watchtower / 1Panel / 宝塔等运维面板推送标准 HTTP POST 回调触发更新 | `DEPLOY_WEBHOOK_URL`, `DEPLOY_WEBHOOK_SECRET` |

---

## 🛠️ 快速激活与使用指引

1. **选择目标模版**：
   从 `deployments/` 目录中选择符合你部署环境的流水线文件（例如将文档部署至 Vercel，选择 `deployments/vercel.yml`）；
2. **复制到运行目录**：
   将其复制到项目根目录下的 `.github/workflows/` 顶层运行目录中：
   ```bash
   cp .github/workflow-templates/deployments/vercel.yml .github/workflows/deploy-vercel.yml
   ```
3. **配置 GitHub 仓库 Secrets**：
   前往 GitHub 仓库的 **Settings** -> **Secrets and variables** -> **Actions**，根据对应模版头部的凭据清单添加所需密钥；
4. **提交并推送代码**：
   提交后推送到主干分支（或通过 Actions 页面手动调度 `workflow_dispatch`），即可立即激活全自动化部署！
