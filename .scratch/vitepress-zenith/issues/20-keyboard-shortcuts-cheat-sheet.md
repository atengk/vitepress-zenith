# 20 — 全键盘极客导航与快捷键速查中心 (<kbd>?</kbd> Cheat Sheet)

**目标行为 (What to build):**
实现全键盘驱动的极客阅读体验。全局监听 <kbd>?</kbd> 或 <kbd>Shift + /</kbd> 呼出类似 GitHub / Linear 的精美“快捷键速查中心”浮层面板，系统化展示所有可用快捷键；支持在阅读长文时通过键盘 <kbd>J</kbd>（下一篇）和 <kbd>K</kbd>（上一篇）无缝翻页，按 <kbd>T</kbd> 切换深浅主题，按 <kbd>Alt+Z</kbd> 切换专注模式。

**前置依赖 (Blocked by):**
02 — 沉浸式专注阅读模式与阅读进度条
10 — 全局交互命令中心

**状态 (Status):**
ready-for-agent

- [ ] 开发 `<VpShortcutsModal>` 快捷键速查浮层组件，分类清晰呈现系统快捷键
- [ ] 全局按键监听器捕获 <kbd>?</kbd> 唤起/关闭速查面板，并在输入框（input/textarea）获得焦点时智能防误触
- [ ] 实现文档全键盘翻页逻辑：在阅读正文时按下 <kbd>J</kbd> / <kbd>K</kbd> 自动触发上一篇/下一篇路由平滑跳转
- [ ] 支持按 <kbd>T</kbd> 快速切换深浅主题
- [ ] 沉淀专属深度技术指南文档（`docs/guide/keyboard-shortcuts.md`），并在 `what-is-zenith.md` 核心特性矩阵表与全局导航中注册

