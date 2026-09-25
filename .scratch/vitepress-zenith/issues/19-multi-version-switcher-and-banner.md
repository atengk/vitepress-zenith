# 19 — 多版本文档管理与归档警告横幅 (Version Switcher)

**目标行为 (What to build):**
支持大型开源库与严肃工程的多版本文档生命周期管理。顶栏提供版本切换下拉菜单（展示当前版本 `v1.0.0`、历史归档与预览版本）；对于标记为历史旧版的文档，页面顶部自动注入显眼的警示横幅（`<VpLegacyBanner>`），提醒读者“您正在查阅历史归档版本”，并提供一键跳转至最新稳定版文档的直达链接。

**前置依赖 (Blocked by):**
01 — 工程底座与全能 Landing Page 骨架
08 — 原生轻量博客与运营套件

**状态 (Status):**
resolved

- [x] 在顶栏导航栏中预置多版本下拉切换槽位与配置范例
- [x] 开发 `<VpLegacyBanner>` 历史归档警告横幅组件
- [x] 根据当前路由路径（如匹配 `/v0.` 或特定历史路径）或 Frontmatter `legacy: true` 自动触发归档横幅展示
- [x] 横幅提供警告文案与“点击前往最新版本”一键引导跳转按钮
- [x] 沉淀专属深度技术指南文档（`docs/guide/version-switcher.md`），并在 `what-is-zenith.md` 核心特性矩阵表与全局导航中注册

## 解决方案 (Answer)
1. **多版本下拉导航**：在 `docs/.vitepress/config.ts` 中为中英文站点顶栏新增版本下拉菜单，呈现当前稳定版 (`v1.0.0`)、历史版本 (`v0.9.0`)、管理指南与 Changelog。
2. **归档警告组件 (`<VpLegacyBanner>`)**：开发兼具自适应与手写短代码能力的 `<VpLegacyBanner.vue>` 组件，集成于 `Layout.vue` 的 `#doc-before` 插槽中。
3. **双重自动探测与智能平移**：基于路由路径正则（如匹配 `/v0/`、`/legacy/`）与 Frontmatter 标识（`legacy: true`）实现双重自动感知；若处于历史旧版，自动平移路由计算最新稳定版等价跳转链接，支持中英双语国际化文案与用户关闭折叠。
4. **旧版指引与技术专篇**：提供 `docs/v0/guide/index.md` 作为真实旧版演示与独立侧边栏；沉淀技术指南 `docs/guide/version-switcher.md`，并在全局命令中心与核心特性矩阵表中完成索引注册。

