# 05 — 全能可视化与富媒体

**目标行为 (What to build):**
在 Markdown 中原生渲染 LaTeX 数学公式（`$...$` 与 `$$...$$`）、Mermaid 架构流程图与 Markmap 交互思维导图（将标准 Markdown 缩进列表直接编译为可交互缩放的树状图）；集成 Medium-zoom 实现文档所有插图点击平滑灯箱放大。

**前置依赖 (Blocked by):**
01 — 工程底座与全能 Landing Page 骨架

**状态 (Status):**
ready-for-agent

- [ ] 配置 VitePress 原生 `markdown.math: true`，验证行内与块级复杂数学公式正确渲染
- [ ] 集成 Mermaid 流程图与时序图渲染支持
- [ ] 封装 `<Markmap>` 思维导图组件，支持无序列表自动转为动态可折叠矢量树
- [ ] 集成 Medium-zoom 图片灯箱，监听路由变化自动为正文插图绑定缩放与平滑预览
- [ ] 保证在 Node.js 服务端预渲染（SSG）阶段无 DOM 缺失异常
