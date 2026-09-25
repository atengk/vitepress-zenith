/**
 * VitePress 默认主题扩展入口
 * @author Ateng
 * @since 2026-09-25
 */

import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'
import Layout from './Layout.vue'
import PackageManagerTabs from './components/PackageManagerTabs.vue'
import Mermaid from './components/Mermaid.vue'
import Markmap from './components/Markmap.vue'
import VpCard from './components/VpCard.vue'
import VpCardGrid from './components/VpCardGrid.vue'
import VpBadge from './components/VpBadge.vue'
import VpTimeline from './components/VpTimeline.vue'
import VpTimelineItem from './components/VpTimelineItem.vue'
import VpLinkCard from './components/VpLinkCard.vue'
import VpDemoPreview from './components/VpDemoPreview.vue'
import 'virtual:uno.css'
import './styles/vars.css'
import './styles/custom.css'
import './styles/zen-mode.css'
import '@shikijs/vitepress-twoslash/style.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router, siteData }) {
    app.use(TwoslashFloatingVue)
    app.component('PackageManagerTabs', PackageManagerTabs)
    app.component('PackageTabs', PackageManagerTabs)
    app.component('Mermaid', Mermaid)
    app.component('Markmap', Markmap)
    app.component('VpCard', VpCard)
    app.component('VpCardGrid', VpCardGrid)
    app.component('VpBadge', VpBadge)
    app.component('VpTimeline', VpTimeline)
    app.component('VpTimelineItem', VpTimelineItem)
    app.component('VpLinkCard', VpLinkCard)
    app.component('VpDemoPreview', VpDemoPreview)
  },
} satisfies Theme
