---
title: 富媒体与可视化矩阵
order: 5
---

# 富媒体与可视化矩阵 (Rich Media Matrix)

VitePress Zenith 原生集成了 **LaTeX 数学公式**、**Mermaid 专业矢量图表（流程图、时序图、甘特图、Git分支图、状态机、类图、ER图、饼图、旅程图）**、**Markmap 交互思维导图** 与 **Medium-zoom 图片平滑缩放灯箱**，让专业技术文档与知识库获得顶级表现力。

---

## 一、LaTeX 数学公式 (MathJax)

得益于 VitePress 原生 `markdown.math: true` 配置，无需任何额外插件即可直接书写标准 LaTeX 语法。

### 1. 行内公式 (Inline Math)

在段落中使用单个 `$` 包裹公式：
- 欧拉恒等式：$e^{i\pi} + 1 = 0$
- 质能方程：$E = mc^2$
- 高斯积分：$\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}$

### 2. 块级独立公式 (Block Math)

使用双 `$$` 包裹独立居中的复杂公式推导：

$$
f(x) = \frac{1}{\sigma \sqrt{2\pi}} \exp\left( -\frac{1}{2}\left(\frac{x-\mu}{\sigma}\right)^{\!2} \right)
$$

麦克斯韦方程组微分形式：

$$
\begin{aligned}
\nabla \cdot \mathbf{E} &= \frac{\rho}{\varepsilon_0} \\
\nabla \cdot \mathbf{B} &= 0 \\
\nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t} \\
\nabla \times \mathbf{B} &= \mu_0 \mathbf{J} + \mu_0 \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t}
\end{aligned}
$$

---

## 二、Mermaid 架构与时序图

直接在 Markdown 中书写 ````mermaid 代码块，系统自动编译为深浅主题自适应的矢量 SVG。

### 1. 双轨对称系统架构流程图 (Symmetrical Architecture)

测试双轨分支与汇聚结构，展示各层级节点在卡片容器内的**绝对水平居中**与圆角矩形自适应舒展：

```mermaid
flowchart TD
  Client["客户端 / 读者"] -->|发起访问| CDN["全球边缘加速网络"]
  CDN -->|静态直出| SSG["预编译纯静态 HTML"]
  CDN -->|客户端水合| Hydration["Vue 3 响应式激活"]
  SSG --> Runtime["Zenith 全站运行时"]
  Hydration --> Runtime
  Runtime -->|沉浸模式| Zen["Zen Mode 沉浸画布"]
  Runtime -->|选项卡联动| Tabs["PackageManagerTabs 实时广播"]
```

### 2. 条件决策与双向分流流程图 (Decision Flowchart)

测试菱形决策节点 `{...}`、判断分支标签、对称双向分流与汇聚对齐：

```mermaid
flowchart TD
  Start(["用户请求访问文档"]) --> Check{本地是否存在 PWA 离线缓存?}
  Check -->|是 / 命中| Cache["直接从 Service Worker 极速直出"]
  Check -->|否 / 未命中| Fetch["向 CDN 发起网络请求获取资产"]
  Fetch --> Success{网络请求是否成功?}
  Success -->|成功| UpdateCache["更新本地 CacheStorage 预缓存"]
  Success -->|失败| Fallback["降级展示内置离线备用提示页"]
  UpdateCache --> Render["完成页面首屏渲染水合"]
  Cache --> Render
  Fallback --> End(["结束 / 等待网络恢复"])
  Render --> End
```

### 3. 横向全链路构建流水线 (Horizontal Pipeline)

测试横向排版（`flowchart LR`）下长词节点（如 `TypeScript 严格类型检查`、`PWA 离线 Service Worker 注入`）的水平居中与宽度延展：

```mermaid
flowchart LR
  Code(["开发者编写源码"]) --> Lint["ESLint & Prettier 语法规范校验"]
  Lint --> TypeCheck["TypeScript 严格类型检查"]
  TypeCheck --> Build["VitePress SSG 生产预编译打包"]
  Build --> PwaWorker["PWA 离线 Service Worker 注入"]
  PwaWorker --> Deploy(["自动化部署至 CDN 全球边缘网络"])
```

### 4. 模块容器分层与子图架构 (Subgraphs & Multi-Layer System)

测试多子图（`subgraph`）嵌套容器在页面卡片中的居中对齐、跨层连线及圆柱体存储节点 `[(...)]`：

```mermaid
flowchart TD
  subgraph ClientLayer["客户端接入层"]
    Browser["现代浏览器端 (Chrome / Safari / Edge)"]
  end

  subgraph GatewayLayer["边缘网关与分发层"]
    CDNNode["Cloudflare 全球边缘 CDN"]
    EdgeRule["边缘重定向与安全鉴权网关"]
  end

  subgraph AppLayer["核心渲染与应用服务层"]
    SSGServer["VitePress 预编译静态服务"]
    HydrateApp["Vue 3 响应式水合运行时"]
  end

  subgraph StorageLayer["本地与远程存储层"]
    LocalDB[("Local Storage 跨标签页状态")]
    IndexedDB[("CacheStorage PWA 离线资产库")]
  end

  Browser --> CDNNode
  CDNNode --> EdgeRule
  EdgeRule --> SSGServer
  EdgeRule --> HydrateApp
  HydrateApp --> LocalDB
  HydrateApp --> IndexedDB
```

