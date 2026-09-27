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

## 6. 超长代码块自适应高度约束与极客内滚动 (Max-Height & Clean Scrollbars)

对于大型配置文件、复杂类型定义或深度源码推演，Zenith 借鉴 **GitHub**、**Stripe** 与 **Tailwind CSS** 等顶级现代技术文档的优雅范式，彻底摒弃生硬的遮挡式遮罩与突兀胶囊，采用**最大舒适高度约束（560px）与极细品牌质感内滚动条**：

```ts twoslash
/**
 * 旗舰级文档站点全量配置范例
 * 演示超过 35 行代码块的自适应高度约束与极细顺畅内滚动条
 */
export interface ZenithServerConfig {
  /** 站点端口 */
  port: number
  /** 运行主机 */
  host: string
  /** 开启 HTTPS 安全协议 */
  https?: boolean
  /** 允许跨域域名 */
  corsOrigins: string[]
  /** 响应超时时长 (ms) */
  timeout: number
  /** 存储桶配置 */
  storage: {
    driver: 'local' | 's3' | 'oss'
    bucket: string
    endpoint?: string
  }
  /** 鉴权与中间件密钥 */
  security: {
    jwtSecret: string
    tokenExpiresIn: number
  }
}

// 模拟完整企业级配置定义
export const serverConfig: ZenithServerConfig = {
  port: 8080,
  host: '0.0.0.0',
  https: true,
  corsOrigins: ['https://atengk.github.io'],
  timeout: 5000,
  storage: {
    driver: 's3',
    bucket: 'zenith-docs-assets',
    endpoint: 'https://s3.ap-northeast-1.amazonaws.com',
  },
  security: {
    jwtSecret: 'super-secure-zenith-secret-key',
    tokenExpiresIn: 86400,
  },
}

// 导出系统默认服务实例
export function bootstrapServer(config: ZenithServerConfig) {
  return `Server running on https://${config.host}:${config.port}`
}
```

- **纯净阅读体验**：绝无半透明遮罩覆盖代码文字，绝无文字被拦腰截断，100% 保持技术代码的严谨与高可读性；
- **自适应高度约束**：代码块最大高度设定为 `560px`（约 35 行代码），常规篇幅代码自然完全展现，超长代码自动启用顺滑纵向滚动；
- **行号完美同步联动**：左侧行号与代码行始终保持绝对精确的纵向联动，滚动过程中丝滑对齐；
- **右上角工具粘性常驻**：右上角一键复制代码按钮与语言标识采用 `sticky` 粘性定位，滚动到深层代码时依然常驻可用。

