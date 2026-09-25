<!--
 * 全局自定义布局封装（挂载进度条、元数据与沉浸式阅读组件）
 * @author Ateng
 * @since 2026-09-25
-->

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import ReadingProgressBar from './components/ReadingProgressBar.vue'
import ZenModeToggle from './components/ZenModeToggle.vue'
import DocMeta from './components/DocMeta.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #layout-top>
      <ReadingProgressBar />
    </template>

    <template #doc-before>
      <DocMeta />
    </template>

    <template #layout-bottom>
      <ZenModeToggle />
    </template>
  </Layout>
</template>
