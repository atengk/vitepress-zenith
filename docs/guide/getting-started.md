---
title: 快速上手
order: 2
---

# 快速上手

欢迎体验 VitePress Zenith。本项目基于 `pnpm` 包管理工具构建。

## 环境准备

- **Node.js**：`>= 18.0.0`（推荐 LTS 版本，如 v20+ 或 v22+）
- **包管理工具**：推荐使用 `pnpm`

## 安装与启动

在项目根目录下执行以下命令即可启动本地开发服务器。下方选项卡支持全站跨页面偏好联动：

### 1. 安装项目依赖

<PackageManagerTabs />

### 2. 启动本地开发服务（热更新）

<PackageManagerTabs command="run" script="docs:dev" />

### 3. 构建生产级静态站点（SSG）

<PackageManagerTabs command="run" script="docs:build" />

### 4. 本地预览生产构建产物

<PackageManagerTabs command="run" script="docs:preview" />
