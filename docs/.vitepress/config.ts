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

    // 页面底部翻页中文配置
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    // 右侧大纲导航中文配置
    outline: {
      level: [2, 3],
      label: '本页大纲',
    },

    // 最后更新时间中文配置
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
    },

    // 界面通用控制文案中文配置
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '目录菜单',
    darkModeSwitchLabel: '深浅主题',
    lightModeSwitchTitle: '切换为浅色模式',
    darkModeSwitchTitle: '切换为深色模式',
    skipToContentLabel: '跳转至正文',
    langMenuLabel: '切换语言',

    // 本地全文检索全套中文汉化
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档',
              },
              modal: {
                displayDetails: '显示详细列表',
                resetButtonTitle: '重置搜索',
                backButtonTitle: '关闭搜索',
                noResultsText: '无法找到相关结果',
                footer: {
                  selectText: '选择',
                  selectKeyAriaLabel: '回车键',
                  navigateText: '切换',
                  navigateUpKeyAriaLabel: '向上箭头',
                  navigateDownKeyAriaLabel: '向下箭头',
                  closeText: '关闭',
                  closeKeyAriaLabel: '退出键',
                },
              },
            },
          },
        },
      },
    },

    // 404 缺省页中文配置
    notFound: {
      title: '页面不存在',
      quote: '抱歉，您访问的页面已漂移到星际深处或已被移除。',
      linkLabel: '返回首页',
      linkText: '返回首页',
    },

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
