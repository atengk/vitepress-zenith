---
title: 组件总览与范例
order: 1
---

# 交互短代码组件库 (Auto-registered Shortcodes)

VitePress Zenith 预置了一套现代高质感、在全站任何 Markdown 文件中**免 import 直接书写**的交互短代码组件库。

---

## 1. 卡片与矩阵 (VpCard & VpCardGrid)

提供响应式多列自适应网格与悬浮高光渐变卡片，支持 UnoCSS 纯 CSS 图标、徽标与外部链接箭头。

<VpCardGrid :cols="3">
  <VpCard
    title="极速构建"
    desc="基于 Vite 与 Rollup 底层，瞬时冷启动与毫秒级热更新。"
    icon="i-lucide-zap"
    badge="高性能"
    badgeType="tip"
  />
  <VpCard
    title="沉浸专注"
    desc="一键切换 Alt+Z 双向展翼 1180px 宽屏阅读画布。"
    icon="i-lucide-eye"
    badge="独家特性"
    badgeType="purple"
  />
  <VpCard
    title="类型诊断"
    desc="集成 Shiki Twoslash，文档内代码块实时悬浮类型与报错波浪线。"
    icon="i-lucide-code-2"
    badge="IDE体验"
    badgeType="info"
  />
</VpCardGrid>

```html
<VpCardGrid :cols="3">
  <VpCard
    title="极速构建"
    desc="基于 Vite 与 Rollup 底层，瞬时冷启动与毫秒级热更新。"
    icon="i-lucide-zap"
    badge="高性能"
    badgeType="tip"
  />
</VpCardGrid>
```

---

## 2. 状态胶囊徽标 (VpBadge)

提供 6 种语义色（`tip`、`success`、`info`、`warning`、`danger`、`purple`）、3 种视觉变体（`subtle`、`solid`、`outline`）与可选小圆点（`dot`）。

<div style="display: flex; gap: 8px; flex-wrap: wrap; margin: 16px 0;">
  <VpBadge type="tip">默认推荐</VpBadge>
  <VpBadge type="success" dot>编译成功</VpBadge>
  <VpBadge type="info" variant="solid">v1.2.0</VpBadge>
  <VpBadge type="purple" variant="outline">实验性特性</VpBadge>
  <VpBadge type="warning" dot>即将废弃</VpBadge>
  <VpBadge type="danger" variant="solid">严重警告</VpBadge>
</div>

```html
<VpBadge type="tip">默认推荐</VpBadge>
<VpBadge type="success" dot>编译成功</VpBadge>
<VpBadge type="info" variant="solid">v1.2.0</VpBadge>
<VpBadge type="purple" variant="outline">实验性特性</VpBadge>
```

---

## 3. 版本演进与项目时间轴 (VpTimeline & VpTimelineItem)

用于优雅展示系统演进历程、更新日志（Changelog）与版本里程碑。

<VpTimeline>
  <VpTimelineItem
    time="2026-09-25"
    version="v1.0.0"
    title="VitePress Zenith 正式发布"
    type="primary"
    icon="i-lucide-rocket"
  >
    <ul>
      <li>完成全能 Landing Page 与现代玻璃拟态排版；</li>
      <li>支持 Shiki Twoslash 动态类型与编译诊断；</li>
      <li>全站联动包管理器选项卡与 1180px 专注模式。</li>
    </ul>
  </VpTimelineItem>

  <VpTimelineItem
    time="2026-09-20"
    version="v0.9.0-rc"
    title="富媒体与公式系统集成"
    type="success"
    icon="i-lucide-check-circle-2"
  >
    <p>集成 MathJax3 数学公式、Mermaid 流程图与 Markmap 交互脑图。</p>
  </VpTimelineItem>

  <VpTimelineItem
    time="2026-09-10"
    version="v0.5.0-beta"
    title="架构选型确立"
    type="info"
  >
    <p>基于 VitePress 官方默认主题扩展结合 UnoCSS 原子层构建。</p>
  </VpTimelineItem>
</VpTimeline>

