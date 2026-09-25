# 16 — 结构化参数契约表组件 (VpApiTable)

**目标行为 (What to build):**
封装专为技术文档设计的结构化参数与配置项呈现组件 `<VpApiTable>` 与 `<VpApiItem>`，支持在 Markdown 中免 import 直接书写。彻底根除原生 Markdown 宽表格在移动端和窄屏下的拥挤换行与横向截断；提供类型胶囊、默认值标签、必填标记与版本注记，在窄屏自适应降级为垂直弹性卡片流。

**前置依赖 (Blocked by):**
06 — 全局免导入交互短代码组件库

**状态 (Status):**
ready-for-agent

- [ ] 开发 `<VpApiTable>` 容器组件与 `<VpApiItem>` 参数项组件
- [ ] 支持属性：`name` (参数名)、`type` (TS类型/高光标签)、`default` (默认值)、`required` (是否必填)、`version` (引入版本)
- [ ] 桌面端呈现规整的自适应表格结构，移动端（<768px）平滑无缝降级为卡片折叠流
- [ ] 在 `docs/components/overview.md` 补充参数表的演示与使用规范
