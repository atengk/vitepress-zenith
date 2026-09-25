# 18 — 中英多语言国际化架构 (i18n Matrix)

**目标行为 (What to build):**
基于 VitePress 原生 `locales` 架构构建标准化的中英双语国际化矩阵。在 `docs/.vitepress/config.ts` 中配置双语映射（根目录中文 `zh-CN` 与 `/en/` 英文 `en-US`），顶栏激活官方语言切换器；扩展 `getAutoSidebar` 自动感知当前语言子目录并生成独立侧边栏；Minisearch 自动按语言切分并启用对应分词器（英文词根与中文分词互不干扰）。

**前置依赖 (Blocked by):**
07 — 零依赖离线全文检索与自动化侧边栏

**状态 (Status):**
resolved

- [x] 在 `docs/.vitepress/config.ts` 中配置 `locales` 根语言与 `en` 国际化语言节点
- [x] 顶栏激活语言切换下拉菜单（`切换语言 / Languages`）
- [x] 升级 `getAutoSidebar` 支持传入 `locale` 隔离推导各语言侧边栏
- [x] 在 `search.options.locales` 中为 `en` 配置专用的英文 Minisearch 检索选项与词法切分
- [x] 在 `docs/en/` 提供英文基础指引页面样例文档（`index.md` 与 `guide/what-is-zenith.md`）
- [x] 沉淀专属深度技术指南文档（`docs/guide/i18n-matrix.md`），并在 `what-is-zenith.md` 核心特性矩阵表与全局导航中注册

## 解决方案 (Answer)
1. **多语言配置**：在 `docs/.vitepress/config.ts` 根配置中抽取公共配置并定义 `locales`，根路径 `/` 对应中文（`lang: 'zh-CN'`），`/en/` 对应英文（`lang: 'en-US'`）。
2. **多语言侧边栏**：升级 `docs/.vitepress/utils/sidebar.ts` 中 `getAutoSidebar` 方法，支持 `locale` 与 `baseRoute` 参数，中文侧边栏自动排除 `en` 目录，英文侧边栏指定根为 `docs/en` 并生成前缀为 `/en/` 的路由树。
3. **Minisearch 本地化分词**：在 `search.options.locales` 中分别配置中文与英文搜索策略，中文采用 `Intl.Segmenter`，英文采用标准正则空白/标点分词，UI 提示全面本地化。
4. **英文基础页面与技术文档**：创建 `docs/en/index.md` 与 `docs/en/guide/what-is-zenith.md`；沉淀深度指南 `docs/guide/i18n-matrix.md`，并在特性矩阵及全局快捷指令浮层中注册。

