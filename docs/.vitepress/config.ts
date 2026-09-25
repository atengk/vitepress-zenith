/**
 * VitePress 站点核心配置
 * @author Ateng
 * @since 2026-09-25
 */

import { defineConfig } from 'vitepress'
import UnoCSS from 'unocss/vite'
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'

export default defineConfig({
  title: 'VitePress Zenith',
  description: '基于 VitePress 的现代化全能型技术文档、知识库与技术博客矩阵模板',
  lang: 'zh-CN',

  markdown: {
    lineNumbers: true,
    codeTransformers: [
      transformerTwoslash(),
    ],
  },

  head: [
    ['meta', { name: 'theme-color', content: '#6366f1' }],
    ['link', { rel: 'icon', href: '/logo.svg' }],
  ],

  themeConfig: {
    siteTitle: 'VitePress Zenith',

    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/what-is-zenith' },
      { text: '组件', link: '/components/overview' },
      { text: '博客', link: '/blog/' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '基础指引',
          items: [
            { text: '什么是 Zenith', link: '/guide/what-is-zenith' },
            { text: '快速上手', link: '/guide/getting-started' },
            { text: '代码块与 Twoslash', link: '/guide/code-enhancements' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],

    footer: {
      message: '基于 MIT 协议开源发布',
      copyright: 'Copyright © 2026-present VitePress Zenith',
    },
  },

  vite: {
    plugins: [
      UnoCSS(),
    ],
  },
})
