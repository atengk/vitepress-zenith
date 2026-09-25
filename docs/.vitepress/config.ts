/**
 * VitePress 站点核心配置
 * @author Ateng
 * @since 2026-09-25
 */

import { defineConfig } from 'vitepress'
import UnoCSS from 'unocss/vite'
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import { getAutoSidebar } from './utils/sidebar'

export default defineConfig({
  title: 'VitePress Zenith',
  description: '基于 VitePress 的现代化全能型技术文档、知识库与技术博客矩阵模板',
  lang: 'zh-CN',
  base: process.env.BASE_PATH || (process.env.CI ? '/vitepress-zenith/' : '/'),

  markdown: {
    math: true,
    lineNumbers: true,
    codeTransformers: [
      transformerTwoslash(),
    ],
    config(md) {
      const defaultFence = md.renderer.rules.fence!
      md.renderer.rules.fence = (tokens, idx, options, env, self) => {
        const token = tokens[idx]
        const lang = token.info.trim().split(/\s+/)[0]
        if (lang === 'mermaid') {
          const key = `mermaid-${idx}`
          const code = encodeURIComponent(token.content)
          return `<Mermaid id="${key}" code="${code}" />\n`
        }
        if (lang === 'markmap') {
          const key = `markmap-${idx}`
          const code = encodeURIComponent(token.content)
          return `<Markmap id="${key}" code="${code}" />\n`
        }
        const rendered = defaultFence(tokens, idx, options, env, self)

        // 修复 VitePress 内置 lineNumberPlugin 在结合 Twoslash 时因误用 rawCode.indexOf("</code>") 导致行号在第一个悬浮弹窗处提前截断的缺陷
        const wrapperIdx = rendered.indexOf('<div class="line-numbers-wrapper"')
        if (wrapperIdx !== -1) {
          const matchStartLineNumber = token.info.match(/=(\d+)/)
          const startLineNumber = matchStartLineNumber ? parseInt(matchStartLineNumber[1], 10) : 1
          const codeBeforeWrapper = rendered.slice(0, wrapperIdx)
          // 排除 Twoslash 悬浮提示框 (<template v-slot:popper>...</template>) 内部包含的独立高亮代码行，仅统计主干代码行数
          const cleanCode = codeBeforeWrapper
            .replace(/<template\s+(?:v-slot:popper|#popper)[\s\S]*?<\/template>/g, '')
            .replace(/<span\s+class="[^"]*twoslash-floating[^"]*"[\s\S]*?<\/span>\s*<\/span>\s*<\/span>/g, '')
          const lineMatches = cleanCode.match(/class="line(?:\s+[^"]*)?"/g)
          const rawLines = token.content.replace(/\r\n/g, '\n').replace(/\n$/, '').split('\n').length
          const lineCount = lineMatches ? lineMatches.length : rawLines

          const lineNumbersCode = Array.from(
            { length: lineCount },
            (_, i) => `<span class="line-number">${i + startLineNumber}</span><br>`
          ).join('')

          return rendered.replace(
            /<div class="line-numbers-wrapper"[^>]*>[\s\S]*?<\/div>/,
            `<div class="line-numbers-wrapper" aria-hidden="true">${lineNumbersCode}</div>`
          )
        }

        return rendered
      }
    },
  },

  sitemap: {
    hostname: 'https://vitepress-zenith.pages.dev',
  },

  head: [
    ['meta', { name: 'theme-color', content: '#6366f1' }],
    ['link', { rel: 'icon', href: '/logo.svg' }],
    ['meta', { name: 'keywords', content: 'VitePress, 知识库, 技术文档, Zen Mode, Twoslash, Markmap, MathJax, 博客矩阵' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['meta', { property: 'og:title', content: 'VitePress Zenith - 顶配旗舰级技术文档与知识库模板' }],
    ['meta', { property: 'og:site_name', content: 'VitePress Zenith' }],
    ['meta', { property: 'og:description', content: '开箱即用集成沉浸式专注阅读 (Zen Mode)、Twoslash 动态类型、Markmap 思维导图、全站包管理器联动与 UnoCSS 原子图标体系' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  ],

  themeConfig: {
    siteTitle: 'VitePress Zenith',

    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/what-is-zenith' },
      { text: '组件', link: '/components/overview' },
      { text: '博客', link: '/blog/' },
    ],

    sidebar: getAutoSidebar({
      groupTitles: {
        guide: '基础指引',
        components: '交互短代码组件库',
      },
    }),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/atengk/vitepress-zenith' },
    ],

    // Giscus 评论系统配置（基于 GitHub Discussions 零运维讨论区）
    giscus: {
      enabled: true,
      repo: 'atengk/vitepress-zenith',
      repoId: 'R_kgDON7o88g',
      category: 'General',
      categoryId: 'DIC_kwDON7o88s4Cn7ab',
      mapping: 'pathname',
      strict: '0',
      reactionsEnabled: '1',
      emitMetadata: '0',
      inputPosition: 'top',
      lang: 'zh-CN',
      loading: 'lazy',
    },

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
        miniSearch: {
          options: {
            /**
             * 针对中文分词增强（支持 Intl.Segmenter 原生高精度词法切分）
             */
            tokenize(text) {
              if (typeof text !== 'string') return []
              if (typeof Intl !== 'undefined' && Intl.Segmenter) {
                const segmenter = new Intl.Segmenter('zh-CN', { granularity: 'word' })
                const tokens: string[] = []
                for (const { segment, isWordLike } of segmenter.segment(text)) {
                  const s = segment.trim()
                  if (s) tokens.push(s.toLowerCase())
                }
                return tokens
              }
              return text.toLowerCase().split(/[\s,./\\;:'"[\]{}|`~!@#$%^&*()_+\-=?<>]+/).filter(Boolean)
            },
          },
          searchOptions: {
            fuzzy: 0.2,
            prefix: true,
            boost: { title: 4, text: 2, titles: 1 },
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
