---
title: v0.9.0 历史归档指引
legacy: true
version: v0.9.0
latestLink: /guide/what-is-zenith
---

# v0.9.0 历史归档指引

::: warning 历史版本声明
您正在查阅的是 VitePress Zenith 的 **v0.9.0 历史归档版本**。本页面用于演示大型开源项目与复杂工程的多版本生命周期管理、旧版警告横幅（`<VpLegacyBanner>`）及一键跳转升级体验。
:::

## 历史版本与演进路线

在 `v0.9.0` 初始阶段，Zenith 仅具备基础的文档静态渲染能力与少量基础短代码组件。随着版本迭代至 **v1.0.0 最新稳定版**，框架全面升级为全能型知识库矩阵：

| 核心维度 | v0.9.0 历史版本 (Legacy) | v1.0.0 最新稳定版 (Latest) |
| :--- | :--- | :--- |
| **搜索引擎** | 依赖外部 CDN 检索 | 零依赖 Minisearch 本地离线高精度分词 |
| **代码体验** | 纯基础 Shiki 高亮 | Twoslash 悬浮类型推导 + 超长代码折叠 |
| **多语言体系** | 单语言中文站点 | 中英双语完全隔离矩阵 + 本地化侧边栏 |
| **离线与 PWA** | 不支持 PWA | `@vite-pwa/vitepress` 完整离线缓存与安装 |
| **交互演示** | 纯静态代码块 | StackBlitz WebContainer 在线沙箱实时运行 |
| **社区讨论** | 无评论区 | Giscus GitHub Discussions 原生集成 |

## 如何升级至最新版

如果您目前仍在使用 `v0.9.0` 系列版本，建议按照最新文档指南进行平滑升级：

```bash
# 升级至最新稳定版
pnpm update vitepress-zenith@latest
```

如需查阅当前稳定版的完整功能架构，请点击页面顶部的黄色警告横幅，或直接前往 [v1.0.0 最新技术指南](/guide/what-is-zenith)。
