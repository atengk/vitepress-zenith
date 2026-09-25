---
title: 结构化参数契约表组件
order: 13
---

# 结构化参数契约表 (VpApiTable & VpApiItem)

在现代软件工程、前端组件库与后端 SDK 的技术文档中，**参数与配置项（API / Props / Options）表格**是读者查阅频次最高、信息密度最大的核心区域。

然而，原生 Markdown 的管道表格语法（`| ... | ... |`）在严肃技术场景下暴露出诸多难以克服的体验痛点：
- **移动端与窄屏横向截断**：原生表格在宽度不足时产生刺眼的横向滚动条，甚至内容被硬性裁剪或换行破裂；
- **类型表现力贫瘠**：复杂的 TypeScript 泛型、联合类型或回调函数签名挤压在纯文本单元格中，难以快速辨识；
- **元数据标签混乱**：缺少对“必填”、“默认值”、“废弃警告”与“版本演进”等工程语义的标准呈现方式。

**VitePress Zenith** 创新设计了 `<VpApiTable>` 容器组件与 `<VpApiItem>` 参数项组件。支持在全站任何 Markdown 文件中**免 import 直接声明**，在桌面端呈现规整的自适应弹性网格，并在移动端（`<768px`）平滑自动降级为精致的卡片流。

---

## 核心设计特性

<VpCardGrid :cols="2">
  <VpCard
    icon="i-lucide-smartphone"
    title="移动端自适应卡片流"
    description="在屏幕宽度小于 768px 时自动隐藏表头，将参数行无缝重构成垂直弹性卡片，彻底根除横向滚动条。"
  />
  <VpCard
    icon="i-lucide-sparkles"
    title="工程级语义高光胶囊"
    description="内置必填红色胶囊、类型代码色调、默认值灰度标签、引入版本绿标与废弃划线预警，契约一目了然。"
  />
  <VpCard
    icon="i-lucide-search"
    title="即时参数关键字检索"
    description="支持开启顶部搜索框，输入关键字毫秒级实时过滤参数名、类型定义与说明文本，提升大型 API 查阅效率。"
  />
  <VpCard
    icon="i-lucide-code-2"
    title="双模态书写体验"
    description="同时支持声明式嵌套标签（支持富文本/代码块插槽）与数组数据驱动模式（:items 纯 JSON 传参）。"
  />
</VpCardGrid>

---

## 实机效果演示

### 1. 基础配置契约表（含必填与搜索过滤）

<VpApiTable
  title="ButtonProps 组件属性"
  description="桌面端严整网格对齐，缩小浏览器窗口即可观察移动端卡片形态"
  :searchable="true"
>
  <VpApiItem
    name="type"
    type="'primary' | 'success' | 'warning' | 'danger' | 'info'"
    default="'primary'"
    version="v1.0.0"
    description="按钮语义类型与主题色调"
  />
  <VpApiItem
    name="size"
    type="'sm' | 'md' | 'lg'"
    default="'md'"
    version="v1.0.0"
    description="按钮尺寸规格"
  />
  <VpApiItem
    name="onClick"
    type="(event: MouseEvent) => void | Promise<void>"
    required
    version="v1.0.0"
  >
    点击按钮时触发的事件处理回调函数。若返回 Promise，将自动触发防抖与加载中状态。
  </VpApiItem>
  <VpApiItem
    name="disabled"
    type="boolean"
    default="false"
    version="v1.0.0"
    description="是否禁用按钮，禁用时将拦截一切点击事件"
  />
  <VpApiItem
    name="ghost"
    type="boolean"
    default="false"
    deprecated="v2.0.0"
    description="幽灵按钮变体，已在 v2.0.0 废弃，请改用 variant='outline'"
  />
</VpApiTable>

---

### 2. 数据驱动模式 (Props Array)

当参数数量极多或由外部 JSON 自动化生成时，可以直接通过 `:items` 属性传入数组：

<VpApiTable
  title="HttpServiceOptions 网络服务全局配置"
  :items="[
    { name: 'baseURL', type: 'string', required: true, description: 'API 服务请求基准根路径' },
    { name: 'timeout', type: 'number', default: '5000', version: 'v1.0.0', description: '请求超时时间，单位毫秒' },
    { name: 'headers', type: 'Record<string, string>', default: '{}', description: '全局默认注入的自定义 HTTP 请求头' },
    { name: 'withCredentials', type: 'boolean', default: 'true', version: 'v1.1.0', description: '跨域请求时是否携带凭证 Cookies' }
  ]"
