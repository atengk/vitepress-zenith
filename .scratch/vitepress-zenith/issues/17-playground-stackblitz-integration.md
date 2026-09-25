# 17 — 即时在线沙箱直达 (StackBlitz Playground)

**目标行为 (What to build):**
为交互演示组件 `<VpDemoPreview>` 与代码块增强工具栏，集成“在 StackBlitz 打开 (Open in StackBlitz)”一键投送功能。使用 StackBlitz SDK 直接将当前组件代码或代码片段打包送入浏览器 WebContainer 在线虚拟机，无需本地配置即可即时试跑与调试。

**前置依赖 (Blocked by):**
06 — 全局免导入交互短代码组件库

**状态 (Status):**
ready-for-agent

- [ ] 集成 `@stackblitz/sdk` 或官方 URL 启动协议
- [ ] 在 `<VpDemoPreview>` 工具栏中增加“在 StackBlitz 试跑”操作按钮
- [ ] 自动根据当前代码片段构建微型 Vite + Vue 3 虚拟工程模板，并一键在新窗口打开
- [ ] 支持通过属性或开关控制是否显示 Playground 快捷入口
- [ ] 沉淀专属深度技术指南文档（`docs/guide/playground-stackblitz.md`），并在 `what-is-zenith.md` 核心特性矩阵表与全局导航中注册

