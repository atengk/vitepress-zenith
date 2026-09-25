# 17 — 即时在线沙箱直达 (StackBlitz Playground)

**目标行为 (What to build):**
为交互演示组件 `<VpDemoPreview>` 与代码块增强工具栏，集成“在 StackBlitz 打开 (Open in StackBlitz)”一键投送功能。使用 StackBlitz SDK 直接将当前组件代码或代码片段打包送入浏览器 WebContainer 在线虚拟机，无需本地配置即可即时试跑与调试。

**前置依赖 (Blocked by):**
06 — 全局免导入交互短代码组件库

**状态 (Status):**
resolved

- [x] 集成 `@stackblitz/sdk` 或官方 URL 启动协议
- [x] 在 `<VpDemoPreview>` 工具栏中增加“在 StackBlitz 试跑”操作按钮
- [x] 自动根据当前代码片段构建微型 Vite + Vue 3 虚拟工程模板，并一键在新窗口打开
- [x] 支持通过属性或开关控制是否显示 Playground 快捷入口
- [x] 沉淀专属深度技术指南文档（`docs/guide/playground-stackblitz.md`），并在 `what-is-zenith.md` 核心特性矩阵表与全局导航中注册

## 解决方案 (Answer)

1. **研发 StackBlitz WebContainer 虚拟工程协议工具库 (`theme/utils/stackblitz.ts`)**：
   - 引入 `@stackblitz/sdk` 官方工具链，采用动态按需导入（`import('@stackblitz/sdk')`），实现仅在读者点击试跑时加载 SDK，保证首屏体积与 SSR 构建零侵入、零膨胀；
   - **智能单文件组件补全 (`formatToVueSfc`)**：自动探测传入源码，若非标准单文件组件则自动注入 `<script setup>`、基础样式与居中弹性容器，防范虚拟机渲染中断；
   - **自动化 Vite + Vue 3 微工程装配**：在内存中毫秒级组装包含精简 `package.json`（Vue 3.5 + Vite 5）、`vite.config.ts`、`index.html`、`src/main.ts` 与 `src/App.vue` 的完整虚拟机工程字典，新窗口弹出后秒级拉起浏览器端 WebContainer 开发服务器。
2. **交互演示组件与独立沙箱卡片集成 (`VpDemoPreview.vue` & `VpPlayground.vue`)**：
   - **`<VpDemoPreview>` 工具栏升级**：新增闪电图标「在 StackBlitz 试跑」操作按钮，具备启动中 Spinner 动效与防重点击保护；支持通过 `:stackblitz="false"` 针对纯静态展示片段优雅关闭试跑入口；
   - **`<VpPlayground>` 独立卡片**：提供专为实战动手实验室、教程演练打造的独立沙箱启动卡片，支持展示特性徽标（如 `WebContainer`）、项目描述与代码预览。
3. **全局组件注册与文档闭环**：
   - 在 `docs/.vitepress/theme/index.ts` 全局注册 `<VpPlayground>`，全站 Markdown 免导入直接书写；
   - 在 `docs/components/overview.md` 第 5 节升级交互演示与在线沙箱说明与双实机效果；
   - 沉淀专属深度技术指南 `docs/guide/playground-stackblitz.md`（配置 `order: 14` 自动纳入核心指引侧边栏，详解底层架构、生成的虚拟文件树与自定义依赖扩展方案）；
   - 在 `docs/guide/what-is-zenith.md` 核心特性矩阵表追加特性行；
   - 在全局命令中心 `VpCommandPalette.vue` 中配置快捷导航索引。
4. **编译构建与严苛验证**：
   - `pnpm typecheck` 零类型报错通过；
   - `pnpm docs:build` 验证通过，生成 `dist/guide/playground-stackblitz.html` 并更新 Service Worker 离线预缓存清单。


