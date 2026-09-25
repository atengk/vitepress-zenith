---
title: 动态强调色盘与白皮书级纯净打印
order: 10
---

# 动态强调色盘与白皮书级纯净打印

顶配的技术文档系统应当兼顾**屏幕沉浸阅读的个性化表达**与**离线归档排版的白皮书级严谨性**。VitePress Zenith 内置了 4 套经严格对比度校准的高质感主品牌强调色盘，并构建了专业的 `@media print` 打印净化规则引擎。

---

## 1. 架构理念与设计选型

在现代技术文档与企业知识库中，视觉系统需要应对多场景挑战：

1. **科技视觉辨识度**：不同业务线或开源产品往往需要契合其生态基调的品牌色（如云原生的翠绿、前沿科技的靛蓝、设计工具的蔷薇）；
2. **零运行时成本与抗闪烁 (Anti-FOUC)**：切换主题色彩无需刷新页面，刷新时不可出现从默认色跳变至自定义色的“视觉撕裂”；
3. **离线纸质化白皮书交付**：当工程师或架构师需要将文档导出为 PDF 或通过物理打印机装订成册时，屏幕交互控件（如搜索框、导航栏、折叠按钮、阅读进度条等）必须被彻底净化，正文必须具备优雅的黑白/彩色打印对比度并防范分页硬切。

---

## 2. 4 套预置高质感品牌色盘契约

Zenith 精心调配了 4 套符合 **WCAG AA / AAA** 无障碍对比度标准的主题强调色盘：

| 色盘标识 (ID) | 色系命名 | 核心色值 (Light / Dark) | 视觉语义与适用场景 |
| :--- | :--- | :--- | :--- |
| `indigo` (默认) | **经典紫蓝** | `#6366f1` / `#818cf8` | 理性、深邃的现代科技质感，通用技术中台与云原生基础设施 |
| `emerald` | **极客翠绿** | `#10b981` / `#34d399` | 清爽、通透的极客开源活力，极客博客、生态工具与敏捷框架 |
| `rose` | **潮流蔷薇** | `#f43f5e` / `#fb7185` | 鲜亮、敏锐的新锐设计美学，前端 UI 组件库、交互设计系统 |
| `amber` | **典雅琥珀** | `#d97706` / `#fbbf24` | 沉稳、温润的智识学术质地，学术论文、技术规范白皮书与技术专栏 |

### CSS 变量映射规范 (`docs/.vitepress/theme/styles/palette.css`)

每套色盘通过 HTML 根属性 `data-theme-palette="[id]"` 进行作用域约束，精准覆写 VitePress 标准主品牌颜色系统：

```css
/* 示例：极客翠绿 (Emerald) 变量集 */
html[data-theme-palette="emerald"] {
  --vp-c-brand-1: #10b981;
  --vp-c-brand-2: #059669;
  --vp-c-brand-3: #047857;
  --vp-c-brand-soft: rgba(16, 185, 129, 0.14);
}

html[data-theme-palette="emerald"].dark {
  --vp-c-brand-1: #34d399;
  --vp-c-brand-2: #10b981;
  --vp-c-brand-3: #059669;
  --vp-c-brand-soft: rgba(52, 211, 153, 0.16);
}
```

---

## 3. 动态无刷新换肤与防闪烁 (Anti-FOUC) 架构

### 1. 响应式状态管理 (`useThemePalette.ts`)
提供全局单例响应式 Hook `useThemePalette()`，统一负责色盘获取、即时修改与持久化同步：

```ts
import { useThemePalette } from '../composables/useThemePalette'

const { currentPalette, setPalette, palettes } = useThemePalette()

// 一键切换至潮流蔷薇色
setPalette('rose')
```

### 2. 毫秒级 DOM 属性注入
`setPalette()` 内部直接修改 `document.documentElement.dataset.themePalette`，借助现代浏览器对 CSS 变量的高效派发机制，全站链接、高亮框、渐变微光与按钮瞬间无感换肤。

