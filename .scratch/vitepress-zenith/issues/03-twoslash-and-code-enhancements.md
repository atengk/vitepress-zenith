# 03 — Shiki Twoslash 动态悬浮类型与 IDE 级代码块

**目标行为 (What to build):**
集成 `@shikijs/vitepress-twoslash`，将 VS Code 级别的类型推导、悬浮类型提示（Hover Tooltip）与类型错误诊断直接搬进文档网页的代码块中；同时完善代码行高亮、行聚焦 (`[!code focus]`) 与 Diff 增删标注，大幅提升代码查阅体验。

**前置依赖 (Blocked by):**
01 — 工程底座与全能 Landing Page 骨架

**状态 (Status):**
ready-for-agent

- [ ] 在 `docs/.vitepress/config.ts` 中配置 `@shikijs/vitepress-twoslash` 插件
- [ ] 在主题层注入 Twoslash 样式与悬浮气泡交互组件
- [ ] 支持在代码块中使用 `// ^?` 悬浮查看真实 TypeScript 变量与函数类型
- [ ] 支持在代码块中展示类型诊断波浪线（如类型不匹配或未定义属性）
- [ ] 验证代码行聚焦 (`// [!code focus]`) 与差异对比 (`// [!code ++]`, `// [!code --]`) 正常渲染
