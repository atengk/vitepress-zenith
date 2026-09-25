# 10 — 全局交互命令中心 (Command Palette)

**目标行为 (What to build):**
将现有的搜索弹窗升级为类似 Raycast / Spotlight 的全局交互命令中心（Command Palette）。在保留底层 Minisearch 高精度离线中文检索能力的同时，支持通过按键或搜索触发“快捷动作 (Actions)”列表（包括：切换专注模式 Alt+Z、切换深浅色主题、复制当前页链接、返回页面顶部、跳转博客专栏、跳转 GitHub 仓库等），支持键盘上下箭头高亮选中与回车执行。

**前置依赖 (Blocked by):**
07 — 零依赖离线全文检索与自动化侧边栏

**状态 (Status):**
resolved

- [x] 设计并封装 `<VpCommandPalette>` 浮层组件，提供统一的输入框、动作组 (Actions) 与搜索结果组 (Search Results)
- [x] 注册全局快捷键监听（<kbd>Ctrl+K</kbd> / <kbd>Cmd+K</kbd>），支持与顶栏搜索按钮协同唤起
- [x] 内置常用快捷动作：切换专注模式、切换深浅主题、复制当前页 Markdown 链接、置顶滚动、快速跳转模块
- [x] 联动 Minisearch 检索实例，当输入关键词时无缝展示匹配文档与高亮段落
- [x] 支持纯键盘无障碍导航（<kbd>↑</kbd>、<kbd>↓</kbd> 切换选项，<kbd>Enter</kbd> 触发，<kbd>Esc</kbd> 退出）

## 解决方案 (Answer)

1. **状态控制与按键监听 (`useCommandPalette.ts`)**：
   - 封装全局单例 Hook `useCommandPalette()`，统一管理命令中心显隐状态 `isOpen`；
   - 在捕获阶段拦截 <kbd>Ctrl+K</kbd> / <kbd>Cmd+K</kbd> 与非编辑态的 <kbd>/</kbd> 键，防止与浏览器或原生行为冲突；
   - 协同劫持顶栏搜索按钮点击事件（`#local-search`, `.VPNavBarSearchButton`），点击时自动无缝唤起命令中心。
2. **Raycast / Spotlight 风格交互浮层 (`VpCommandPalette.vue`)**：
   - 毛玻璃背景遮罩、精细边框阴影与平滑入场动效；
   - 预置 **快捷动作 (Actions)**（专注模式、深浅色切换、复制 Markdown 链接、复制当前 URL、平滑置顶）、**文档检索 (Documentation)** 与 **核心导航 (Navigation)**；
   - 动态集成 `@localSearchIndex` 与 `minisearch`，输入关键词时即时进行前缀联想与中英模糊检索；
   - 完整支持纯键盘无障碍极客操作：<kbd>↑</kbd> / <kbd>↓</kbd> 上下移动选中项并自动视口滚动跟随（`scrollIntoView`）、<kbd>Enter</kbd> 执行选中项、<kbd>Esc</kbd> 退出；
   - 内置轻量复制反馈 Toast。
3. **全局布局装配与文档指引**：
   - 在 `docs/.vitepress/theme/Layout.vue` 的 `layout-bottom` 插槽中挂载 `<VpCommandPalette />`；
   - 在 `docs/.vitepress/theme/index.ts` 注册全局组件并导出 `useCommandPalette`；
   - 在 `docs/guide/search-and-sidebar.md` 新增“第 3 节：全局交互命令中心”详细说明与键盘指南；
   - 通过 `pnpm typecheck` 静态类型检查与 `pnpm build` 生产构建验证（49.73s 全绿通过）。
