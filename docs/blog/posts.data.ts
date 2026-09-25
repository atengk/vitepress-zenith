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
}

declare const data: Post[]
export { data }

export default createContentLoader('blog/posts/*.md', {
  excerpt: true,
  transform(raw): Post[] {
    return raw
      .filter((item) => !item.frontmatter?.hidden)
      .map(({ url, frontmatter, excerpt }) => {
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
        }
      })
      .sort((a, b) => b.date.time - a.date.time)
  },
})
