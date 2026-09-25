# 01 — 工程底座与全能 Landing Page 骨架

**目标行为 (What to build):**
搭建 VitePress + UnoCSS + TypeScript 基础工程底座，采用集中式 `docs/` 目录组织，并实现高视觉质感的首页 Landing Page（包含 Hero 核心视觉、特性栅格、快速上手按钮与页脚），打通开发态热更新与生产态 `pnpm build` 静态编译链路。

**前置依赖 (Blocked by):**
无 — 可以立即启动 (None — can start immediately)

**状态 (Status):**
resolved

- [x] 完成根目录 `package.json`、`tsconfig.json`、`uno.config.ts` 配置，安装 VitePress、Vue 与 UnoCSS 核心依赖
- [x] 建立集中式 `docs/` 源码目录与 `docs/.vitepress/config.ts` 基础导航与主题配置
- [x] 配置 UnoCSS 原子化引擎与 Lucide 图标集支持（支持直接使用纯 CSS 图标）
- [x] 编写高质感首页 `docs/index.md`，包含渐变微光 Hero、多特性卡片矩阵与快速上手引导
- [x] 执行 `pnpm run build` 成功生成静态 HTML 产物且无 SSR 报错

## 解决方案 (Answer)

1. 完成了集中式 `docs/` 目录划分与 TypeScript、UnoCSS 配置；
2. 扩展了 VitePress 官方默认主题，注入自定义品牌色变量与抗锯齿中文排版；
3. 实现了高质感 Landing Page (`docs/index.md`) 与初始指南页面；
4. 运行 `pnpm run build` 与 `pnpm run typecheck` 100% 通过编译且无水合报错。
