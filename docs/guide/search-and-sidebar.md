---
title: 自动化侧边栏与中文全文检索
order: 7
---

# 自动化侧边栏与离线中文全文检索

文档系统的可维护性与可检索性直接决定了知识库的长期生命力。VitePress Zenith 彻底免去了手动维护庞大路由数组的心智负担，并提供秒级响应的原生离线中文全局全文检索。

---

## 1. 物理目录扫描与侧边栏自动推导 (getAutoSidebar)

通过内置的自动化推导引擎，系统会自动扫描 `docs/` 目录下的物理文件结构：

- **自动提取标题**：优先读取 Frontmatter 的 `title` 属性，若未配置则自动提取 Markdown 正文首个 `# 大标题`；
- **灵活排序支持**：在页面 Frontmatter 中添加 `order: <数字>`，系统将按数字升序严格排列条目；
- **目录递归折叠**：支持子文件夹递归映射为二级折叠分组，并支持 `collapsed: true` 默认折叠；
- **条目隐藏过滤**：在 Frontmatter 中配置 `hidden: true`，即可在侧边栏中隐去特定草稿或独立落地页；
- **手动覆盖插槽**：支持传入 `overrides` 字段，允许对特定核心章节单独保留手工定制的侧边栏。

### Frontmatter 配置范例

```yaml
---
title: 极速上手指引
order: 1
collapsed: false
---
```

### 侧边栏配置调用 (`docs/.vitepress/config.ts`)

```ts
import { getAutoSidebar } from './utils/sidebar'

export default defineConfig({
  themeConfig: {
    sidebar: getAutoSidebar({
      groupTitles: {
        guide: '基础指引',
        components: '交互短代码组件库',
      },
    }),
  },
})
```

---

## 2. Minisearch 中文全文检索增强

VitePress 原生内置基于 Minisearch 的离线客户端检索。Zenith 针对中文及多语言混合技术场景进行了深度优化：

### 原生高精度词法分词

基于 ECMAScript 国际化标准 `Intl.Segmenter`（`zh-CN` 粒度词法切分），无需下载数百 KB 的额外分词依赖包：

- **中英混合精确匹配**：无论搜索英文标识符（如 `Twoslash`）还是中文词组（如 `包管理器`、`沉浸模式`），均能精准命中文档分段；
- **智能权重提升 (Boost)**：
  - 页面标题权重提升至 `4`；
  - 正文高光权重提升至 `2`；
  - 二级标题权重为 `1`；
- **前缀与模糊容错**：默认开启 `fuzzy: 0.2` 容错匹配与 `prefix: true` 前缀联想搜索。
