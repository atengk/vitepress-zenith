# 21 — 开源贡献者致谢流与 Git 变更历史 (Contributors Stream)

**目标行为 (What to build):**
增强开源社区协同荣誉感。基于 Git 历史或构建期数据生成当前 Markdown 文档的贡献者头像流组件 `<VpContributors>`，在文档底部呈现“本页贡献者”头像排与致谢信息，并提供醒目的“在 GitHub 上编辑此页 (Edit this page on GitHub)”链接，激发开源社区共建活力。

**前置依赖 (Blocked by):**
08 — 原生轻量博客与运营套件

**状态 (Status):**
resolved

- [x] 开发编译期或运行时 Git 贡献者提取模块，解析当前文档文件的 Commit 作者与 GitHub 用户名
- [x] 封装 `<VpContributors>` 组件，在文档末尾优雅展示贡献者头像流与贡献人数统计
- [x] 头像支持悬浮 Tooltip 提示作者名称与 Commit 简要，点击直达 GitHub 个人主页
- [x] 强化“在 GitHub 上编辑此页”链接样式与图标，支持通过 `themeConfig.editLink` 自定义仓库模式
- [x] 沉淀专属深度技术指南文档（`docs/guide/contributors-stream.md`），并在 `what-is-zenith.md` 核心特性矩阵表与全局导航中注册

## 解决方案 (Answer)
1. **构建期 Git 日志提取引擎**：开发 `docs/.vitepress/theme/utils/contributors.data.ts`，利用 `createContentLoader` 在 Node.js 构建期增量执行 `git log --name-only` 批量归纳全站 Markdown 文档的历史 Commit，自动提取作者姓名、邮箱 MD5 头像、提交次数与变更摘要。
2. **贡献者头像流组件 (`<VpContributors>`)**：开发 `<VpContributors.vue>` 组件，展示圆角重叠头像流与贡献人数徽标，悬浮展开作者提交明细 Tooltip，点击直达 GitHub 个人主页；挂载于 `Layout.vue` 的 `#doc-footer-before` 插槽中。
3. **GitHub 编辑协同深度集成**：在 `docs/.vitepress/config.ts` 中针对中英文配置 `themeConfig.editLink` 仓库模板，组件自动插值当前文档物理相对路径并附带外链图标，引导读者一键提交 PR。
4. **技术指南与全局索引**：沉淀专属指南 `docs/guide/contributors-stream.md`，并在全局命令中心与核心特性矩阵表中完成全案索引注册。

