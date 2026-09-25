# 11 — 阅读认知增强与超长代码块智能折叠

**目标行为 (What to build):**
在文档与博文标题下方自动统计正文字数并推导预计阅读耗时（如 `约 2,560 字 · 预计阅读 6 分钟`），降低长文认知负担；为正文中超过指定行数（默认 25 行）的代码块自动追加底部渐变半透明遮罩与“展开全部代码 / 收起”控件，提升长文阅读的信息密度。

**前置依赖 (Blocked by):**
01 — 工程底座与全能 Landing Page 骨架
03 — Shiki Twoslash 动态悬浮类型与 IDE 级代码块

**状态 (Status):**
resolved

- [x] 在 `DocMeta.vue` 与博文卡片中实现字数提取算法（汉字计数 + 英文词法切分）与阅读时长预估算法
- [x] 开发超长代码块折叠组件/指令或全局样式增强，超过 25 行自动折叠并提供优雅的半透明渐变遮罩
- [x] 折叠控件提供展开（显示总行数）与收起交互，并带有丝滑过渡动画
- [x] 确保代码块一键复制按钮与 Twoslash 悬浮提示在折叠状态下依然正常可用

## 解决方案 (Answer)

1. **阅读认知指标与字数/耗时算法 (`DocMeta.vue`, `posts.data.ts`, `VpBlogList.vue`)**：
   - 采用标准中西文混合词法分词（汉字字符计数 + 英文单词切分），基准阅读速率为 350 字/分钟；
   - 在 `DocMeta.vue` 中升级展示规范，使用现代 Lucide 语义图标（`i-lucide-file-text`、`i-lucide-clock`、`i-lucide-sparkles`）与精致圆角面板呈现；
   - 在 `docs/blog/posts.data.ts` 构建期 Loader 开启 `includeSrc: true`，提取各篇博文纯正文字数 `words` 与预计阅读分钟数 `readingTime`；
   - 在 `VpBlogList.vue` 的每张博文卡片元数据中，无缝呈现发布日期、作者、字数与预计阅读时间。
2. **超长代码块（>25行）半透明渐变折叠与交互展开 (`useCodeFolding.ts`, `code-folding.css`)**：
   - 封装 `useCodeFolding()` Hook，智能扫描 `.vp-doc div[class*="language-"]` 代码块；
   - 当行数超过 25 行时，自动应用 `.has-code-folding.is-collapsed` 限制最大高度为 480px，并生成底部 120px 渐变半透明遮罩与悬浮胶囊按钮；
   - 胶囊按钮动态展示 `展开全部代码 (共 N 行)`，点击平滑展开（无高度限制且隐去遮罩），按钮切换为 `收起代码`；
   - 收起代码时若代码块顶端已滚出视口，自动平滑滚动回代码块顶部（`scrollIntoView({ behavior: 'smooth', block: 'start' })`）；
   - 渐变遮罩设置 `pointer-events: none`，代码右上角一键复制按钮与 Shiki Twoslash 浮层提示在折叠态下 100% 正常可用。
3. **全局装配与文档范例验证**：
   - 在 `docs/.vitepress/theme/Layout.vue` 挂载 `useCodeFolding()`；
   - 在 `docs/.vitepress/theme/index.ts` 引入 `code-folding.css` 并导出 `useCodeFolding`；
   - 在 `docs/guide/code-enhancements.md` 增加第 6 节超长代码块演示（38 行 TypeScript 架构范例）；
   - 静态类型检查 `pnpm typecheck` 全绿；生产打包 `pnpm build` 47.95s 验证通过。