### 5. 文本长度与节点多形态极限测试矩阵 (Boundary Test Matrix)

测试单字短词、超长中英混合术语、显式换行 `<br/>` 标签以及六边形 <code v-pre>{{...}}</code>、梯形 `[/.../]` 等多样化几何节点的居中与内边距对称性：

```mermaid
flowchart TD
  Short1(["入口"]) --> Short2["校验"]
  Short2 --> LongNode["Shiki Twoslash 动态类型悬浮推导与诊断插件"]
  LongNode --> MultiLine["核心渲染管线<br/>(Markdown-it + UnoCSS + Twoslash)"]
  MultiLine --> HexNode{{"全站消息广播响应式事件总线 (EventEmitter)"}}
  HexNode --> TrapeNode[/"输入参数校验网关 (Input Guard)"/]
  TrapeNode --> CylNode[("Redis 分布式原子锁缓存集群")]
  CylNode --> Finish(["终点 / 完美自适应居中"])
```

### 6. 跨页面状态同步时序图 (Sequence Diagram)

```mermaid
sequenceDiagram
  autonumber
  actor User as 读者
  participant Doc as 文档页面
  participant Store as usePackageManager
  participant Storage as 本地存储 (localStorage)

  User->>Doc: 点击切换选项卡至 pnpm
  Doc->>Store: setActiveManager('pnpm')
  Store->>Doc: 响应式同步全站选项卡视图
  Store->>Storage: setItem('vp-zenith-package-manager', 'pnpm')
  Storage-->>Doc: storage 跨标签页实时广播更新
```

---

## 三、Mermaid 专业图表进阶实战 (Advanced Diagrams)

除基础流程图与时序图外，系统原生深度支持**甘特图**、**Git 分支演进图**、**系统状态机**、**架构类图**、**实体关系图 (ERD)**、**多维占比饼图**与**全链路用户旅程图**，直接在 ````mermaid 代码块中声明即可自适应全站深浅主题：

### 1. 项目迭代甘特图 (Gantt Chart)

用于展示多阶段研发迭代排期、关键里程碑路径与任务并行进度：

```mermaid
gantt
    title Zenith 架构升级与发布里程碑
    dateFormat  YYYY-MM-DD
    section 核心基建
    离线 PWA 预缓存集成        :done,    m1, 2026-09-01, 2026-09-08
    沉浸式专注阅读 (Alt+Z)     :done,    m2, 2026-09-09, 2026-09-17
    全站特性开关集中管控       :done,    m3, 2026-09-18, 2026-09-24
    section 组件与体验
    短代码组件库与参数契约表   :done,    m4, 2026-09-12, 2026-09-20
    新项目脱敏初始化脚手架     :active,  m5, 2026-09-24, 2026-09-29
    section 交付发布
    生产级构建压测与死链探测   :active,  m6, 2026-09-27, 2026-09-29
    v1.0.0 稳定版全网正式发布  :crit,    m7, 2026-09-30, 2026-10-01
```

### 2. Git 分支演进与发布流水线图 (Git Graph)

用于直观表达团队分支协作规范（Git Flow）、功能集成分支与版本发布流向：

```mermaid
gitGraph
    commit id: "feat: init-core"
    branch develop
    checkout develop
    commit id: "feat: pwa-offline"
    commit id: "feat: zen-mode"
    branch feature/switches
    checkout feature/switches
    commit id: "feat: feature-matrix"
    commit id: "test: check-pass"
    checkout develop
    merge feature/switches id: "merge: switches"
    checkout main
    merge develop id: "release: v1.0.0" tag: "v1.0.0"
    branch hotfix/1.0.1
    checkout hotfix/1.0.1
    commit id: "fix: ssr-render"
    checkout main
    merge hotfix/1.0.1 id: "release: v1.0.1" tag: "v1.0.1"
```

### 3. 系统状态机与生命周期流转图 (State Diagram)

用于清晰定义复杂业务实体、文档生命周期或订单状态的流转边界与前置守卫：

```mermaid
stateDiagram-v2
    [*] --> 草稿撰写: 创建 Markdown
    草稿撰写 --> 评审中: 提交 Pull Request
    评审中 --> 缺陷驳回: 存在格式/死链问题
    缺陷驳回 --> 草稿撰写: 修改并重新推送
    评审中 --> 审查通过: Review 与 CI 全绿
    审查通过 --> 生产构建: 合并至主干分支
    生产构建 --> 线上分发: SSG 编译 & CDN 发布
    线上分发 --> 归档锁定: 超过维护生命周期
    归档锁定 --> [*]
```

