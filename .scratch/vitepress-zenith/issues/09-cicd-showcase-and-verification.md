# 09 — 自动化持续交付与全功能演示指南

**目标行为 (What to build):**
配置 GitHub Actions 自动构建与部署至 GitHub Pages 的工作流；编写全功能演示指南文档与各扩展实测案例（包含沉浸式阅读指引、Twoslash 演示、Markmap 思维导图、短代码沙箱及数学公式）；执行端到端 `pnpm build` 与 `pnpm preview` 静态渲染校验，确保 0 报错闭环交付。

**前置依赖 (Blocked by):**
01 — 工程底座与全能 Landing Page 骨架
02 — 沉浸式专注阅读模式与阅读进度条
03 — Shiki Twoslash 动态悬浮类型与 IDE 级代码块
04 — 全站跨页面同步的包管理器选项卡
05 — 全能可视化与富媒体
06 — 全局免导入交互短代码组件库
07 — 零依赖离线全文检索与自动化侧边栏
08 — 原生轻量博客与运营套件

**状态 (Status):**
ready-for-agent

- [ ] 编写 `.github/workflows/deploy.yml`，配置推送主分支自动触发静态打包与 Pages 部署
- [ ] 编写详尽的指南文档（`docs/guide/`），覆盖所有 Zenith 功能的用法、短代码语法与配置参数
- [ ] 编写 SEO 与站点地图（Sitemap）配置，预留社交分享卡片与网站统计插槽
- [ ] 运行 `pnpm run build` 进行端到端生产级编译构建，验证 0 报错与 SSG 完整性
- [ ] 运行 `pnpm run preview` 本地拉起静态服务器，验证各交互功能运行完备无误
