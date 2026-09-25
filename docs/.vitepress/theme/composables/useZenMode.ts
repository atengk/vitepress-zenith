/**
 * 沉浸式阅读模式 (Zen Mode) 状态管理与交互 Composable
 * @author Ateng
 * @since 2026-09-25
 */

import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vitepress'

const STORAGE_KEY = 'vp-zenith-zen-mode'
const isZenMode = ref(false)

/**
 * 沉浸式阅读管理 Hook
 */
export function useZenMode() {
  const route = useRoute()

  /**
   * 应用或移除根节点类名与持久化
   * @param value 是否开启沉浸模式
   */
  const applyZenMode = (value: boolean) => {
    isZenMode.value = value
    if (typeof window === 'undefined') return

    const htmlEl = document.documentElement
    if (value) {
      htmlEl.classList.add('zen-mode')
      localStorage.setItem(STORAGE_KEY, 'true')
    } else {
      htmlEl.classList.remove('zen-mode')
      localStorage.setItem(STORAGE_KEY, 'false')
    }
  }

  /**
   * 切换沉浸模式状态
   */
  const toggleZenMode = () => {
    applyZenMode(!isZenMode.value)
  }

  /**
   * 键盘快捷键监听处理函数 (Alt + Z 或 Escape 退出)
   */
  const handleKeydown = (event: KeyboardEvent) => {
    // 忽略输入框与富文本中的按键
    const target = event.target as HTMLElement | null
    if (target && ['INPUT', 'TEXTAREA'].includes(target.tagName)) return

    if (event.altKey && (event.key === 'z' || event.key === 'Z')) {
      event.preventDefault()
      toggleZenMode()
    } else if (event.key === 'Escape' && isZenMode.value) {
      event.preventDefault()
      applyZenMode(false)
    }
  }

  onMounted(() => {
    if (typeof window === 'undefined') return

    // 1. 从本地存储读取用户历史偏好
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'true' && route.path !== '/') {
      applyZenMode(true)
    }

    // 2. 绑定全局快捷键监听
    window.addEventListener('keydown', handleKeydown)
  })

  onUnmounted(() => {
    if (typeof window === 'undefined') return
    window.removeEventListener('keydown', handleKeydown)
  })

  // 监听路由变化：若跳转到首页，自动临时抑制沉浸样式；回到文档页恢复
  watch(
    () => route.path,
    (newPath) => {
      if (typeof window === 'undefined') return
      if (newPath === '/') {
        document.documentElement.classList.remove('zen-mode')
      } else if (isZenMode.value) {
        document.documentElement.classList.add('zen-mode')
      }
    }
  )

  return {
    isZenMode,
    toggleZenMode,
    applyZenMode,
  }
}
