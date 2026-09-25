<p align="center">
  <a href="https://github.com/atengk/vitepress-zenith">
    <img src="./docs/public/logo.svg" width="160" height="160" alt="VitePress Zenith Logo" />
  </a>
</p>

<h1 align="center">VitePress Zenith</h1>

<p align="center">
  <strong>现代化顶配旗舰级技术文档、知识库与技术博客矩阵模板</strong>
</p>

<p align="center">
  开箱即用集成沉浸式专注阅读 (Zen Mode)、Twoslash 动态类型推导、Markmap 思维导图、全能富媒体可视化与全站包管理器联动
</p>

<p align="center">
  <a href="https://github.com/atengk/vitepress-zenith/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" alt="MIT License" />
  </a>
  <a href="https://nodejs.org/">
    <img src="https://img.shields.io/badge/Node-%3E%3D20.0.0-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node Version" />
  </a>
  <a href="https://pnpm.io/">
    <img src="https://img.shields.io/badge/pnpm-%3E%3D9.0.0-f69220?style=flat-square&logo=pnpm&logoColor=white" alt="pnpm" />
  </a>
  <a href="https://vitepress.dev/">
    <img src="https://img.shields.io/badge/VitePress-^1.6.3-8b5cf6?style=flat-square&logo=vitepress&logoColor=white" alt="VitePress" />
  </a>
  <a href="https://vuejs.org/">
    <img src="https://img.shields.io/badge/Vue-^3.5.0-42b883?style=flat-square&logo=vue.js&logoColor=white" alt="Vue 3" />
  </a>
  <a href="https://github.com/atengk/vitepress-zenith/actions">
    <img src="https://img.shields.io/badge/CI%2FCD-Passing-success?style=flat-square&logo=githubactions&logoColor=white" alt="CI/CD" />
  </a>
</p>

---

## 🌟 为什么选择 VitePress Zenith？

在搭建企业级或现代化个人技术文档与知识库时，基于原生 VitePress 往往需要耗费大量时间集成周边插件（如代码悬浮类型、思维导图、全站包管理器切换、灯箱、离线检索等），并且经常遭遇样式穿透、依赖冲突、深色模式失调以及移动端适配等痛点。

**VitePress Zenith（天顶）** 正是为此而生：
- 🎯 **开箱即用**：零额外配置，拉取即拥有业界标杆级的设计与交互。
- 💎 **美学天花板**：融合毛玻璃、渐变高光微光、呼吸动效与现代无衬线排版。
- 🛠️ **全链路开发生态**：内置 CI/CD、自动生成多级侧边栏、免导入交互组件库与技术博客矩阵。

---

## 🚀 8 大杀手级核心特性

| 特性板块 | 说明 |
| :--- | :--- |
| 🎯 **沉浸式专注阅读 (Zen Mode)** | 一键折叠双侧边栏，正文加宽至黄金阅读比例。支持全局快捷键（`Alt + Z`）与本地偏好记忆。 |
| ⚡ **Shiki Twoslash 动态类型悬浮** | 在网页文档中体验 VS Code 级代码悬浮类型提示（`// ^?`）与编译器语法即时诊断。 |
| 📦 **全站联动包管理器选项卡** | 支持 `npm` / `pnpm` / `yarn` / `bun` 一键切换，全站跨页面状态实时无缝同步。 |
| 📐 **全能富媒体与架构可视化** | 原生支持 LaTeX 数学公式、Mermaid 架构时序图、Markmap 交互思维导图与 Medium-zoom 图片灯箱。 |
| 🔍 **零外部依赖离线全文检索** | 内置 Minisearch 离线检索并基于 `Intl.Segmenter` 深度优化中文分词与模糊匹配，零第三方服务。 |
| 🧩 **全套免导入短代码交互组件** | 全局免 `import` 直接使用卡片矩阵、版本演进时间轴、组件交互沙箱、精美外链卡片与全宽横幅。 |
| 📰 **生产级技术博客与运营套件** | 包含完整的博客时间轴归档、多维度分类筛选、热门标签墙、元数据徽标与阅读时长估算。 |
| 🤖 **自动化 CI/CD 与部署流水线** | 预置 GitHub Actions 自动化工作流，涵盖依赖恢复、类型检查、静态构建与 GitHub Pages 一键发布。 |

---

## 🛠️ 快速起步

### 1. 环境准备