/>

---

## 组件使用范式与代码

### 标签嵌套模式（推荐在日常文档中使用）

标签模式具备极高的灵活性，支持在 `<VpApiItem>` 的默认插槽中嵌入行内代码、超链接与格式化文字：

```html
<VpApiTable
  title="UserService 配置契约"
  description="核心服务实例化参数"
  :searchable="true"
>
  <VpApiItem
    name="appId"
    type="string"
    required
    version="v1.0.0"
    description="平台分配的应用唯一标识符"
  />

  <VpApiItem
    name="secret"
    type="string"
    required
    version="v1.0.0"
    description="平台接入私钥密钥"
  />

  <VpApiItem
    name="onTokenExpired"
    type="() => Promise<string>"
    version="v1.2.0"
  >
    Token 凭据过期后的刷新补偿拦截器。可查阅 <a href="./getting-started.html">快速上手指南</a> 获取实现范例。
  </VpApiItem>
</VpApiTable>
```

---

## 组件参数契约 (Dogfooding)

以下使用 `<VpApiTable>` 自身展示其对外开放的属性清单：

### `<VpApiTable>` 容器组件

<VpApiTable title="VpApiTable Props" :searchable="true">
  <VpApiItem
    name="title"
    type="string"
    description="表格主标题，为空时不渲染顶部标题行"
  />
  <VpApiItem
    name="description"
    type="string"
    description="表格副标题或补充说明文字"
  />
  <VpApiItem
    name="items"
    type="ApiTableItem[]"
    default="[]"
    description="参数项数据数组，使用数据驱动模式时传入"
  />
  <VpApiItem
    name="showVersion"
    type="boolean"
    default="true"
    description="是否渲染引入版本列。设为 false 时将省略版本号列并拓展描述列宽度"
  />
  <VpApiItem
    name="searchable"
    type="boolean"
    default="false"
    description="是否在表格右上角开启即时关键字过滤搜索框"
  />
  <VpApiItem
    name="searchPlaceholder"
    type="string"
    default="'检索参数名称或类型...'"
    description="检索框未输入时的占位提示文本"
  />
</VpApiTable>

### `<VpApiItem>` 参数项组件

<VpApiTable title="VpApiItem Props" :showVersion="false">
  <VpApiItem
    name="name"
    type="string"
    required
    description="参数或属性名称（以等宽粗体高光呈现）"
  />
  <VpApiItem
    name="type"
    type="string"
    description="TypeScript 类型契约或联合取值表达式（以天蓝/青色代码高光呈现）"
  />
  <VpApiItem
    name="default"
    type="string"
    description="参数缺省默认值（以中性代码徽标呈现）"
  />
  <VpApiItem
    name="required"
    type="boolean"
    default="false"
    description="是否为必填参数。为 true 时在名称旁渲染醒目的红色「必填」胶囊"
  />
  <VpApiItem
    name="version"
    type="string"
    description="首次引入此特性的版本号，以翡翠绿等宽徽标呈现"
  />
  <VpApiItem
    name="description"
    type="string"
    description="参数详细描述文本。若使用了默认插槽，插槽内容将优先渲染"
  />
  <VpApiItem
    name="deprecated"
    type="boolean | string"
    default="false"
    description="废弃标记。传 true 标记已废弃；传字符串如 'v2.0.0' 显示具体废弃版本"
  />
</VpApiTable>

---

## 移动端响应式降级原理解析

原生 Markdown 表格采用浏览器默认的 `table-layout: auto`，在多列长文本存在时计算极其僵硬。

Zenith 采用现代 **CSS Grid + Flexbox 动态响应架构**：
1. **桌面端（$\ge 768\text{px}$）**：采用 `grid-template-columns` 严整切分参数名、类型、默认值、版本与详细说明，支持长文本自然折行而绝不挤压关键信息列；
2. **移动端（$< 768\text{px}$）**：通过媒体查询将行容器切换为独立卡片，表头自动隐藏，每行单元格自上而下纵向流动，参数名称与必填徽标置顶，类型与默认值横向平铺，详细描述居底展现；
3. **打印模式（`print.css`）**：在白皮书级 PDF 导出时自动净化检索栏并以清爽网格排版输出。