```html
<VpTimeline>
  <VpTimelineItem
    time="2026-09-25"
    version="v1.0.0"
    title="VitePress Zenith 正式发布"
    type="primary"
    icon="i-lucide-rocket"
  >
    <ul>
      <li>完成全能 Landing Page 与现代玻璃拟态排版；</li>
    </ul>
  </VpTimelineItem>
</VpTimeline>
```

---

## 4. 外部资源导航卡片 (VpLinkCard)

高质感精美资源外链卡片，悬浮时平滑位移并具备箭头指向动效：

<VpLinkCard
  title="Vue 3 官方文档"
  desc="渐进式 JavaScript 框架，具备极高开发效率与灵活响应式系统。"
  href="https://vuejs.org"
  icon="i-lucide-code"
  badge="核心框架"
/>

<VpLinkCard
  title="VitePress 官方站点"
  desc="由 Vite 和 Vue 驱动的极速静态站点生成器，提供极佳的 Markdown 写作体验。"
  href="https://vitepress.dev"
  icon="i-lucide-book-open"
  badge="引擎底座"
/>

```html
<VpLinkCard
  title="Vue 3 官方文档"
  desc="渐进式 JavaScript 框架，具备极高开发效率与灵活响应式系统。"
  href="https://vuejs.org"
  icon="i-lucide-code"
  badge="核心框架"
/>
```

---

## 5. 交互运行态与源码折叠沙箱 (VpDemoPreview)

在同一个卡片中同时展示组件的实时交互运行态与源码，支持展开/收起代码与一键复制代码：

<VpDemoPreview
  title="徽标与卡片组合交互演示"
  desc="点击展开代码即可查看底层 Markdown 书写结构"
  code="<VpCard title='演示卡片' desc='这是一个动态运行预览' icon='i-lucide-sparkles' />"
>
  <div style="display: flex; gap: 12px; align-items: center;">
    <VpBadge type="tip" dot>在线运行中</VpBadge>
    <VpBadge type="purple" variant="solid">Demo Sandbox</VpBadge>
    <span style="font-size: 13.5px; color: var(--vp-c-text-2);">实时响应式渲染正常</span>
  </div>

  <template #code>

```html
<div style="display: flex; gap: 12px; align-items: center;">
  <VpBadge type="tip" dot>在线运行中</VpBadge>
  <VpBadge type="purple" variant="solid">Demo Sandbox</VpBadge>
  <span style="font-size: 13.5px; color: var(--vp-c-text-2);">实时响应式渲染正常</span>
</div>
```

  </template>
</VpDemoPreview>

```html
<VpDemoPreview title="交互演示" code="<VpBadge type='tip'>示例文案</VpBadge>">
  <!-- 运行态插槽 -->
  <VpBadge type="tip">示例文案</VpBadge>

  <!-- 源码折叠插槽 -->
  <template #code>
    ```html
    <VpBadge type="tip">示例文案</VpBadge>
    ```
  </template>
</VpDemoPreview>
```

---

## 6. 全宽公告通知横幅 (VpBanner)

全站顶栏公告条，支持平滑折叠关闭与 `localStorage` 记忆防打扰。已默认挂载在站点全域顶部，亦可在独立页面内嵌入。

<VpBanner
  id="demo-banner-doc"
  :fixed="false"
  text="✨ 欢迎体验全新组件库与通知横幅组件！"
  link="/blog/"
  linkText="探索博客矩阵 →"
/>

```html
<VpBanner
  id="announcement-v1"
  text="🎉 欢迎体验 VitePress Zenith 旗舰级技术文档与知识库矩阵模板！"
  link="/guide/what-is-zenith"
  linkText="了解详情 →"
  :dismissible="true"
/>
```

---

## 7. 文档有用度评价 (VpHelpful)

文档底部轻量反馈交互组件，已默认挂载于全站每篇文档正文与翻页器之间，支持本地记忆已投票状态并提供鼓励动效气泡。

<VpHelpful />

```html
<VpHelpful />
```

---

## 8. 技术社区讨论与评论 (VpComments)

基于 GitHub Discussions 的无服务器评论体系，已默认挂载于全站技术文档与博客专栏末尾，支持深浅模式无缝自适应：