### 3. 本地记忆与防闪烁内联脚本
为了防止用户刷新页面时由于 Vue 尚未水合导致短暂出现默认蓝色（FOUC 现象），Zenith 在站点 HTML `<head>` 中注入了微量防闪烁即时执行脚本：

```ts
// docs/.vitepress/config.ts
head: [
  ['script', {}, `(function(){try{var p=localStorage.getItem('zenith-theme-palette');if(p&&p!=='indigo'){document.documentElement.dataset.themePalette=p;}}catch(e){}})();`],
]
```

在 HTML 解析的最初阶段完成属性挂载，首屏呈现 100% 连贯平滑。

---

## 4. 多维交互入口：顶栏调色盘与全局命令中心

读者与开发者拥有多种途径触发色盘切换：

1. **顶栏视觉调色盘 (`<VpThemePicker />`)**：
   位于导航栏右侧（明暗切换开关与社交图标旁），悬浮呈现当前强调色呼吸圆点，点击弹出毛玻璃下拉列表，支持预览与快速选择；
2. **全局命令中心联动 (`Cmd+K` / `Ctrl+K`)**：
   按快捷键唤出命令面板，输入 `强调色`、`换肤`、`Emerald`、`Rose`、`紫蓝` 等关键词，直接通过方向键与回车一键切换并伴随轻量 Toast 提示。

---

## 5. 白皮书级纯净打印体系 (`@media print`)

传统网页直接打印通常存在排版凌乱、多余导航悬浮遮挡、背景暗黑消耗油墨、表格被生硬断页横切等通病。Zenith 在底层构建了专门的 `@media print` 样式体系（`docs/.vitepress/theme/styles/print.css`）。

### 1. 全局辅助元素深度净化
当按下 <kbd>Ctrl+P</kbd>（Mac: <kbd>Cmd+P</kbd>）或点击文档标题下方的**「打印」**按钮时，以下元素自动完全隐去：
- 顶部导航栏 (`.VPNav`) 与阅读进度条；
- 左侧目录边栏 (`.VPSidebar`) 与右侧大纲导读 (`.VPDocAside`)；
- 沉浸专注模式悬浮钮、反馈组件、底部上下篇翻页按钮；
- Giscus 社区讨论区域；
- 代码块右上角的一键复制按钮与折叠交互胶囊。

### 2. 纸质排版与无障碍墨水优化
- **背景与文字**：强制解除深色模式，正文背景转为纯净 `#ffffff`，正文采用高清晰度深黑炭灰色 `#111827`，对比度极高；
- **版心约束**：解除网页视口约束，左右边距自动适配标准 A4 / Letter 打印纸张规格（`@page { margin: 18mm 16mm; }`）；
- **超长折叠代码块自动展开**：原本在网页上被截断折叠的超长代码块（>25行），在打印态下**自动强制展开全量代码行**，保证纸质手册或 PDF 白皮书能够阅读完整实现；
- **智能规避横切断裂 (Break Avoidance)**：
  对代码块 (`pre`)、表格 (`table`)、引用块 (`blockquote`)、插图 (`img`) 及流程图 (`Mermaid` / `Markmap`) 开启 `page-break-inside: avoid; break-inside: avoid;`，防止关键图表被生硬地横切在两页纸中间。
- **标题防孤行**：标题元素应用 `page-break-after: avoid; break-after: avoid;`，避免出现页面底部单落一行孤立标题的拙劣排版。

---

## 6. 一键打印快速交互

在正文标题下方的元数据栏（`DocMeta.vue`）中，已集成直达打印按钮：

```html
<!-- 点击直接调起浏览器打印对话框并套用白皮书样式引擎 -->
<button class="print-quick-btn" @click="window.print()">
  <span class="i-lucide-printer" />
  <span>打印</span>
</button>
```

读者亦可通过命令中心（<kbd>Ctrl+K</kbd> -> 输入 `打印` 或 `PDF`）直接调起，即可生成开箱即用的技术白皮书文档。
