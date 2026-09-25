---
title: 包管理器联动选项卡
order: 3
---

# 包管理器联动选项卡 (PackageManagerTabs)

在技术文档与安装指引中，读者往往有着各自偏好的包管理器（如 `pnpm`、`npm`、`yarn` 或 `bun`）。

VitePress Zenith 内置了全局免导入的 `<PackageManagerTabs>` 短代码组件：
- **全站跨页面实时联动**：读者在站内任意页面的任一选项卡切换包管理器，全站所有选项卡自动同步切换；
- **本地存储持久化**：用户选择自动记录在浏览器 `localStorage` 中，刷新或二次访问依然保持用户偏好；
- **跨标签页广播同步**：在同一浏览器多标签页之间实时响应存储变更，保持体验一致；
- **一键复制与微交互**：内置一键复制到剪贴板功能，附带丝滑的成功状态动画与防误触防抖。

---

## 交互效果演示

### 1. 基础全量依赖安装

当未提供包名参数时，默认输出全量安装依赖命令：

<PackageManagerTabs />

### 2. 添加生产依赖

使用 `pkg`（或 `package`）指定需要安装的包名，支持空格分隔多个依赖：

<PackageManagerTabs pkg="vue @vitejs/plugin-vue" />

```html
<PackageManagerTabs pkg="vue @vitejs/plugin-vue" />
```

### 3. 安装开发依赖 (`dev`)

添加 `dev` 布尔属性，自动适配各包管理器的开发依赖标志（`pnpm add -D` / `npm install -D` / `yarn add -D` / `bun add -d`）：

<PackageManagerTabs pkg="typescript @types/node unocss" dev />

```html
<PackageManagerTabs pkg="typescript @types/node unocss" dev />
```

### 4. 全局工具安装 (`global`)

添加 `global` 属性，自动生成全局安装指令（`pnpm add -g` / `npm install -g` / `yarn global add` / `bun add -g`）：

<PackageManagerTabs pkg="create-vite" global />

```html
<PackageManagerTabs pkg="create-vite" global />
```

### 5. 项目脚手架初始化 (`command="create"`)

配置 `command="create"` 快速生成项目初始化命令：

<PackageManagerTabs command="create" pkg="vite@latest my-app --template vue-ts" />

```html
<PackageManagerTabs command="create" pkg="vite@latest my-app --template vue-ts" />
```

### 6. 运行脚本 (`command="run"`)

配置 `command="run"` 并传入 `script` 参数：

<PackageManagerTabs command="run" script="docs:dev" />

```html
<PackageManagerTabs command="run" script="docs:dev" />
```

### 7. 单次远程执行 (`command="dlx"` 或 `command="exec"`)

自动映射为 `pnpm dlx` / `npx` / `yarn dlx` / `bunx`：

<PackageManagerTabs command="dlx" cmd="degit vuejs/vitepress my-docs" />

```html
<PackageManagerTabs command="dlx" cmd="degit vuejs/vitepress my-docs" />
```

### 8. 独立管理器命令完全覆盖

若某一命令在不同包管理器之间存在非标差异，可直接通过 `pnpm`、`npm`、`yarn`、`bun` 属性单独定制：

<PackageManagerTabs
  pnpm="pnpm add -D unocss @unocss/preset-uno"
  npm="npm install --save-dev unocss @unocss/preset-uno"
  yarn="yarn add --dev unocss @unocss/preset-uno"
  bun="bun add -d unocss @unocss/preset-uno"
/>

```html
<PackageManagerTabs
  pnpm="pnpm add -D unocss @unocss/preset-uno"
  npm="npm install --save-dev unocss @unocss/preset-uno"
  yarn="yarn add --dev unocss @unocss/preset-uno"
  bun="bun add -d unocss @unocss/preset-uno"
/>
```

---

## 组件属性参考 (API)

| 属性名 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `pkg` / `package` | `string` | `''` | 需要安装或操作的包名，支持空格分隔多个依赖 |
| `command` | `'install' \| 'add' \| 'create' \| 'run' \| 'exec' \| 'dlx'` | `'install'` | 命令行为类型 |
| `dev` | `boolean` | `false` | 是否为开发依赖（自动追加 `-D` / `-d`） |
| `global` | `boolean` | `false` | 是否为全局安装命令（自动追加 `-g` 或 `global add`） |
| `script` | `string` | `''` | 脚本名称（用于 `command="run"`） |
| `cmd` | `string` | `''` | 远程执行命令名称（用于 `command="dlx"`） |
| `args` | `string` | `''` | 追加在命令行末尾的额外自定义参数 |
| `pnpm` | `string` | - | 覆盖 `pnpm` 选项卡的自定义命令行 |
| `npm` | `string` | - | 覆盖 `npm` 选项卡的自定义命令行 |
| `yarn` | `string` | - | 覆盖 `yarn` 选项卡的自定义命令行 |
| `bun` | `string` | - | 覆盖 `bun` 选项卡的自定义命令行 |

> [!TIP] 全局别名
> 除了 `<PackageManagerTabs>` 外，您也可以使用简短别名 `<PackageTabs>`。
