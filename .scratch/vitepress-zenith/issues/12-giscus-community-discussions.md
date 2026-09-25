# 12 — 解耦式技术社区评论系统 (Giscus)

**目标行为 (What to build):**
基于 GitHub Discussions 封装开箱即用的 `<VpComments>` 组件，集成于文档与博客底部；支持在 `config.ts` 中一键配置 GitHub 仓库参数即可无缝激活，深浅色主题无缝跟随切换，未配置或配置 `comments: false` 时优雅隐退，保持零服务器成本与纯净体验。

**前置依赖 (Blocked by):**
08 — 原生轻量博客与运营套件

**状态 (Status):**
resolved

- [x] 封装 `<VpComments>` 组件，基于 Giscus 官方规范安全加载评论组件
- [x] 监听 VitePress `isDark` 状态机，深色与浅色模式切换时动态通知 Giscus iframe 同步换肤
- [x] 在 `themeConfig` 中提供 `giscus` 可选配置项（`repo`、`repoId`、`category`、`categoryId`、`mapping`）
- [x] 支持在页面 Frontmatter 中配置 `comments: false` 针对特定文档关闭评论
- [x] 在 `Layout.vue` 正文底部自然挂载评论区域

## 解决方案 (Answer)

1. **开箱即用评论组件封装 (`VpComments.vue`)**：
   - 基于 GitHub Discussions 官方规范，动态安全加载 `https://giscus.app/client.js`；
   - 监听 VitePress 全局 `isDark` 状态机，通过 `iframe.contentWindow.postMessage({ giscus: { setConfig: { theme } } }, 'https://giscus.app')` 实现毫秒级深浅色主题无刷新换肤；
   - 监听路由 `route.path` 变更，平滑重载对应页面的 discussions 讨论串；
   - 优雅隐退逻辑：支持单页 Frontmatter `comments: false` 显式关闭，并在首页和未配置仓库时静默隐藏。
2. **全局站点配置与专属技术指南沉淀**：
   - 在 `docs/.vitepress/config.ts` 的 `themeConfig` 中定义 `giscus` 配置项（`repo`、`repoId`、`category`、`categoryId`、`mapping`、`lang` 等）；
   - 在 `docs/.vitepress/theme/Layout.vue` 的 `#doc-after` 插槽中挂载 `<VpComments />`；
   - 在 `docs/.vitepress/theme/index.ts` 注册为全局可复用组件 `VpComments`；
   - 沉淀专属深度技术指南 `docs/guide/community-discussions.md`（包含架构选型对比、GitHub Discussions 前置准备三步实操、完整参数契约表与换肤原理），配置 `order: 9` 纳入自动侧边栏；
   - 同步在 `docs/.vitepress/theme/components/VpCommandPalette.vue` 注册快捷导航索引；
   - 在 `docs/components/overview.md` 增加第 8 节社区讨论组件使用指引。
3. **构建与类型验证**：
   - 运行 `pnpm typecheck` 类型检查全绿通过；
   - 运行 `pnpm build` 生产全量打包验证通过。
