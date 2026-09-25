# VitePress Zenith 模板工程

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

**沉浸式阅读模式 (Immersive Reading Mode)**:
一键隐藏左侧边栏导航与右侧目录大纲（TOC Aside）、聚焦正文黄金阅读区域的专注阅读视图（Zen Mode），支持快捷键交互与用户偏好持久化。
_Avoid_: 全屏模式, 打印预览

**解耦对称转场 (Decoupled Symmetrical Transition)**:
在沉浸式阅读模式切换时，左侧边栏与右侧目录分别向外侧硬件加速平移隐退、导航栏维持结构稳定且正文避免逐帧折行抖动的分层动画范式。
_Avoid_: 暴力全局过度(transition: all), 文字折行回流震颤, 顶部元素横向乱窜

**原子化图标体系 (Atomic Icon System)**:
基于 UnoCSS 与 Iconify 规范实现的纯 CSS 按需图标渲染方案，支持在 Markdown 与 Vue 组件中直接通过语义化类名调用海量现代图标。
_Avoid_: 字体图标, SVG精灵图

**交互短代码组件 (Interactive Shortcodes)**:
全局免导入（Auto-registered）直接在 Markdown 中调用的交互式 Vue 组件集（卡片网格、时间轴、实时运行沙箱等）。
_Avoid_: 嵌入式Iframe, 第三方重量级UI

**类型悬浮诊断 (Type Hover & Diagnostics / Twoslash)**:
在文档代码块中基于 TypeScript 编译器运行期实现的实时类型悬浮查看、类型提示与静态诊断标注机制。
_Avoid_: 静态代码截图, 普通代码高亮

**包管理器联动记忆 (Synchronized Package Manager Tabs)**:
将不同包管理器（npm/pnpm/yarn/bun）命令整合为选项卡，并在全站范围及本地存储中跨页面全局同步用户所选偏好。
_Avoid_: 多行冗余命令, 独立隔离选项卡

**思维导图渲染 (Mindmap Rendering / Markmap)**:
在 Markdown 中通过标准层级无序列表直接编译并动态交互展示的矢量思维导图视图。
_Avoid_: 静态图片导入, 外部嵌入外链

**交互命令中心 (Command Palette)**:
类似 Raycast 的全局浮层快捷动作与检索面板，集成页面跳转、功能模式切换与快捷键触发。
_Avoid_: 裸搜索框, 传统下拉框
