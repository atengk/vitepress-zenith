# 16 — 结构化参数契约表组件 (VpApiTable)

**目标行为 (What to build):**
封装专为技术文档设计的结构化参数与配置项呈现组件 `<VpApiTable>` 与 `<VpApiItem>`，支持在 Markdown 中免 import 直接书写。彻底根除原生 Markdown 宽表格在移动端和窄屏下的拥挤换行与横向截断；提供类型胶囊、默认值标签、必填标记与版本注记，在窄屏自适应降级为垂直弹性卡片流。

**前置依赖 (Blocked by):**
06 — 全局免导入交互短代码组件库

**状态 (Status):**
resolved

- [x] 开发 `<VpApiTable>` 容器组件与 `<VpApiItem>` 参数项组件
- [x] 支持属性：`name` (参数名)、`type` (TS类型/高光标签)、`default` (默认值)、`required` (是否必填)、`version` (引入版本)
- [x] 桌面端呈现规整的自适应表格结构，移动端（<768px）平滑无缝降级为卡片折叠流
- [x] 在 `docs/components/overview.md` 补充参数表的演示与使用规范
- [x] 沉淀专属深度技术指南文档（`docs/guide/structured-api-table.md`），并在 `what-is-zenith.md` 核心特性矩阵表与全局导航中注册

## 解决方案 (Answer)

1. **研发结构化参数契约表组件对 (`VpApiTable.vue` 与 `VpApiItem.vue`)**：
   - **语义化网格与响应式流**：基于 CSS Grid + Flexbox 布局模型构建，桌面端严整呈现参数名称、类型契约、默认值、版本与详细描述；移动端（`<768px`）自动隐藏冗余表头，无缝降级为独立高质感卡片流，彻底根除原生 Markdown 宽表格在手机端的横向截断与丑陋滚动条；
   - **工程级语义高光胶囊**：内置红色必填（`required`）胶囊、TS 类型（`type`）语法蓝光高亮、默认值（`default`）中性底色框、版本（`version`）绿标徽章与废弃划线（`deprecated`）告警；
   - **即时关键字检索过滤**：支持通过 `:searchable="true"` 开启右上角搜索框，利用 Vue `provide` / `inject` 实现对参数名、类型定义与说明文本的毫秒级即时过滤，大幅提升超长 API 契约表的查阅效率；
   - **双模态语法**：同时支持声明式嵌套标签模式（支持默认插槽富文本、链接与行内代码块）与数据驱动模式（`:items="[...]"` 纯 JSON 传参）。
2. **全局短代码免导入注册与白皮书打印适配 (`docs/.vitepress/theme/`)**：
   - 在 `theme/index.ts` 中完成全局组件注册，全站任意 Markdown 文档免 `import` 即可直接书写；
   - 适配白皮书纯净打印模式（`print.css`），导出 PDF 时自动净化检索控制栏。
3. **组件规范与技术文档闭环**：
   - 在 `docs/components/overview.md` 增加第 11 节组件规范，提供两种调用模式的实机效果与代码示例；
   - 沉淀专属深度技术指南文档 `docs/guide/structured-api-table.md`（配置 `order: 13` 自动纳入核心指引侧边栏，包含自身 API 属性自省 Dogfooding 演示）；
   - 在 `docs/guide/what-is-zenith.md` 核心特性矩阵表中登记新特性；
   - 在全局命令中心 `VpCommandPalette.vue` 中配置快捷导航索引。
4. **编译构建与严苛验证**：
   - `pnpm typecheck` 零类型报错；
   - `pnpm docs:build` 验证通过，成功生成 `dist/guide/structured-api-table.html` 与全站更新后的 Service Worker 预缓存清单。


