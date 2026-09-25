# 02 — 沉浸式专注阅读模式与阅读进度条

**目标行为 (What to build):**
实现一键收起左右两侧边栏、正文居中黄金加宽的“沉浸式阅读模式 (Zen Mode)”，消除一切阅读干扰；提供快捷键（`Alt+Z`）、右下角悬浮胶囊控制条与顶部导航栏控制按钮；支持 `localStorage` 记住用户的专注阅读偏好；在顶部导航下方集成平滑微光的阅读进度条，并展示文章字数与预计阅读时间。

**前置依赖 (Blocked by):**
01 — 工程底座与全能 Landing Page 骨架

**状态 (Status):**
resolved

- [x] 在主题布局层集成 Zen Mode 响应式状态管理，支持一键在根容器切换 `.zen-mode`
- [x] 编写平滑 CSS 动画，收起左侧边栏与右侧大纲（TOC Aside），将正文容器居中并拓展至舒适阅读宽度
- [x] 提供全局键盘快捷键（`Alt+Z`）以及右下角悬浮切换胶囊与工具栏按钮
- [x] 实现 `localStorage` 本地偏好持久化与 SSR 安全的水合恢复机制
- [x] 挂载顶部极细呼吸感阅读进度条，随页面滚动实时反映阅读深度百分比
- [x] 在文档标题下方渲染文章字数统计与预计阅读耗时（Reading Time）

## 解决方案 (Answer)

1. 开发了 `useZenMode.ts` 响应式状态管理 Hook，支持在根 HTML 节点动态切换 `.zen-mode`，监听 `Alt+Z` 与 `Esc` 快捷键，并通过 `localStorage` 进行状态持久化；
2. 编写了 `zen-mode.css`，以贝塞尔平滑过渡动画收起左右侧栏，正文居中放宽至 880px 舒适阅读宽度并优化字距行高；
3. 开发了 `ZenModeToggle.vue` 毛玻璃悬浮切换胶囊，与 `ReadingProgressBar.vue` 顶部 60fps 滚动阅读进度指示条；
4. 开发了 `DocMeta.vue` 组件，挂载在 `doc-before` 插槽中展示中英文综合字数统计与预计阅读耗时；
5. 在 `Layout.vue` 中完成全套插槽组装，`pnpm run typecheck` 与 `pnpm run docs:build` 100% 编译通过。
