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

## 6. 超长代码块自适应智能折叠 (Collapsible Code Blocks)

对于超过 25 行的深度架构代码或大型配置文件，Zenith 会自动应用**底部渐变半透明过渡遮罩**与**展开/收起控件**，避免长篇代码过度霸占视口：

```ts twoslash
/**
 * 旗舰级文档站点全量配置范例
 * 演示超过 25 行代码块的自动渐变折叠与交互展开
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

- **视觉保护**：折叠状态下限制最大高度为 480px，底部带有平滑的半透明渐变蒙层；
- **状态感知**：按钮显示代码总行数（如 `展开全部代码 (共 49 行)`），点击平滑展开；
- **回滚防跳**：点击“收起代码”时，若代码块顶端已滚出视口，系统自动平滑滚回代码顶部；
- **生态无损**：右上角一键复制代码按钮以及 Twoslash 悬浮提示在折叠状态下依然 100% 正常可用。