确保您的本地开发环境满足以下要求：
- [Node.js](https://nodejs.org/) `>= 20.0.0`
- [pnpm](https://pnpm.io/) `>= 9.0.0`

### 2. 克隆与安装

```bash
# 克隆仓库
git clone https://github.com/atengk/vitepress-zenith.git

# 进入项目目录
cd vitepress-zenith

# 安装依赖
pnpm install
```

### 3. 本地开发与实时预览

```bash
# 启动 VitePress 开发服务器（支持热重载）
pnpm dev

# 启动类型诊断
pnpm typecheck
```

本地服务启动后，在浏览器访问 [http://localhost:5173](http://localhost:5173) 即可实时查阅。

### 4. 生产编译与预览

```bash
# 编译全站静态产物（输出至 docs/.vitepress/dist）
pnpm build

# 本地预览生产构建产物
pnpm preview
```

---

## 📁 项目架构与目录结构

```text
vitepress-zenith/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 自动化构建与 GitHub Pages 部署
├── docs/                       # 文档与博客源码目录
│   ├── .vitepress/             # VitePress 核心配置与定制主题
│   │   ├── config.ts           # 站点全局配置（导航、侧边栏、搜索、Markdown 扩展等）
│   │   ├── theme/              # 主题定制层
│   │   │   ├── index.ts        # 主题入口与短代码全局组件注册
│   │   │   ├── components/     # 内置核心交互组件（ZenMode, Markmap, Mermaid, Banner 等）
│   │   │   └── styles/         # 全局样式增强、自定义变量与中文排版微调
│   │   └── utils/              # 侧边栏自动生成器与工具函数
│   ├── blog/                   # 技术博客与文章矩阵（含时间轴归档与分类检索）
│   ├── components/             # 交互短代码组件使用指引与示例
│   ├── guide/                  # 快速起步与使用指南
│   ├── public/                 # 静态资源（矢量 Logo、Favicon 等）
│   └── index.md                # 首页 Hero 宣传页
├── package.json                # 项目依赖与运行脚本
├── tsconfig.json               # TypeScript 严格模式配置
├── uno.config.ts               # UnoCSS 原子类与 Lucide 图标集预设
└── README.md                   # 根目录项目说明文档
```

---

## 🧩 内置短代码组件矩阵

项目内置了大量高频交互组件，在任意 Markdown 文档中均可**直接调用，无需手动 import**：

| 组件名称 | 标签使用示例 | 核心应用场景 |
| :--- | :--- | :--- |
| **全宽公告横幅** | `<GlobalBanner title="..." content="..." />` | 顶置发布重要通知、版本发版公告或活动提醒 |
| **卡片网格容器** | `<CardGrid cols="2">...</CardGrid>` | 首页、引导页与特性展示矩阵栅格排版 |
| **多态信息卡片** | `<Card title="..." icon="i-lucide-rocket">...</Card>` | 封装结构化信息、操作入口或关键要点 |
| **版本演进时间轴**| `<Timeline :items="[...]" />` | 架构演进记录、Changelog、发布历程与路线图 |
| **组件运行沙箱** | `<Sandbox preview="...">...</Sandbox>` | 实时调试交互演示组件并可切换查看源代码 |
| **精美外链卡片** | `<LinkCard title="..." link="..." />` | 推荐关联资源、参考文档与友情链接 |
| **思维导图渲染器**| ```` ```markmap ```` | 知识框架、技能树、知识脉络全景图 |
| **架构时序图** | ```` ```mermaid ```` | 流程图、类图、甘特图与系统交互时序图 |
| **包管理器切换** | `::: package-manager` | 跨页面偏好联动的 npm / pnpm / yarn / bun 选项卡 |

---

## 🚢 自动化 CI/CD 与部署

项目内置了完整的 GitHub Actions 工作流（位于 `.github/workflows/deploy.yml`）。

当代码推送或合并至 `master` / `main` 分支时，工作流将自动执行：
1. 检出代码并恢复 pnpm 依赖缓存；
2. 运行 `pnpm run typecheck` 校验 TypeScript 语法与类型安全；
3. 执行 `pnpm run build` 构建生产级静态文档；
4. 自动上传产物并部署至 **GitHub Pages**。

---

## 📄 开源许可证

本项目基于 [MIT 许可证](./LICENSE) 开源发布，欢迎自由使用、分发与二次定制。
