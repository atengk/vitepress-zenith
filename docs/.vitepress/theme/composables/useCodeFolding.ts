/**
 * 超长代码块（>25行）自适应半透明折叠与展开 Composable
 * @author Ateng
 * @since 2026-09-25
 */

import { onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'

const DEFAULT_FOLD_THRESHOLD = 25

/**
 * 挂载超长代码块折叠功能 Hook
 * @param threshold 触发折叠的最小行数（默认 25 行）
 */
export function useCodeFolding(threshold = DEFAULT_FOLD_THRESHOLD) {
  const route = useRoute()
  let observer: MutationObserver | null = null

  /**
   * 扫描并初始化页面内所有超长代码块
   */
  const scanAndInitCodeBlocks = () => {
    if (typeof window === 'undefined') return

    const codeBlocks = document.querySelectorAll<HTMLElement>('.vp-doc div[class*="language-"]')
    codeBlocks.forEach((block) => {
      // 避免重复包装
      if (block.dataset.foldingInit === 'true') return

      // 1. 统计当前代码块总行数
      const lineNumbers = block.querySelectorAll('.line-numbers-wrapper .line-number')
      const codeElement = block.querySelector('pre > code')
      const textLines = (codeElement?.textContent || '').trim().split('\n').length
      const codeLines = block.querySelectorAll('pre > code .line').length

      const lineCount = Math.max(lineNumbers.length, codeLines, textLines)

      // 2. 未达到折叠阈值则跳过
      if (lineCount <= threshold) return

      // 3. 标记并应用折叠状态
      block.dataset.foldingInit = 'true'
      block.classList.add('has-code-folding', 'is-collapsed')

      // 4. 构建遮罩与操作胶囊按钮
      const trigger = document.createElement('div')
      trigger.className = 'code-fold-trigger'

      const gradient = document.createElement('div')
      gradient.className = 'code-fold-gradient'
      trigger.appendChild(gradient)

      const btn = document.createElement('button')
      btn.type = 'button'
      btn.className = 'code-fold-btn'
      btn.setAttribute('aria-expanded', 'false')

      const icon = document.createElement('span')
      icon.className = 'fold-btn-icon i-lucide-chevron-down'
      btn.appendChild(icon)

      const text = document.createElement('span')
      text.className = 'fold-btn-text'
      text.textContent = `展开全部代码 (共 ${lineCount} 行)`
      btn.appendChild(text)

      // 5. 绑定展开与收起交互事件
      btn.addEventListener('click', (e) => {
        e.stopPropagation()
        const isCollapsed = block.classList.contains('is-collapsed')

        if (isCollapsed) {
          // 展开代码块
          block.classList.remove('is-collapsed')
          block.classList.add('is-expanded')
          btn.setAttribute('aria-expanded', 'true')
          text.textContent = '收起代码'
          icon.className = 'fold-btn-icon i-lucide-chevron-up'
        } else {
          // 收起代码块
          block.classList.remove('is-expanded')
          block.classList.add('is-collapsed')
          btn.setAttribute('aria-expanded', 'false')
          text.textContent = `展开全部代码 (共 ${lineCount} 行)`
          icon.className = 'fold-btn-icon i-lucide-chevron-down'

          // 若代码块顶部已滚出视口上方，平滑回滚至代码块顶端
          const rect = block.getBoundingClientRect()
          if (rect.top < 64) {
            block.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }
      })

      trigger.appendChild(btn)
      block.appendChild(trigger)
    })
  }

  onMounted(() => {
    nextTick(() => {
      scanAndInitCodeBlocks()

      // 观察异步或动态渲染的 DOM 变化
      const docEl = document.querySelector('.vp-doc')
      if (docEl && typeof MutationObserver !== 'undefined') {
        observer = new MutationObserver(() => {
          scanAndInitCodeBlocks()
        })
        observer.observe(docEl, { childList: true, subtree: true })
      }
    })
  })

  watch(
    () => route.path,
    () => {
      nextTick(() => {
        scanAndInitCodeBlocks()
      })
    }
  )

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  })
}
