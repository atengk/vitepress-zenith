# 12 — 解耦式技术社区评论系统 (Giscus)

**目标行为 (What to build):**
基于 GitHub Discussions 封装开箱即用的 `<VpComments>` 组件，集成于文档与博客底部；支持在 `config.ts` 中一键配置 GitHub 仓库参数即可无缝激活，深浅色主题无缝跟随切换，未配置或配置 `comments: false` 时优雅隐退，保持零服务器成本与纯净体验。

**前置依赖 (Blocked by):**
08 — 原生轻量博客与运营套件

**状态 (Status):**
ready-for-agent

- [ ] 封装 `<VpComments>` 组件，基于 Giscus 官方规范安全加载评论组件
- [ ] 监听 VitePress `isDark` 状态机，深色与浅色模式切换时动态通知 Giscus iframe 同步换肤
- [ ] 在 `themeConfig` 中提供 `giscus` 可选配置项（`repo`、`repoId`、`category`、`categoryId`、`mapping`）
- [ ] 支持在页面 Frontmatter 中配置 `comments: false` 针对特定文档关闭评论
- [ ] 在 `Layout.vue` 正文底部自然挂载评论区域
