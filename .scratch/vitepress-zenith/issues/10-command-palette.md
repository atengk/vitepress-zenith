# 10 — 全局交互命令中心 (Command Palette)

**目标行为 (What to build):**
将现有的搜索弹窗升级为类似 Raycast / Spotlight 的全局交互命令中心（Command Palette）。在保留底层 Minisearch 高精度离线中文检索能力的同时，支持通过按键或搜索触发“快捷动作 (Actions)”列表（包括：切换专注模式 Alt+Z、切换深浅色主题、复制当前页链接、返回页面顶部、跳转博客专栏、跳转 GitHub 仓库等），支持键盘上下箭头高亮选中与回车执行。

**前置依赖 (Blocked by):**
07 — 零依赖离线全文检索与自动化侧边栏

**状态 (Status):**
ready-for-agent

- [ ] 设计并封装 `<VpCommandPalette>` 浮层组件，提供统一的输入框、动作组 (Actions) 与搜索结果组 (Search Results)
- [ ] 注册全局快捷键监听（<kbd>Ctrl+K</kbd> / <kbd>Cmd+K</kbd>），支持与顶栏搜索按钮协同唤起
- [ ] 内置常用快捷动作：切换专注模式、切换深浅主题、复制当前页 Markdown 链接、置顶滚动、快速跳转模块
- [ ] 联动 Minisearch 检索实例，当输入关键词时无缝展示匹配文档与高亮段落
- [ ] 支持纯键盘无障碍导航（<kbd>↑</kbd>、<kbd>↓</kbd> 切换选项，<kbd>Enter</kbd> 触发，<kbd>Esc</kbd> 退出）
