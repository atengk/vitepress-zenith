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

