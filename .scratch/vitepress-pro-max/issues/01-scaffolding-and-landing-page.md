# 01 — 工程底座与全能 Landing Page 骨架

**目标行为 (What to build):**
搭建 VitePress + UnoCSS + TypeScript 基础工程底座，采用集中式 `docs/` 目录组织，并实现高视觉质感的首页 Landing Page（包含 Hero 核心视觉、特性栅格、快速上手按钮与页脚），打通开发态热更新与生产态 `pnpm build` 静态编译链路。

**前置依赖 (Blocked by):**
无 — 可以立即启动 (None — can start immediately)

**状态 (Status):**
ready-for-agent

- [ ] 完成根目录 `package.json`、`tsconfig.json`、`uno.config.ts` 配置，安装 VitePress、Vue 与 UnoCSS 核心依赖
- [ ] 建立集中式 `docs/` 源码目录与 `docs/.vitepress/config.ts` 基础导航与主题配置
- [ ] 配置 UnoCSS 原子化引擎与 Lucide 图标集支持（支持直接使用纯 CSS 图标）
- [ ] 编写高质感首页 `docs/index.md`，包含渐变微光 Hero、多特性卡片矩阵与快速上手引导
- [ ] 执行 `pnpm run build` 成功生成静态 HTML 产物且无 SSR 报错