### 4. 面向对象与架构类继承图 (Class Diagram)

用于梳理系统的核心类、抽象接口、依赖注入与继承层级：

```mermaid
classDiagram
    class ZenithPlugin {
        <<interface>>
        +String name
        +Boolean enabled
        +mount(app: App) void
        +unmount() void
    }
    class ThemePaletteManager {
        -String currentPalette
        -Boolean isDark
        +setPalette(name: String) void
        +toggleDark() Boolean
    }
    class CommandPalette {
        -MiniSearch index
        -List~CommandItem~ actions
        +open() void
        +search(keyword: String) List
    }
    ZenithPlugin <|.. ThemePaletteManager : implements
    ZenithPlugin <|.. CommandPalette : implements
    ThemePaletteManager --> CommandPalette : 广播主题色变更
```

### 5. 数据实体关系图 (Entity-Relationship Diagram / ERD)

直观表达数据库表结构设计、外键引用与一对多/多对多实体关联：

```mermaid
erDiagram
    USER ||--o{ POST : "撰写"
    USER ||--o{ COMMENT : "发表"
    POST ||--|{ CATEGORY : "属于"
    POST ||--o{ TAG : "打上标签"
    POST ||--o{ COMMENT : "拥有"

    USER {
        string id PK "用户唯一编号"
        string username "用户名"
        string email "电子邮箱"
        string role "角色权限"
    }
    POST {
        string id PK "文章唯一 Slug"
        string title "文章标题"
        datetime published_at "发布时间"
        boolean is_archived "是否已归档"
    }
    COMMENT {
        string id PK "评论编号"
        string content "评论内容"
        string post_id FK "关联文章 ID"
    }
```

### 6. 多维业务占比饼图 (Pie Chart)

直观呈现数据分布构成、模块代码篇幅或业务权重：

```mermaid
pie title 全站知识库内容结构与篇幅占比
    "核心指南与技术白皮书" : 42
    "免导入短代码交互组件" : 28
    "架构决策记录 (ADR)" : 15
    "团队技术博客与动态" : 15
```

### 7. 用户全链路行为旅程图 (User Journey)

以时间线与满意度打分形式，可视化读者或开发者的端到端使用旅程：

```mermaid
journey
    title 开发者接入 VitePress Zenith 全链路旅程
    section 探索与起步
      浏览官方技术文档: 5: 读者, 开发者
      一键克隆代码仓库: 4: 开发者
      执行 pnpm install: 5: 开发者
    section 编写与沉浸体验
      启动 pnpm dev 毫秒热更: 5: 开发者
      调用短代码撰写文档: 5: 开发者
      沉浸模式 (Alt+Z) 专注校验: 5: 读者, 开发者
    section 部署与新项目派生
      一键脱敏派生新项目: 5: 开发者
      GitHub Pages 自动部署: 4: 运维, 开发者
```

---

## 四、Markmap 交互思维导图

书写标准 Markdown 标题与无序列表，直接在 ````markmap 代码块中动态渲染为支持**缩放**、**平移拖拽**与**节点点击折叠**的交互式脑图：

```markmap
# VitePress Zenith 知识矩阵
## 核心基建
- VitePress 1.6+ 极速引擎
- Vue 3.5 响应式系统
- TypeScript 5.7 类型约束
- UnoCSS 原子化与图标库
## 沉浸式阅读
- 快捷键 Alt + Z
- 双向硬件加速展翼动效
- 1180px 黄金宽屏画布
- 顶部阅读进度指示条
## 富媒体矩阵
- LaTeX / MathJax 公式
- Mermaid 流程与时序图
- Markmap 动态思维导图
- Medium-zoom 点击缩放灯箱
## 开发者体验 (DX)
- Shiki Twoslash 动态类型悬浮
- PackageManagerTabs 全站跨页联动
```

右上角内置便捷工具栏，支持一键放大、缩小与适应画布居中。

---

## 五、Medium-zoom 图片平滑缩放灯箱

正文中的所有插图均自动集成 Medium 风格的平滑灯箱预览，点击插图即可进入聚焦大图模式，再次点击或滚动页面即可平滑复原：

<div style="text-align: center; margin: 24px 0;">
  <img src="/logo.svg" alt="VitePress Zenith 矢量徽标" style="max-width: 140px; margin: 0 auto; display: block;" />
  <p style="font-size: 13px; color: var(--vp-c-text-2); margin-top: 8px;">点击上方插图体验平滑缩放与背景模糊灯箱</p>
</div>

若某些装饰性图标或小图不需要点击放大，只需在标签上添加 `class="no-zoom"` 即可自动排除。

---

> [!TIP] **进阶媒体管理**
> 想要了解图片相对路径与 Public 静态目录选型规范、深浅色模式双图自适应及 B站/YouTube/MP4 视频播放短代码组件？详见 [图片与多媒体资产管理 (Media Assets)](./media-assets.md)。

