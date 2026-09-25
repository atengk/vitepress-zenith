# 引入可插拔功能开关矩阵与高干扰项默认静默体系

为了解决功能全量常驻导致的“页面杂货铺”视觉疲劳，使 VitePress Zenith 模板既具备旗舰级技术能力，又兼具“克制、干净、极简”的现代工程水准，我们决定构建可插拔功能开关矩阵（Pluggable Feature Switch Matrix）。

## 考虑备选

- **全量无脑挂载（现状）**：
  - 所有组件（有用度评价、专注模式悬浮球、贡献者流、阅读进度条等）在所有文档底部与边缘硬编码挂载；
  - 缺陷：无后端埋点的占位卡片引发用户困惑，右下角发光悬浮球遮挡大纲，单人/私有项目被迫展示冗余头像流。
- **页面级手动逐一引入**：
  - 放弃全局 Layout，退化为在每篇 Markdown 中手动按需 import 组件；
  - 缺陷：大幅增加文档作者的写作摩擦力，丧失模板统一性。
- **可插拔开关矩阵（全局兜底 + 页面级 Frontmatter 局部覆写）**：
  - 在 `themeConfig.zenith` 专属命名空间下提供强类型开关契约；
  - **高干扰 / 进阶特性默认静默 (Opt-in，默认 `false`)**：
    - `i18n: false`（国际化多语言矩阵，关闭时不注册 en 语言，顶栏完全隐藏多语言切换下拉菜单）；
    - `versionSwitcher: false`（多版本管理与历史归档横幅，关闭时不注入版本下拉菜单与归档警告横幅）；
    - `helpful: false`（有用度点赞/点踩卡片，无后端埋点占位组件默认关闭）；
    - `zenModeToggle: false`（右下角专注模式悬浮球默认关闭，保留 `Alt+Z` 极客快捷键随时唤醒）；
    - `contributors: false`（开源贡献者致谢流默认关闭，单人/企业私有文档免受侵扰）。
  - **旗舰体验与阅读增强特性（做成开关，默认开启 `true`，可一键关闭）**：
    - `banner: true`（顶部全宽公告通知横幅，支持点击直达与本地持久化防打扰关闭）；
    - `themePicker: true`（顶栏 4 套主题强调色盘选择器）；
    - `commandPalette: true`（全局交互快捷命令中心，支持 `Ctrl+K` / `/` 唤起）；
    - `blog: true`（博客专栏系统与导航栏入口）；
    - `pwaStatus: true`（PWA 离线运行感知与应用安装横幅）；
    - `mediumZoom: true`（正文插图平滑点击放大灯箱）；
    - `readingMetrics: true`（正文字数统计与阅读耗时估算）；
    - `readingProgressBar: true`（页面顶部流光阅读进度条）；
    - `linkPreview: true`（站内内链卡片悬浮即时摘要预览）；
    - `keyboardShortcuts: true`（全键盘极客导航与速查浮层）；
    - `codeFolding: true`（超长代码块智能平滑渐变折叠）。
  - **单页 Frontmatter 绝对覆盖**：任意文档可通过 `helpful: true` 或 `readingMetrics: false` 进行页面级微调。

## 产生的后果

- 文档默认展现形态回归纯净、通透，彻底告别视觉噪音与冗余占位；
- 顶栏精简为清爽的核心导航，不再默认充斥版本下拉菜单与多语言切换器；
- 全站所有进阶与旗舰特性全部收拢为 `zenithConfig` 开关，站长在 `docs/.vitepress/config.ts` 中一处即可控制全部特性的即时开启或关闭；
- 页面 Frontmatter 保留最终控制权，满足草稿、博客、单页的差异化展示需求。
