<!--
 * Mermaid 矢量架构与时序图渲染组件
 * @author Ateng
 * @since 2026-09-25
-->

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useData } from 'vitepress'

const props = defineProps<{
  id?: string
  code: string
}>()

const { isDark } = useData()
const containerRef = ref<HTMLElement | null>(null)
const svgContent = ref('')
const errorMsg = ref('')
const isLoading = ref(true)

const decodedCode = computed(() => {
  try {
    return decodeURIComponent(props.code)
  } catch {
    return props.code
  }
})

/**
 * 执行 Mermaid 图表动态解析与渲染
 */
const renderDiagram = async () => {
  if (typeof window === 'undefined') return
  isLoading.value = true
  errorMsg.value = ''

  try {
    const mermaid = (await import('mermaid')).default
    const uniqueId = (props.id || 'mermaid').replace(/[^a-zA-Z0-9_-]/g, '') + '-' + Math.random().toString(36).slice(2, 8)

    mermaid.initialize({
      startOnLoad: false,
      theme: isDark.value ? 'dark' : 'default',
      securityLevel: 'loose',
      fontFamily: 'var(--vp-font-family-base)',
      themeVariables: isDark.value
        ? {
            darkMode: true,
            background: '#1a1a1a',
            primaryColor: '#6366f1',
            primaryTextColor: '#f8fafc',
            primaryBorderColor: '#4f46e5',
            lineColor: '#94a3b8',
            secondaryColor: '#3b82f6',
            tertiaryColor: '#1e293b',
          }
        : {
            darkMode: false,
            primaryColor: '#e0e7ff',
            primaryTextColor: '#1e293b',
            primaryBorderColor: '#6366f1',
            lineColor: '#64748b',
          },
    })

    const { svg } = await mermaid.render(uniqueId, decodedCode.value)
    svgContent.value = svg
  } catch (err: any) {
    errorMsg.value = err?.message || 'Mermaid 图表解析失败'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  renderDiagram()
})

watch(() => isDark.value, () => {
  renderDiagram()
})

watch(() => decodedCode.value, () => {
  renderDiagram()
})
</script>

<template>
  <div class="mermaid-wrapper" ref="containerRef">
    <div v-if="isLoading && !svgContent" class="mermaid-loading">
      <span class="loading-spinner"></span>
      <span>正在渲染架构图表...</span>
    </div>
    <div v-else-if="errorMsg" class="mermaid-error">
      <div class="error-title">Mermaid 语法解析异常</div>
      <pre>{{ errorMsg }}</pre>
    </div>
    <div v-else class="mermaid-svg-container" v-html="svgContent"></div>
  </div>
</template>

<style scoped>
.mermaid-wrapper {
  margin: 20px 0;
  padding: 16px;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow-x: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 120px;
  transition: background-color 0.25s, border-color 0.25s;
}

.mermaid-svg-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

:deep(.mermaid-svg-container svg) {
  max-width: 100%;
  height: auto;
}

.mermaid-loading {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid var(--vp-c-divider);
  border-top-color: var(--vp-c-brand-1);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.mermaid-error {
  padding: 12px 16px;
  background-color: var(--vp-c-danger-soft);
  border-left: 4px solid var(--vp-c-danger-1);
  border-radius: 4px;
  color: var(--vp-c-danger-1);
  font-size: 13px;
  width: 100%;
}

.error-title {
  font-weight: 600;
  margin-bottom: 4px;
}

.mermaid-error pre {
  margin: 0;
  white-space: pre-wrap;
  font-family: var(--vp-font-family-mono);
}
</style>
