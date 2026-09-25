# 04 — 全站跨页面同步的包管理器选项卡

**目标行为 (What to build):**
封装全局免导入的 `<PackageManagerTabs>` 短代码组件，在 Markdown 中书写安装命令时可一键切换 `npm / pnpm / yarn / bun`；当读者在全站任何一个页面点击了某一包管理器，全站所有页面的安装命令自动联动切换为该偏好，并持久化保存在浏览器本地存储中。

**前置依赖 (Blocked by):**
01 — 工程底座与全能 Landing Page 骨架

**状态 (Status):**
closed

- [x] 开发 Vue 响应式全局共享状态存储，维护当前选中的包管理器偏好
- [x] 封装 `<PackageManagerTabs>` 组件，支持自定义包名、参数与子命令，自动生成 4 大管理器命令
- [x] 实现跨页面状态实时联动，并在 `localStorage` 中持久化用户的偏好选择
- [x] 在 `.vitepress/theme/index.ts` 中全局注册组件，保证在 Markdown 中免 import 直接使用
- [x] 提供一键复制命令微交互与视觉反馈
