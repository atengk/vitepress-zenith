---
title: 阅读认知增强与代码折叠
order: 8
---

# 阅读认知增强与超长代码块智能折叠

在架构级技术文档与深度技术博文中，长篇大论与动辄数十行的大型代码块极易造成读者的认知超载与心流中断。VitePress Zenith 引入了**阅读认知指标体系**与**自适应超长代码块智能折叠**两项核心体验增强。

---

## 1. 设计动机与认知减负

- **明确心理预期**：长文阅读前，读者若无法预估耗时，容易产生阅读疲倦感；在标题下方直观提供“正文字数”与“预计阅读时长”，能帮助读者合理规划阅读心流；
- **提升信息密度**：超过 25 行的大段代码或配置文件会强行霸占整个屏幕视口，导致上下文割裂；通过平滑的半透明渐变折叠与行数指示，保持版面的整洁与呼吸感；
- **生态体验无损**：在代码块处于折叠状态时，右上角一键复制按钮与 Shiki Twoslash 动态悬浮类型推导依然 100% 正常可用。

---

## 2. 词法切分算法与阅读时长模型

Zenith 针对中西文混合的技术文档场景，设计了精准的字数统计与时长推导模型：

### 算法规则
1. **中西文混合计数**：
   - 提取 Markdown 渲染正文文本，剔除 Frontmatter 与 HTML 标签；
   - 匹配中文字符数（`[\u4e00-\u9fa5]`）；
   - 将中文替换为空格后，对西文字词与编程标识符进行切分（`[a-zA-Z0-9_\-]+`）；
   - 总字数 = 中文字符数 + 英文词汇数。
2. **阅读速率模型**：
   - 依据中文母语者的技术文档平均阅读速率（基准约 350 字/分钟）；
   - 计算公式：`预计阅读分钟 = Math.max(1, Math.ceil(总字数 / 350))`。

### 双端落地架构
- **技术文档正文 (`DocMeta.vue`)**：动态挂载于正文主标题 `h1` 下方，采用现代 Lucide 语义图标（`i-lucide-file-text`、`i-lucide-clock`、`i-lucide-sparkles`）直观呈现，并联动沉浸式专注阅读快捷键；
- **博客矩阵列表 (`posts.data.ts`)**：在 VitePress 编译期通过 `createContentLoader` 开启 `includeSrc: true`，在构建期静态生成每篇博文的 `words` 与 `readingTime`，卡片列表秒级直出。

---

## 3. 超长代码块（>25行）智能折叠机制

当页面中的代码块总行数超过 25 行时，系统会自动应用智能渐变遮罩：

```
┌────────────────────────────────────────────────────────┐
│  import { defineComponent } from 'vue'                  │
│  export default defineComponent({                       │
│    // ... 核心逻辑前 20 行正常可读 ...                  │
│                                                        │
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ (120px 渐变遮罩)
│              [ 展开全部代码 (共 48 行) ▾ ]              │
└────────────────────────────────────────────────────────┘
```

- **视觉约束**：默认将折叠态高度限制为 `480px`，并在底部覆盖由透明平滑过渡至代码块底色的 `120px` 渐变遮罩；
- **状态感知胶囊按钮**：居中悬浮胶囊按钮，动态计算并展示代码真实行数（如 `展开全部代码 (共 42 行)`）；
- **平滑过渡与展开**：点击后解除高度限制并淡出遮罩，按钮状态切换为 `收起代码`；
- **回滚防跳保护**：当读者阅读完长代码点击“收起”时，若代码块顶端已滚出视口上方，系统自动调用 `scrollIntoView({ behavior: 'smooth', block: 'start' })` 平滑回滚至代码块顶部，杜绝突兀跳跃。

---

## 4. 实机演示：超过 25 行代码块折叠

下方为一段超过 35 行的完整企业级微服务网关配置文件范例。您可以直接观察其底部的渐变遮罩，并尝试点击底部的“展开全部代码 / 收起代码”按钮：

```ts twoslash
/**
 * 企业级高可用 API 网关核心配置规范
 * 演示超过 25 行代码块的自动渐变遮罩与交互折叠机制
 */
export interface GatewayRouteRule {
  /** 路由唯一标识 */
  id: string
  /** 匹配的 URL 路径前缀 */
  pathPrefix: string
  /** 目标微服务集群地址 */
  upstreamUrl: string
  /** 超时限制 (毫秒) */
  timeoutMs: number
  /** 限流熔断策略 */
  rateLimit: {
    maxRequestsPerSecond: number
    burstCapacity: number
  }
  /** 安全拦截中间件 */
  middlewares: Array<'cors' | 'jwt-auth' | 'rate-limiter' | 'request-logger'>
}

export interface GatewayClusterConfig {
  /** 集群命名空间 */
  namespace: string
  /** 监听端口 */
  port: number
  /** 路由转发规则矩阵 */
  routes: GatewayRouteRule[]
  /** 健康检查探针端点 */
  healthCheckPath: string
}

// 模拟大型网关规则集群装配
export const productionGatewayConfig: GatewayClusterConfig = {
  namespace: 'production-core-v2',
  port: 443,
  healthCheckPath: '/healthz/ready',
  routes: [
    {
      id: 'auth-service-route',
      pathPrefix: '/api/v1/auth',
      upstreamUrl: 'http://auth-service.internal:8001',
      timeoutMs: 3000,
      rateLimit: { maxRequestsPerSecond: 1000, burstCapacity: 2000 },
      middlewares: ['cors', 'rate-limiter', 'request-logger'],
    },
    {
      id: 'user-service-route',
      pathPrefix: '/api/v1/users',
      upstreamUrl: 'http://user-service.internal:8002',
      timeoutMs: 5000,
      rateLimit: { maxRequestsPerSecond: 500, burstCapacity: 800 },
      middlewares: ['cors', 'jwt-auth', 'request-logger'],
    },
    {
      id: 'billing-service-route',
      pathPrefix: '/api/v1/billing',
      upstreamUrl: 'http://billing-service.internal:8003',
      timeoutMs: 8000,
      rateLimit: { maxRequestsPerSecond: 200, burstCapacity: 300 },
      middlewares: ['cors', 'jwt-auth', 'rate-limiter', 'request-logger'],
    },
  ],
}
```

---

## 5. 开发者自定义与配置

在主题自定义中，超长代码块折叠功能已通过 `useCodeFolding()` Hook 在根布局 `Layout.vue` 中自动挂载，默认阈值为 `25` 行。

若二开团队需要自定义折叠阈值，可在调用时传入指定行数参数：

```ts
import { useCodeFolding } from './composables/useCodeFolding'

// 将全局触发折叠的行数阈值调整为 30 行
useCodeFolding(30)
```
