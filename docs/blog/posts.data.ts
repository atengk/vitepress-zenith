/**
 * 博客文章元数据提取与编译期聚合 Loader
 * @author Ateng
 * @since 2026-09-25
 */

import { createContentLoader } from 'vitepress'

export interface Post {
  title: string
  url: string
  date: {
    raw: string
    time: number
    formatted: string
  }
  excerpt?: string
  tags: string[]
  author: string
  words: number
  readingTime: number
}

declare const data: Post[]
export { data }

export default createContentLoader('blog/posts/*.md', {
  excerpt: true,
  includeSrc: true,
  transform(raw): Post[] {
    return raw
      .filter((item) => !item.frontmatter?.hidden)
      .map(({ url, frontmatter, excerpt, src }) => {
        const rawDate = frontmatter.date || new Date().toISOString()
        const parsedDate = new Date(rawDate)
        const time = isNaN(parsedDate.getTime()) ? 0 : parsedDate.getTime()
        const y = parsedDate.getFullYear()
        const m = String(parsedDate.getMonth() + 1).padStart(2, '0')
        const d = String(parsedDate.getDate()).padStart(2, '0')

        const tags: string[] = Array.isArray(frontmatter.tags)
          ? frontmatter.tags
          : typeof frontmatter.tags === 'string'
            ? [frontmatter.tags]
            : []

        // 剔除 Frontmatter 后的纯正文内容
        const cleanContent = (src || '').replace(/^---[\s\S]*?---/, '')
        const cnMatches = cleanContent.match(/[\u4e00-\u9fa5]/g) || []
        const enMatches = cleanContent.replace(/[\u4e00-\u9fa5]/g, ' ').match(/[a-zA-Z0-9_\-]+/g) || []
        const words = cnMatches.length + enMatches.length
        const readingTime = Math.max(1, Math.ceil(words / 350))

        return {
          title: frontmatter.title || '无标题文章',
          url,
          excerpt: frontmatter.description || excerpt || '',
          date: {
            raw: String(rawDate),
            time,
            formatted: `${y}-${m}-${d}`,
          },
          tags,
          author: frontmatter.author || 'Ateng',
          words,
          readingTime,
        }
      })
      .sort((a, b) => b.date.time - a.date.time)
  },
})
