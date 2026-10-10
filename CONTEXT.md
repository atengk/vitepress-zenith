# VitePress Zenith 模板工程

基于 VitePress 构建的现代化全能型技术文档、知识库与技术博客矩阵模板。

## 统一领域语言 (Language)

**全能技术矩阵 (Technical Matrix)**:
包含现代化落地页 (Landing Page)、多模块分层技术文档 (Technical Docs) 与团队演进动态/博客 (Technical Blog) 的一体化内容架构。
_Avoid_: 纯静态博客, 纯API文档

**默认主题扩展 (Extended Default Theme)**:
在 VitePress 官方默认主题基础上，通过 Vue 布局插槽 (Layout Slots)、全局组件注册与 UnoCSS 原子化原子层进行功能与视觉增强的扩展模式。
_Avoid_: 裸写主题, 官方主题覆写, 第三方封闭主题

**离线全文检索 (Offline Full-Text Search)**:
在构建与运行期由浏览器本地加载分词索引进行检索的机制，开箱支持中文分词，且不依赖任何外部云端鉴权服务。
_Avoid_: Algolia搜索, 外部服务端检索

**自动目录路由 (Automated Directory Routing)**:
根据文件系统物理目录结构与文档 Frontmatter 元数据，自动派生侧边栏层级与导航关系的自动化机制。
_Avoid_: 硬编码路由, 手动侧边栏配置

**沉浸式阅读模式 (Immersive Reading Mode)**:
一键隐藏左侧边栏导航与右侧目录大纲（TOC Aside）、聚焦正文黄金阅读区域的专注阅读视图（Zen Mode），支持快捷键交互与用户偏好持久化。
_Avoid_: 全屏模式, 打印预览

**解耦对称转场 (Decoupled Symmetrical Transition)**:
在沉浸式阅读模式切换时，左侧边栏与右侧目录分别向外侧硬件加速平移隐退、导航栏维持结构稳定且正文避免逐帧折行抖动的分层动画范式。
_Avoid_: 暴力全局过度(transition: all), 文字折行回流震颤, 顶部元素横向乱窜

**原子化图标体系 (Atomic Icon System)**:
基于 UnoCSS 与 Iconify 规范实现的纯 CSS 按需图标渲染方案，支持在 Markdown 与 Vue 组件中直接通过语义化类名调用海量现代图标。
_Avoid_: 字体图标, SVG精灵图

**交互短代码组件 (Interactive Shortcodes)**:
全局免导入（Auto-registered）直接在 Markdown 中调用的交互式 Vue 组件集（卡片网格、时间轴、实时运行沙箱等）。
_Avoid_: 嵌入式Iframe, 第三方重量级UI

**类型悬浮诊断 (Type Hover & Diagnostics / Twoslash)**:
在文档代码块中基于 TypeScript 编译器运行期实现的实时类型悬浮查看、类型提示与静态诊断标注机制。
_Avoid_: 静态代码截图, 普通代码高亮

**包管理器联动记忆 (Synchronized Package Manager Tabs)**:
将不同包管理器（npm/pnpm/yarn/bun）命令整合为选项卡，并在全站范围及本地存储中跨页面全局同步用户所选偏好。
_Avoid_: 多行冗余命令, 独立隔离选项卡

**思维导图渲染 (Mindmap Rendering / Markmap)**:
在 Markdown 中通过标准层级无序列表直接编译并动态交互展示的矢量思维导图视图。
_Avoid_: 静态图片导入, 外部嵌入外链

**交互命令中心 (Command Palette)**:
类似 Raycast 的全局浮层快捷动作与检索面板，集成页面跳转、功能模式切换与快捷键触发。
_Avoid_: 裸搜索框, 传统下拉框

**阅读认知指标 (Reading Metrics)**:
自动提取正文字符与英文词汇，推算全文阅读预计耗时并直观展示，降低长文认知焦虑的元数据呈现机制。
_Avoid_: 机械字符计数, 强迫阅读限时

**自适应代码折叠 (Collapsible Code Blocks)**:
针对超过指定行数（如 25 行）的超长代码块，自动呈现底部渐变半透明过渡遮罩与一键展开/收起控件的视觉保护机制。
_Avoid_: 破坏性截断, 强行限制代码长度

**解耦式社区评论 (Decoupled Discussions)**:
基于 GitHub Discussions (Giscus) 实现的零服务端、无外部广告、深浅模式无缝跟随且按需配置的静态文档评论插槽。
_Avoid_: 第三方追踪型商业评论, 强依赖私有数据库

