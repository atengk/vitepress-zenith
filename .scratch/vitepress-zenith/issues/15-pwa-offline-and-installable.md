# 15 — PWA 渐进式离线应用与全站预缓存

**目标行为 (What to build):**
集成 `@vite-pwa/vitepress`，自动生成 Service Worker 运行时缓存与 Web App Manifest 清单。在弱网或完全离线断网环境下依然支持秒开查阅已缓存的技术文档；支持将文档系统一键“安装”至桌面或移动端主屏幕，呈现全屏沉浸、无地址栏干扰的原生应用级查阅体验。

**前置依赖 (Blocked by):**
01 — 工程底座与全能 Landing Page 骨架
09 — 自动化持续交付与全功能演示指南

**状态 (Status):**
ready-for-agent

- [ ] 引入 `@vite-pwa/vitepress` 插件并配置于 `docs/.vitepress/config.ts`
- [ ] 配置 Web App Manifest（站名、主题色、启动图标、Display: standalone）
- [ ] 配置运行时缓存策略（HTML 页面与静态资源 Stale-While-Revalidate / Cache-First）
- [ ] 验证生产打包产物中 `sw.js` 与 `manifest.webmanifest` 正确生成，并通过断网离线加载测试
