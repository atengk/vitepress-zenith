# VitePress Pro Max 模板工程

基于 VitePress 构建的现代化全能型技术文档、知识库与技术博客矩阵模板。

## 统一领域语言 (Language)

**全能技术矩阵 (Technical Matrix)**:
包含现代化落地页 (Landing Page)、多模块分层技术文档 (Technical Docs) 与团队演进动态/博客 (Technical Blog) 的一体化内容架构。
_Avoid_: 纯静态博客, 纯API文档

**默认主题扩展 (Extended Default Theme)**:
在 VitePress 官方默认主题基础上，通过 Vue 布局插槽 (Layout Slots)、全局组件注册与 UnoCSS 原子化原子层进行功能与视觉增强的扩展模式。
_Avoid_: 裸写主题, 官方主题覆写, 第三方封闭主题

**离线全文检索 (Offline Full-Text Search)**:
在构建与运行期由浏览器本地加载分词索引进行检索的机制，开箱支持中文分词，且不依赖任何外部云端鉴权服务。
_Avoid_: Algolia搜索, 外部服务端检索

**自动目录路由 (Automated Directory Routing)**:
根据文件系统物理目录结构与文档 Frontmatter 元数据，自动派生侧边栏层级与导航关系的自动化机制。
_Avoid_: 硬编码路由, 手动侧边栏配置
