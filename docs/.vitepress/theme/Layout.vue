<!--
 * 全局自定义布局封装（挂载通知横幅、进度条、元数据、反馈组件与沉浸式阅读组件）
 * @author Ateng
 * @since 2026-09-25
-->

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import ReadingProgressBar from './components/ReadingProgressBar.vue'
import ZenModeToggle from './components/ZenModeToggle.vue'
import DocMeta from './components/DocMeta.vue'
import VpBanner from './components/VpBanner.vue'
import VpLegacyBanner from './components/VpLegacyBanner.vue'
import VpHelpful from './components/VpHelpful.vue'
import VpCommandPalette from './components/VpCommandPalette.vue'
import VpComments from './components/VpComments.vue'
import VpThemePicker from './components/VpThemePicker.vue'
import VpLinkPreview from './components/VpLinkPreview.vue'
import VpPwaStatus from './components/VpPwaStatus.vue'
import VpShortcutsModal from './components/VpShortcutsModal.vue'
import { useMediumZoom } from './composables/useMediumZoom'
import { useCodeFolding } from './composables/useCodeFolding'
import { useThemePalette } from './composables/useThemePalette'
import { useKeyboardShortcuts } from './composables/useKeyboardShortcuts'

const { Layout } = DefaultTheme

// 挂载正文图片平滑缩放灯箱
useMediumZoom()
// 挂载超长代码块智能折叠
useCodeFolding()
// 初始化主题强调色盘
useThemePalette()
// 挂载全键盘极客导航监听器
const { attachKeyboardShortcuts } = useKeyboardShortcuts()
attachKeyboardShortcuts()
</script>

<template>
  <Layout>
    <template #nav-bar-content-after>
      <VpThemePicker />
    </template>

    <template #nav-screen-content-after>
      <VpThemePicker />
    </template>

    <template #layout-top>
      <VpBanner />
      <ReadingProgressBar />
    </template>

    <template #doc-before>
      <VpLegacyBanner />
      <DocMeta />
    </template>

    <template #doc-footer-before>
      <VpHelpful />
    </template>

    <template #doc-after>
      <VpComments />
    </template>

    <template #layout-bottom>
      <ZenModeToggle />
      <VpCommandPalette />
      <VpLinkPreview />
      <VpPwaStatus />
      <VpShortcutsModal />
    </template>

  </Layout>
</template>
