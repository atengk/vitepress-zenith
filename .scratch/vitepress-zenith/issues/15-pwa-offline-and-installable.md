# 15 — PWA 渐进式离线应用与全站预缓存

**目标行为 (What to build):**
集成 `@vite-pwa/vitepress`，自动生成 Service Worker 运行时缓存与 Web App Manifest 清单。在弱网或完全离线断网环境下依然支持秒开查阅已缓存的技术文档；支持将文档系统一键“安装”至桌面或移动端主屏幕，呈现全屏沉浸、无地址栏干扰的原生应用级查阅体验。

**前置依赖 (Blocked by):**
01 — 工程底座与全能 Landing Page 骨架
09 — 自动化持续交付与全功能演示指南

**状态 (Status):**
resolved

- [x] 引入 `@vite-pwa/vitepress` 插件并配置于 `docs/.vitepress/config.ts`
- [x] 配置 Web App Manifest（站名、主题色、启动图标、Display: standalone）
- [x] 配置运行时缓存策略（HTML 页面与静态资源 Stale-While-Revalidate / Cache-First）
- [x] 验证生产打包产物中 `sw.js` 与 `manifest.webmanifest` 正确生成，并通过断网离线加载测试
- [x] 沉淀专属深度技术指南文档（`docs/guide/pwa-offline.md`），并在 `what-is-zenith.md` 核心特性矩阵表与全局导航中注册

## 解决方案 (Answer)

1. **集成 `@vite-pwa/vitepress` 与渐进式工程封装 (`docs/.vitepress/config.ts`)**：
   - 安装 `@vite-pwa/vitepress` 依赖并通过 `withPwa` 高阶包装函数无侵入包裹 `defineConfig`；
   - 自动生成符合 W3C 标准的 Web App Manifest（`manifest.webmanifest`），配置站点全名、简称、主题色 `#6366f1`、深色背景 `#0f172a` 与全屏独立运行模式（`display: standalone`）；
   - 在 `<head>` 中补全移动端专用的 `apple-touch-icon` 与 `apple-mobile-web-app-capable` 元标签，支持 iOS / iPadOS 添加至主屏幕；
   - 适配 `base` 路径变量，确保根目录（`/`）与 GitHub Pages 二级子目录（`/vitepress-zenith/`）自适应精准寻址。
2. **多层级运行时缓存策略 (Workbox Runtime Caching)**：
   - **预缓存层 (Precache)**：构建期将全站 HTML、编译脚本、样式表、WebFont 字体与 `logo.svg` 计算哈希指纹，Service Worker 安装阶段在后台一次性预下载落盘；
   - **静态资源 (Stale-While-Revalidate)**：样式、脚本与 Worker 采用“优先呈现本地缓存，后台静默重连换新”；
   - **媒体与 CDN (Cache-First)**：本地图片设置 60 天缓存上限，Google Fonts 与 jsdelivr CDN 资源长效持久化；
   - **静默更新机制**：启用 `registerType: 'autoUpdate'`，配合 `skipWaiting: true` 与 `clientsClaim: true`，实现版本发布后的无感自动化平滑换新。
3. **离线网络感知与应用安装横幅组件 (`VpPwaStatus.vue`)**：
   - 挂载全局监听器监听 `window` 的 `online` / `offline` 事件；断网时底部优雅滑出半透明高斯模糊提示胶囊（`离线模式已激活，正在查阅本地全站预缓存文档`），网络恢复后弹出绿色确认胶囊并 3.5 秒后自动淡出；
   - 监听 `beforeinstallprompt` 事件，优雅拦截并提供“一键安装为应用”引导卡片；
   - 在打印白皮书模式（`@media print`）下完全隐藏干扰。
4. **技术指南与生态矩阵注册**：
   - 沉淀专属深度技术指南 `docs/guide/pwa-offline.md`（配置 `order: 12` 自动纳入核心指引侧边栏，详解离线测试方法、缓存分层拓扑与桌面端/移动端安装体验）；
   - 在 `docs/guide/what-is-zenith.md` 核心特性矩阵表追加 PWA 离线能力说明与跳转链接；
   - 在全局命令中心 `VpCommandPalette.vue` 注册快捷导航索引。
5. **严苛验证通过**：
   - `pnpm typecheck` 零类型报错通过；
   - `pnpm docs:build` 验证 `dist/sw.js`（15.9KB）、`dist/manifest.webmanifest`、`dist/registerSW.js` 及全站 HTML 均正确预缓存。


