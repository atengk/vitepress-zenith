# 07 — 零依赖离线全文检索与自动化侧边栏

**目标行为 (What to build):**
配置 VitePress 原生内置 Local Search (Minisearch) 并加入中文分词引擎，提供秒级响应的离线全局中文全文检索；构建基于文件物理目录结构的侧边栏自动推导体系，自动读取 Frontmatter 的 `title` 与 `order` 排序，免去手工维护繁琐路由数组的心智负担。

**前置依赖 (Blocked by):**
01 — 工程底座与全能 Landing Page 骨架

**状态 (Status):**
completed

- [x] 在 `docs/.vitepress/config.ts` 中配置 `themeConfig.search.provider: 'local'`
- [x] 注入适用于中文内容的 Minisearch 分词与索引配置，测试中英文混合检索精度
- [x] 实现侧边栏自动化推导函数，自动扫描 `docs/` 下的章节目录生成层级侧边栏
- [x] 支持在 Frontmatter 中配置 `title`、`order` 与 `collapsed` 进行灵活重排
- [x] 保留手动覆盖插槽，确保在特殊章节可灵活手写精确侧边栏
