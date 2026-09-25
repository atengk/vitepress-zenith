# 08 — 原生轻量博客与运营套件

**目标行为 (What to build):**
基于 VitePress 原生 `createContentLoader` 自动生成博客归档页（Timeline）与标签矩阵（Tags）；在全站顶部预置支持折叠且本地记忆的公告通知横幅（Announcement Banner）；在每篇文档底部集成“本文是否有帮助 (👍/👎)”交互小组件。

**前置依赖 (Blocked by):**
01 — 工程底座与全能 Landing Page 骨架
06 — 全局免导入交互短代码组件库

**状态 (Status):**
completed

- [x] 使用 `createContentLoader('blog/posts/*.md', ...)` 在构建期自动收集博文元数据
- [x] 编写博客归档页（`docs/blog/index.md`）与标签筛选视图，展示文章发布时间、摘要与标签
- [x] 开发全宽公告横幅组件 `<VpBanner>`，支持关闭按钮与 `localStorage` 记忆周期防打扰
- [x] 开发每篇文档底部的 `<VpHelpful>` 反馈组件，提供 👍/👎 点赞并展示感谢气泡
- [x] 在文档默认布局插槽中自然挂载反馈组件与公告横幅