**动态主题色盘 (Dynamic Accent Palettes)**:
支持在运行时通过 CSS 变量动态切换全站主品牌强调色（Indigo/Emerald/Rose/Amber），且持久化保存在本地存储中的多套配色系统。
_Avoid_: 静态硬编码色彩, 笨重多套 CSS 全量重编译

**白皮书级纯净打印 (Whitepaper Print Stylesheet)**:
针对文档在浏览器 Ctrl+P 导出 PDF 场景下的排版优化规范，自动隐藏顶栏、侧边栏、悬钮与交互按钮，保留纯粹排版与代码公式。
_Avoid_: 打印残留滚动条, 侧边栏遮挡文字, 页面裁切乱码

**内链悬浮预览 (Link Hover Preview)**:
当光标在站内文档相对链接上方悬停时，自动弹出浮层展示目标页面的标题、标签、摘要与更新时间的微型预览机制。
_Avoid_: 机械页面跳转, 浏览器频繁前进后退打断心流

**渐进式离线应用 (PWA & Offline Availability)**:
基于 Service Worker 实现的静态资产与离线文档预缓存机制，支持在网络断开环境下秒开查阅，并支持安装为独立桌面/移动原生窗口。
_Avoid_: 弱网白屏, 仅限在线访问

**结构化参数契约表 (Structured API Table)**:
专为技术文档设计的参数/配置项呈现组件，支持类型胶囊、默认值、必填标记，并在移动端自适应为卡片流。
_Avoid_: 纯文本宽表格横向截断, 单元格文字密集挤压

**即时在线沙箱直达 (Instant Online Playground)**:
将文档内的代码演示片段一键打包投送至浏览器在线虚拟容器（如 StackBlitz WebContainer）中独立运行的生态互联能力。
_Avoid_: 繁琐本地环境从头拉取, 孤立代码块不可调试

**多语言国际化矩阵 (Internationalization / i18n Matrix)**:
基于 VitePress 原生 locales 体系构建的无缝中英多语言架构，支持根路径中文与 `/en/` 英文并行、独立的侧边栏自动化扫描与语言特定分词索引（英文词根与中文分词互不干扰）。
_Avoid_: 机械全量机翻, 单语言锁定

**多版本生命周期 (Multi-version Lifecycle)**:
针对技术库重大版本迭代（如 v1.x/v2.x/beta）提供的顶栏多版本切换器与旧版醒目归档横幅，防止读者误读过时 API。
_Avoid_: 暴力覆盖历史文档, 破坏旧版本直链

**全键盘极客导航 (Keyboard-first Navigation)**:
支持按 <kbd>?</kbd> 唤起全站快捷键速查表，支持用键盘 <kbd>J</kbd>/<kbd>K</kbd> 翻页、<kbd>T</kbd> 切换主题、<kbd>Alt+Z</kbd> 专注模式等纯键盘掌控体验。
_Avoid_: 强依赖鼠标拖拽, 隐藏快捷键无提示

**开源贡献者致谢流 (Contributors Avatar Stream)**:
基于 Git 提交历史自动提取当前文档的贡献者 GitHub 头像行与编辑历史，并提供“在 GitHub 上编辑此页”的协作闭环。
_Avoid_: 匿名无致谢, 增加贡献门槛

**可插拔功能开关矩阵 (Pluggable Feature Switch Matrix)**:
通过 `themeConfig.zenith` 集中管控、具备强类型安全契约的全局特性开关配置，支持无实质后端/高视觉干扰项默认静默（Opt-in），并允许单篇 Markdown 页面通过 Frontmatter 局部精准覆写的双层控制体系。
_Avoid_: 强制全量挂载, 页面杂货铺, 无法关闭多余浮标

**多媒体资产协同管理 (Media Assets Orchestration)**:
基于 Vite 模块化打包与 Vue 运行时的富媒体资产协同体系，覆盖相对路径自动哈希防篡改、Public 静态根目录与外部流媒体平台（Bilibili/YouTube）免配置 16:9 响应式短代码组件。
_Avoid_: 裸写固定高度iframe黑边, 暴力将百兆高清视频直推源码库, 缺少自适应比例

**双模主题媒体自适应 (Dual-theme Media Adaptation)**:
通过 `.light-only`/`.dark-only` 纯 CSS 无闪烁切换机制及 `<VpImage>` 短代码组件，让架构图与插图随系统或用户深浅色外观切换自动呈现最佳对比度视觉方案。
_Avoid_: 深色背景下白底图刺眼, 手动JS暴力换图抖动

**双通道自动化发版 (Dual-channel Automated Release)**:
本地交互式防呆脚本（Git Tag 驱动）与 GitHub Actions 云端按需调度（workflow_dispatch）协同触发生产级版本发布与资产挂载的交付体系。
_Avoid_: 手动网页乱打Tag, 裸推未构建提交, 本地暴力直传制品

