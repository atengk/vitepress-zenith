---
title: 代码块与 Twoslash
order: 4
---

# 代码块与 Twoslash 动态类型增强

VitePress Zenith 深度整合了 **Shiki Twoslash** 与现代代码块增强体系，将 VS Code 级别的类型悬浮、静态诊断与语法高亮无缝搬移至网页文档中。

## 1. Twoslash 动态类型悬浮 (Hover Types)

将鼠标悬浮在下方代码块中的变量、属性或方法上，即可实时查看其完整的 TypeScript 类型推导与类型定义：

```ts twoslash
export interface ZenithConfig {
  /** 站点标题 */
  title: string
  /** 是否启用沉浸式专注模式 */
  zenMode?: boolean
  /** 默认主题颜色 */
  themeColor: 'indigo' | 'emerald' | 'violet'
}

const config: ZenithConfig = {
  title: 'VitePress Zenith',
  themeColor: 'indigo',
}

const siteTitle = config.title
//    ^?
```

## 2. 编译期错误波浪线诊断 (Error Diagnostics)

使用 `// @errors` 注解，文档可精准呈现预期类型错误，用于说明 API 的约束与反模式：

```ts twoslash
// @errors: 2322
interface ServerConfig {
  port: number
  host: string
}

// 此处将呈现红色错误波浪线：
const server: ServerConfig = {
  port: "8080",
  host: "localhost",
}
```

## 3. 代码行聚焦 (Focus)

通过在代码行末追加 `// [!code focus]`，突出展示最关键的逻辑行，弱化其他无关背景代码：

```ts
import { ref } from 'vue'

export function useCounter() {
  const count = ref(0)
  
  function increment() {
    count.value += 1 // [!code focus]
  }

  return { count, increment }
}
```

## 4. 差异对比标注 (Diff)

在版本升级或重构指南中，使用 `// [!code ++]` 与 `// [!code --]` 呈现直观的增删对比：

```ts
// 传统繁琐配置方式 // [!code --]
// const app = new LegacyApp({ debug: true }) // [!code --]

// 现代化链式开箱即用 // [!code ++]
const app = createZenithApp({ themeColor: 'indigo' }) // [!code ++]
```

## 5. 错误与警告行高亮 (Warning & Error Level)

```ts
console.log('系统初始化正常')
console.warn('警告：检测到使用了废弃的 API') // [!code warning]
console.error('致命错误：数据库连接超时') // [!code error]
```
