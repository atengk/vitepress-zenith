---
title: 无缝跨端体验：全站包管理器联动组件的设计与状态同步
date: 2026-09-23
author: Ateng
tags:
  - 组件封装
  - Vue3
description: 基于 Vue3 Composables 与 localStorage 跨标签页同步技术，实现全站统一的包管理器视图切换。
---

# 无缝跨端体验：全站包管理器联动组件的设计与状态同步

在各类框架与开源库的技术文档中，安装指引通常需要兼顾 `pnpm`、`npm`、`yarn` 与 `bun` 四大主流工具。

如果读者在“快速上手”章节选择了 `pnpm`，跳至“进阶插件”章节又必须重新选择，这构成了割裂的阅读阻滞。

## 联动架构核心

VitePress Zenith 封装了 `<PackageManagerTabs>` 组件与 `usePackageManager` 响应式钩子：

1. **单向状态派发**：全局单例响应式 `currentPm` 驱动所有挂载的选项卡实例；
2. **本地长效持久化**：将选择项写入 `localStorage['vp-zenith-package-manager']`；
3. **跨多浏览器标签页联动**：监听 `window.addEventListener('storage')` 事件，多标签页协同实时响应。

无论页面深度如何跳转，读者的包管理器偏好始终保持一致。
