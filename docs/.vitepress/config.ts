/**
 * VitePress 站点核心配置
 * @author Ateng
 * @since 2026-09-25
 */

import { defineConfig } from 'vitepress'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  title: 'VitePress Pro Max',
  description: '基于 VitePress 的现代化全能型技术文档、知识库与技术博客矩阵模板',
  lang: 'zh-CN',

  head: [
    ['meta', { name: 'theme-color', content: '#6366f1' }],
    ['link', { rel: 'icon', href: '/logo.svg' }],
  ],

  themeConfig: {
    siteTitle: 'VitePress Pro Max',

    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/what-is-pro-max' },
      { text: '组件', link: '/components/overview' },
      { text: '博客', link: '/blog/' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '基础指引',
          items: [
            { text: '什么是 Pro Max', link: '/guide/what-is-pro-max' },
            { text: '快速上手', link: '/guide/getting-started' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],

    footer: {
      message: '基于 MIT 协议开源发布',
      copyright: 'Copyright © 2026-present VitePress Pro Max',
    },
  },

  vite: {
    plugins: [
      UnoCSS(),
    ],
  },
})