**全生命周期发版防呆 (Release Preflight Verification)**:
在发版打 Tag 前对未提交改动、远端分支落后、依赖类型检查与生产静态编译进行全自动化拦截防御的自检机制。
_Avoid_: 脏工作区发版, 带编译报错发版, 遗留临时调试代码发布

**语义化更新日志生成 (Semantic Changelog Generation)**:
基于 git-cliff 解析 Conventional Commits 规范，自动对功能特性、缺陷修复与破坏性变更进行分类提取并渲染为 Release 摘要的机制。
_Avoid_: 人肉编写更新摘要, 机械堆砌PR流水账

**容器化轻量交付 (Containerized Distribution)**:
基于 Node.js 生产编译与 Nginx Alpine 静态托管两阶段分离的多架构（amd64/arm64）Docker 镜像交付范式，原生集成 Clean URLs 友好路由与长效缓存策略。
_Avoid_: 携带厚重Node运行时的单阶段臃肿镜像, 缺失SPA路由重定向配置, 仅支持单一架构构建

**轻量本地提交通用钩子 (Zero-dependency Git Hooks)**:
基于 `.githooks/` 的纯原生 Shell 提交守门机制，无需外部 Node/Husky 依赖即可在提交期实时校验 Conventional Commits，支持自动放行 Merge/Revert 并自带自愈注册能力。
_Avoid_: 强依赖体积庞大的第三方Hook框架, 提交无校验导致脏日志, 破坏Merge流程

**负责任安全与社区治理 (Responsible Community Governance)**:
结合 Contributor Covenant 行为准则、GitHub Security Advisories 私密漏洞披露渠道与 Issue 无模板空白提交防御的现代开源治理体系。
_Avoid_: 在公开讨论区披露安全PoC, 缺乏行为规范导致社区争议, 堆砌无格式无效Issue

**五维镜像标签矩阵 (5-Dimensional Image Tag Matrix)**:
在容器化分发阶段，由自动化流水线输出的覆盖最新版 (`latest`)、精确语义版本 (`{{version}}`)、次版本浮动 (`{{major}}.{{minor}}`)、主版本浮动 (`{{major}}`) 与 Git 原生标签对齐 (`v{{version}}`) 的标准化镜像标签体系，原生具备预发版本 (Prerelease) 自动隔离机制，防止开发期标签污染生产环境。
_Avoid_: 仅输出单个 latest 覆盖生产, 缺少小版本固定, 预发版本污染生产 latest

**发版源码精确防漂移 (Release Source Immutability / Anti-drift)**:
在多阶段分布式云端发版流水线中，下游容器构建与制品打包强制指定发版附注 Tag（而非动态变动的分支 HEAD）精确锁定源码检出，彻底阻断并发提交引起的版本脱节风险。
_Avoid_: 依赖动态分支检出导致镜像代码与发布版本脱节, 发版构建期代码突变

**依赖智能聚合编排 (Aggregated Dependency Orchestration)**:
在自动化依赖巡检中，对向下兼容性高、升级频率频密的 CI 工具链与 Actions 实施全版本（含 Major/Minor/Patch）单一 PR 智能打包聚合，避免碎片化通知轰炸与并发限流截断，同时对业务核心依赖维持保守类型过滤的分层治理机制。
_Avoid_: 无限制单列几十张独立PR导致合并地狱, 盲目自动合并破坏性业务依赖

**拓扑感知防双跑门禁 (Topological Anti-double-run Gate)**:
在 CI/CD 容器构建流水线中，通过 Git 原生引用拓扑自检（`git tag --points-at HEAD`）本地毫秒级感知分支提交是否已关联版本 Tag，并在分支构建任务中精准跳过以杜绝与 Tag 流水线重复执行、消除远端镜像标签覆盖竞态的自愈机制。
_Avoid_: 分支与Tag同时触发导致双重多架构构建浪费算力, 镜像latest标签并发覆盖竞态, 依赖易受限流的外部API查询

**原子发版推送与安全回滚 (Atomic Release Push & Safe Rollback Guard)**:
在发版交付过程中将分支 Bump 提交与附注版本 Tag 通过单次 Git 协议指令（`git push origin $BRANCH $TAG`）作为一个不可分割的事务原子提交至远端，并在网络或权限中断时自动撤销清理本地临时 Tag 的自愈交付机制。
_Avoid_: 分步推送导致分支入库但Tag失败的半提交死锁, 网络中断后本地残留脏Tag阻塞后续发版重试
