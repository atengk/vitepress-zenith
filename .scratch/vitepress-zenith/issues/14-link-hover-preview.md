# 14 — 站内内链悬浮卡片预览 (Link Hover Preview)

**目标行为 (What to build):**
实现类似 Wikipedia / Notion 的站内相对链接悬浮预览气泡。当光标在正文中的站内文档链接上方停留 300ms 时，自动弹出精美浮层卡片，呈现目标文档的标题、标签、更新时间与首段摘要；移开鼠标时平滑淡出，极大减少读者为了查看背景概念而跳出当前页面的无谓跳转。

**前置依赖 (Blocked by):**
07 — 零依赖离线全文检索与自动化侧边栏
08 — 原生轻量博客与运营套件

**状态 (Status):**
resolved

- [x] 开发 `<VpLinkPreview>` 浮层组件与全局事件委托挂钩，监听正文中站内相对链接的 `mouseenter` / `mouseleave`
- [x] 提取或生成站内文档摘要索引，根据链接路由快速匹配目标文档的 Frontmatter 元数据
- [x] 实现防抖悬浮（延迟 300ms 触发，避免快速滑过误触）与自动翻转定位（防止超出视口边缘）
- [x] 卡片展示目标页面标题、标签徽标、首段内容预览与快速点击直达入口

## 解决方案 (Answer)

1. **编译期全站 Markdown 预聚合 Loader (`links.data.ts`)**：
   - 基于 VitePress `createContentLoader('**/*.md')`，在构建期提取全站文档元数据（标题、描述、首段实质文本摘要、分类徽标、字数统计与预计阅读耗时）；
   - 自动过滤代码块标记、HTML 注释与图片语法，提取纯净首段概念；
   - 建立规范化路径与多形态后缀（`.html`、`.md`、带斜杠/不带斜杠）映射表，保证各种 Markdown 内链写法的 O(1) 瞬时内存直查，零额外网络请求。
2. **全局内链悬浮预览组件 (`VpLinkPreview.vue`)**：
   - 基于事件委托监听 `.vp-doc` 内相对链接的鼠标悬浮，过滤外链、纯锚点、下载链接与自指链接；
   - **防抖悬浮 (Hover Intent)**：设计 280ms 停留防抖，杜绝鼠标快速扫过时的视觉闪烁；
   - **交互容差与锁定**：设置 160ms 移出保护宽限期，光标移入卡片本身保持常驻，支持在卡片内阅读或直接点击跳转；
   - **视口翻转防碰撞**：智能计算上下空间（不足 165px 时自动朝下翻转）与左右边界钳制（距视口边缘 $\ge 16\text{px}$）；
   - **触控安全**：针对触控设备 (`pointer: coarse`) 自动豁免，防范移动端点按干扰。
3. **全局布局装配与系统联动**：
   - 在 `docs/.vitepress/theme/Layout.vue` 的 `#layout-bottom` 插槽中挂载 `<VpLinkPreview />`；
   - 在 `docs/.vitepress/theme/index.ts` 注册全局组件并在 `print.css` 中将浮层加入隐藏过滤；
   - 在全局命令中心 `VpCommandPalette.vue` 注册快捷导航索引。
4. **技术指南与文档闭环**：
   - 沉淀专属深度技术指南 `docs/guide/link-hover-preview.md`（配置 `order: 11` 自动纳入核心指引侧边栏，提供 4 组实机交互示例）；
   - 在 `docs/components/overview.md` 增加第 10 节组件使用说明；
   - `pnpm typecheck` 与 `pnpm build` 全绿验证通过。
