# 13 — 动态主题强调色盘与白皮书级纯净打印

**目标行为 (What to build):**
预置 4 套高质感主品牌强调色盘（Indigo 经典紫蓝、Emerald 极客翠绿、Rose 潮流蔷薇、Amber 典雅琥珀），支持读者在界面上一键无缝切换并本地持久化存储；构建专门的 `@media print` 打印样式体系，按下 <kbd>Ctrl+P</kbd> 时自动净化所有辅助浮层，一键输出排版规整的白皮书级 PDF。

**前置依赖 (Blocked by):**
01 — 工程底座与全能 Landing Page 骨架
02 — 沉浸式专注阅读模式与阅读进度条

**状态 (Status):**
resolved

- [x] 提炼 4 套标准色调变量集，支持通过注入 `:root` 变量实现秒级动态换肤
- [x] 封装 `<VpThemePicker>` 调色盘交互组件，支持预览色块、本地存储记忆与即时生效
- [x] 将调色盘入口集成于顶栏、交互命令中心或专注浮动栏中
- [x] 编写专业 `@media print` 样式规则，打印时自动隐藏顶栏、侧边栏、专注悬钮与交互按钮，优化行高与分页
- [x] 验证各色盘深浅模式对比度与打印预览排版

## 解决方案 (Answer)

1. **4 套预置品牌强调色盘与响应式状态机 (`useThemePalette.ts`, `palette.css`)**：
   - 严选 4 套符合 WCAG AA/AAA 对比度标准的高质感色盘：`indigo`（经典紫蓝，默认）、`emerald`（极客翠绿）、`rose`（潮流蔷薇）、`amber`（典雅琥珀）；
   - 在 `palette.css` 中基于 `html[data-theme-palette="..."]` 及 `.dark` 映射核心品牌色、背景渐变与悬浮光晕；
   - 封装单例 Hook `useThemePalette()`，支持一键切换并持久化记忆至 `localStorage`（键名 `zenith-theme-palette`）；
   - 在 `docs/.vitepress/config.ts` 的 `<head>` 注入防闪烁 (Anti-FOUC) 极速探针内联脚本，确保首屏加载零撕裂跳变。
2. **调色盘视觉交互组件与全局联动 (`VpThemePicker.vue`, `VpCommandPalette.vue`)**：
   - 开发 `<VpThemePicker>` 下拉调色盘组件，挂载于顶部导航栏右侧（`nav-bar-content-after` 及移动端 `nav-screen-content-after`）；
   - 交互按钮带有当前色系呼吸圆点，下拉面板展示各色系中英文名、视觉描述与当前生效勾选状态；
   - 在全局命令中心 `VpCommandPalette.vue` 中注册 4 套色盘的切换指令（支持“换肤”、“强调色”、“Emerald”等模糊搜），并提供“打印当前文档 / 导出 PDF”快捷动作。
3. **白皮书级纯净打印体系 (`print.css`, `DocMeta.vue`)**：
   - 编写白皮书级 `@media print` 打印规范，彻底屏蔽顶部导航、侧边栏、目录导读、进度条、评论区、浮动按钮等屏幕交互杂质；
   - 强制重置正文为高清晰度 `#111827` 纯黑字体与 `#ffffff` 纯白背景，解除深色模式并节约油墨；
   - 针对代码块、表格、图片、Mermaid、Markmap 开启 `break-inside: avoid`，对各级标题应用 `break-after: avoid`，杜绝生硬横切断页与孤行；
   - 超长折叠代码块在打印态下自动展开全量代码，保证技术交付物完整性；
   - 在 `DocMeta.vue` 标题栏追加一键「打印」快捷按钮。
4. **技术指南与文档闭环**：
   - 沉淀专属深度技术指南 `docs/guide/theme-and-print.md`（配置 `order: 10` 自动纳入核心指引侧边栏）；
   - 在 `docs/components/overview.md` 补充组件介绍与用法说明；
   - `pnpm typecheck` 与 `pnpm build` 全绿验证通过。