- **零服务器成本**：无任何自建数据库或外部服务器依赖，天然具备防刷屏与高质量技术交流氛围；
- **主题实时换肤**：监听 VitePress 的 `isDark` 状态机，无需重新刷新页面即可实时切换 Giscus 深浅主题；
- **页面级精确控制**：在任意文章 Frontmatter 中声明 `comments: false`，即可针对特定草稿或公告单独关闭评论区。

### 全局配置示例 (`docs/.vitepress/config.ts`)

```ts
export default defineConfig({
  themeConfig: {
    giscus: {
      enabled: true,
      repo: 'your-username/your-repo',
      repoId: 'R_kgDO...',
      category: 'General',
      categoryId: 'DIC_kwDO...',
      mapping: 'pathname',
      lang: 'zh-CN',
    },
  },
})
```

---

## 9. 动态强调色盘选择器 (VpThemePicker)

已默认集成于全局顶部导航栏右侧，支持读者一键切换 4 套精心校准的高质感主品牌色，并具备本地持久化记忆：

- **4 套预置色盘**：Indigo 经典紫蓝、Emerald 极客翠绿、Rose 潮流蔷薇、Amber 典雅琥珀；
- **防闪烁 (Anti-FOUC) 注入**：结合 `<head>` 极速探针脚本，页面刷新绝无色相跳变；
- **组件式调用**：除顶栏常驻外，二开团队亦可在任意页面或悬浮栏中独立复用：

```html
<VpThemePicker />
```

---

## 10. 站内内链悬浮预览组件 (VpLinkPreview)

已全局开箱即用挂载于全站底层，提供类似 Wikipedia / Notion 的沉浸式内链预览：

- **无感预加载**：编译期构建全站 Markdown 文档元数据索引，瞬时 O(1) 内存解析；
- **防抖与容差**：280ms 悬浮防抖避免误触，160ms 移出保护允许光标平滑滑入卡片选读；
- **视口翻转防碰撞**：智能计算上下空间与左右边缘，防止浮层超出视口；
- **零侵入书写**：无需特殊短代码语法，普通 Markdown 相对链接自动获得预览能力。

---

## 11. 结构化参数契约表 (VpApiTable & VpApiItem)

专为技术文档设计的结构化参数与配置项呈现组件，彻底根除原生 Markdown 宽表格在移动端和窄屏下的拥挤换行与横向截断。在桌面端以严整网格对齐，在移动端（`<768px`）平滑自适应降级为垂直弹性卡片流。

### 实机效果演示

<VpApiTable
  title="ComponentProps 配置契约"
  description="支持类型高光、默认值胶囊、必填标记、版本注记与即时检索过滤"
  :searchable="true"
>
  <VpApiItem
    name="title"
    type="string"
    required
    version="v1.0.0"
    description="表格主标题文案，为空时不渲染顶部标题行"
  />
  <VpApiItem
    name="searchable"
    type="boolean"
    default="false"
    version="v1.1.0"
  >
    是否开启右上角即时过滤检索输入框。读者可输入关键字快速过滤目标参数。
  </VpApiItem>
  <VpApiItem
    name="items"
    type="ApiTableItem[]"
    default="[]"
    version="v1.0.0"
    description="数组形式的参数配置列表，支持数据驱动模式免写嵌套标签"
  />
  <VpApiItem
    name="legacyMode"
    type="boolean"
    default="false"
    deprecated="v2.0.0"
    description="旧版兼容模式开关，已在 v2.0.0 中废弃，建议直接使用标准模式"
  />
</VpApiTable>

### 标签插槽模式代码示例

```html
<VpApiTable title="组件参数契约" :searchable="true">
  <VpApiItem
    name="timeout"
    type="number"
    default="3000"
    required
    version="v1.0.0"
    description="网络请求超时时间，单位毫秒"
  />
  <VpApiItem
    name="headers"
    type="Record<string, string>"
    version="v1.2.0"
  >
    自定义 HTTP Header 请求头键值对，支持动态注入认证 Token。
  </VpApiItem>
</VpApiTable>
```

### 数据驱动模式代码示例

```html
<VpApiTable
  title="全局配置选项"
  :items="[
    { name: 'apiUrl', type: 'string', required: true, description: '后端接口服务基准地址' },
    { name: 'retries', type: 'number', default: '3', version: 'v1.1.0', description: '失败自动重试最大次数' }
  ]"
/>
```
