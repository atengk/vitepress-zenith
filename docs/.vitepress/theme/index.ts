/**
 * VitePress 默认主题扩展入口
 * @author Ateng
 * @since 2026-09-25
 */

import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import 'virtual:uno.css'
import './styles/vars.css'
import './styles/custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    // 基础扩展入口，后续工单将在此处注入短代码组件与全局交互
  },
} satisfies Theme
