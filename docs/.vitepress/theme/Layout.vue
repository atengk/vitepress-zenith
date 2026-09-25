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
import VpHelpful from './components/VpHelpful.vue'
import VpCommandPalette from './components/VpCommandPalette.vue'
import { useMediumZoom } from './composables/useMediumZoom'
import { useCodeFolding } from './composables/useCodeFolding'

const { Layout } = DefaultTheme

// 挂载正文图片平滑缩放灯箱
useMediumZoom()
// 挂载超长代码块智能折叠
useCodeFolding()
</script>

<template>
  <Layout>
    <template #layout-top>
      <VpBanner />
      <ReadingProgressBar />
    </template>

    <template #doc-before>
      <DocMeta />
    </template>

    <template #doc-footer-before>
      <VpHelpful />
    </template>

    <template #layout-bottom>
      <ZenModeToggle />
      <VpCommandPalette />
    </template>
  </Layout>
</template>
