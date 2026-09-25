<!--
 * 文章元数据展示组件（字数统计、预计阅读耗时与专注阅读快捷入口）
 * @author Ateng
 * @since 2026-09-25
-->

<script setup lang="ts">
import { ref, onMounted, watch, nextTick, computed } from 'vue'
import { useRoute } from 'vitepress'
import { useZenMode } from '../composables/useZenMode'

const route = useRoute()
const { isZenMode, toggleZenMode } = useZenMode()

const wordCount = ref(0)
const readingTime = ref(1)

const isVisible = computed(() => route.path !== '/' && wordCount.value > 0)

/**
 * 统计正文字数并估算阅读时长（以 350 字/分钟为基准）
 */
const calculateDocStats = () => {
  if (typeof window === 'undefined') return

  const docEl = document.querySelector('.vp-doc')
  if (!docEl) {
    wordCount.value = 0
    readingTime.value = 1
    return
  }

  const text = docEl.textContent || ''
  // 匹配中文字符数
  const cnMatches = text.match(/[\u4e00-\u9fa5]/g) || []
  // 匹配西文字词数
  const enMatches = text.replace(/[\u4e00-\u9fa5]/g, ' ').match(/[a-zA-Z0-9_\-]+/g) || []

  const total = cnMatches.length + enMatches.length
  wordCount.value = total
  readingTime.value = Math.max(1, Math.ceil(total / 350))
}

onMounted(() => {
  nextTick(calculateDocStats)
})

watch(
  () => route.path,
  () => {
    nextTick(calculateDocStats)
  }
)
</script>

<template>
  <div v-if="isVisible" class="doc-meta-bar">
    <div class="meta-item">
      <span class="icon">📝</span>
      <span>约 {{ wordCount.toLocaleString() }} 字</span>
    </div>
    <div class="meta-divider">·</div>
    <div class="meta-item">
      <span class="icon">⏱️</span>
      <span>预计 {{ readingTime }} 分钟</span>
    </div>
    <div class="meta-divider">·</div>
    <button
      type="button"
      class="zen-quick-btn"
      :class="{ active: isZenMode }"
      title="一键切换沉浸专注阅读 (Alt+Z)"
      @click="toggleZenMode"
    >
      <span class="icon">🎯</span>
      <span>{{ isZenMode ? '退出专注' : '沉浸阅读' }}</span>
    </button>
  </div>
</template>

<style scoped>
.doc-meta-bar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin: 16px 0 24px;
  padding: 8px 14px;
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.meta-divider {
  color: var(--vp-c-text-3);
}

.zen-quick-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
  padding: 2px 8px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.zen-quick-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.zen-quick-btn.active {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  font-weight: 500;
}
</style>
