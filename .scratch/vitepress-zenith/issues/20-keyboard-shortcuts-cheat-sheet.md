# 20 — 全键盘极客导航与快捷键速查中心 (<kbd>?</kbd> Cheat Sheet)

**目标行为 (What to build):**
实现全键盘驱动的极客阅读体验。全局监听 <kbd>?</kbd> 或 <kbd>Shift + /</kbd> 呼出类似 GitHub / Linear 的精美“快捷键速查中心”浮层面板，系统化展示所有可用快捷键；支持在阅读长文时通过键盘 <kbd>J</kbd>（下一篇）和 <kbd>K</kbd>（上一篇）无缝翻页，按 <kbd>T</kbd> 切换深浅主题，按 <kbd>Alt+Z</kbd> 切换专注模式。

**前置依赖 (Blocked by):**
02 — 沉浸式专注阅读模式与阅读进度条
10 — 全局交互命令中心

**状态 (Status):**
resolved

- [x] 开发 `<VpShortcutsModal>` 快捷键速查浮层组件，分类清晰呈现系统快捷键
- [x] 全局按键监听器捕获 <kbd>?</kbd> 唤起/关闭速查面板，并在输入框（input/textarea）获得焦点时智能防误触
- [x] 实现文档全键盘翻页逻辑：在阅读正文时按下 <kbd>J</kbd> / <kbd>K</kbd> 自动触发上一篇/下一篇路由平滑跳转
- [x] 支持按 <kbd>T</kbd> 快速切换深浅主题
- [x] 沉淀专属深度技术指南文档（`docs/guide/keyboard-shortcuts.md`），并在 `what-is-zenith.md` 核心特性矩阵表与全局导航中注册

## 解决方案 (Answer)
1. **全局按键调度 Hook**：开发 `docs/.vitepress/theme/composables/useKeyboardShortcuts.ts`，内置输入框守护机制（自动屏蔽 `INPUT`、`TEXTAREA`、`SELECT` 及 `contentEditable` 误触）。
2. **快捷键速查中心 (`<VpShortcutsModal>`)**：开发分类清晰的快捷键速查浮层组件，呈现全站控制、长文翻篇与媒体交互三大分类，以高质感 `<kbd>` 渲染按键，支持 Esc 或点击外部遮罩瞬时关闭，并通过 `Layout.vue` 挂载。
3. **极客单键动作驱动**：
   - 按 <kbd>?</kbd> 或 <kbd>Shift + /</kbd> 切换速查面板显隐；
   - 按 <kbd>T</kbd> 毫秒级切换深色/浅色外观；
   - 按 <kbd>J</kbd> / <kbd>K</kbd> 自动定位并点击文档底部真实上一篇/下一篇链接实现免鼠平滑翻页。
4. **技术指南与全局索引**：沉淀深度指南 `docs/guide/keyboard-shortcuts.md`，并在全局命令中心 `VpCommandPalette.vue` 与特性矩阵表中注册。

