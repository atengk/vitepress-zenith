# 采用 VitePress 官方主题扩展结合 UnoCSS 构建 Zenith 模板

为了在维持 VitePress 官方长期兼容性与极佳构建性能的同时提供现代化的视觉质感，我们决定放弃从零定制独立主题，选择基于 VitePress 官方默认主题进行深度扩展，并引入 UnoCSS 作为原子化样式与图标引擎。

## 考虑备选

- 从零自研独立 Vue 主题：深度可控，但与官方主题升级脱轨，需自行维护响应式布局、移动端折叠、搜索适配等底层基建。
- Tailwind CSS v4：社区生态庞大，但在纯文档开发体验上比 UnoCSS 略重，缺少 UnoCSS 对纯 CSS 图标加载的原生整合。

## 产生的后果

- 保持与 VitePress 核心升级 100% 兼容。
- 支持直接在 Markdown 或 Vue 组件中使用原子化 CSS 与 Iconify 图标（如 `i-lucide-rocket`）。
