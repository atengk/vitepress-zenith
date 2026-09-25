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
import VpBanner from './components/VpBanner.vue'
import VpHelpful from './components/VpHelpful.vue'
import VpBlogList from './components/VpBlogList.vue'
import VpCommandPalette from './components/VpCommandPalette.vue'
import VpComments from './components/VpComments.vue'
import VpThemePicker from './components/VpThemePicker.vue'
import VpLinkPreview from './components/VpLinkPreview.vue'
import { useCommandPalette } from './composables/useCommandPalette'
import { useCodeFolding } from './composables/useCodeFolding'
import { useThemePalette } from './composables/useThemePalette'
import 'virtual:uno.css'
import './styles/vars.css'
import './styles/custom.css'
import './styles/palette.css'
import './styles/print.css'
import './styles/zen-mode.css'
import './styles/code-folding.css'
import '@shikijs/vitepress-twoslash/style.css'

export { useCommandPalette, useCodeFolding, useThemePalette }

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
    app.component('VpBanner', VpBanner)
    app.component('VpHelpful', VpHelpful)
    app.component('VpBlogList', VpBlogList)
    app.component('VpCommandPalette', VpCommandPalette)
    app.component('VpComments', VpComments)
    app.component('VpThemePicker', VpThemePicker)
    app.component('VpLinkPreview', VpLinkPreview)
  },
} satisfies Theme
