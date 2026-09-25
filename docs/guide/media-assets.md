---
title: 图片与多媒体资产管理
order: 11
---

# 图片与多媒体资产管理 (Media Assets)

在现代化软件工程与技术知识库中，架构插图、流程图、操作演示动图 (GIF) 与实操录屏视频是降低读者认知负荷的核心要素。

VitePress Zenith 底层深度融合了 Vite 的现代化静态资产流水线与 Vue 组件运行时，对**相对路径 (Relative)**、**Public 静态路径**以及**互联网网络路径 (External CDN)** 提供了 100% 完整支持，并封装了开箱即用的高质感交互短代码组件。

---

## 1. 媒体资源存储目录选型规范

在编写文档前，推荐根据资产类型选择最恰当的存储策略：

| 资产类型 | 推荐存储路径 | 引用方式范例 | 构建流水线处理行为 |
| :--- | :--- | :--- | :--- |
| **文档专属插图** | 就近存放于当前文档同级 `./assets/` | `![架构图](./assets/arch.png)` | Vite 模块化打包，自动添加**内容哈希防篡改** |
| **全站通用静态资源** | 存放在根目录 `docs/public/` | `![Logo](/logo.svg)` | 原样拷贝至根目录，不计算 Hash，保持稳定 URL |
| **大体积高清视频 (>10MB)** | 外部 CDN / 对象存储 或 B站/YouTube | `https://cdn.example.com/...` | 避免 Git 代码库体积膨胀，加速全球分发与播放 |

---

## 2. 图片嵌入语法与实机效果

### 2.1 原生 Markdown 标准语法

最直观、跨编辑器兼容性最好的标准格式：

```markdown
<!-- 1. 相对路径（自动随文档打包并计算 Hash） -->
![系统架构全景图](./assets/system-architecture.png)

<!-- 2. Public 绝对路径（读取 docs/public/logo.svg） -->
![产品 Logo](/logo.svg)

<!-- 3. 互联网外链图片 -->
![云端监控图表](https://images.unsplash.com/photo-1551288049-bebda4e38f71)
```

#### 实机渲染效果预览：

<div style="text-align: center; margin: 20px 0;">
  <img src="/logo.svg" alt="Zenith 徽标矢量图" style="max-width: 140px; margin: 0 auto; display: block;" />
  <p style="font-size: 13px; color: var(--vp-c-text-2); margin-top: 8px;">👆 点击上方图片体验 Medium Zoom 平滑全屏放大灯箱</p>
</div>

> [!TIP] **正文插图平滑点击放大 (Medium Zoom)**
> Zenith 默认开启了 `mediumZoom` 开关。正文中无论使用相对路径还是网络图，**点击图片均可平滑全屏居中放大**，再次点击或按下 <kbd>ESC</kbd> 即可退出。若某些小图标不希望被放大，只需使用 HTML 标签并添加 `class="no-zoom"`。

---

### 2.2 深色 / 浅色模式双图自适应

许多架构图与时序图在浅色背景下为白底黑字，在深色模式下若不作适配则会产生强烈的刺眼反差。Zenith 提供了两种极简优雅的解决方案：

#### 方案 A：纯 CSS 类名标记（推荐，零组件依赖）
在全局样式中内置了 `.light-only` 与 `.dark-only` 类：

```html
<img src="/theme-demo-light.svg" alt="系统架构图" class="light-only" />
<img src="/theme-demo-dark.svg" alt="系统架构图" class="dark-only" />
```

#### 方案 B：使用 `<VpImage>` 交互短代码
免 import，单行标签搞定双图切换与居中图注：

```html
<VpImage
  light="/theme-demo-light.svg"
  dark="/theme-demo-dark.svg"
  alt="微服务分层拓扑图"
  caption="实机演示：请点击页面右上角切换深浅色外观，查看图片自动无缝交替"
  width="560px"
/>
```

#### 实机渲染效果预览：

<VpImage
  light="/theme-demo-light.svg"
  dark="/theme-demo-dark.svg"
  alt="微服务分层拓扑图"
  caption="实机演示：请点击页面右上角切换深浅色外观，查看图片自动无缝交替（亦支持点击放大）"
  width="560px"
/>

---

## 3. 视频嵌入语法与实机效果

### 3.1 原生 HTML5 `<video>` 标签支持

由于 VitePress 会将 Markdown 编译为 Vue 模板，因此可直接在 Markdown 中嵌入原生 `<video>` 标签：

```html
<video src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" controls width="100%"></video>
```

Zenith 已在全局底层对正文所有原生 `<video>` 注入了自适应 12px 圆角、微细边框与柔和悬浮阴影，杜绝原生标签生硬裸露。

#### 实机渲染效果预览：

<video src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" controls style="max-width: 640px; margin: 16px auto; display: block;"></video>

---

### 3.2 交互短代码 `<VpVideo>`（本地与网络视频）

针对需要配置封面海报 (Poster)、控制宽高比与居中图注的场景，推荐使用免导入短代码 `<VpVideo>`：

```html
<VpVideo
  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  poster="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80"
  caption="实机运行：VpVideo 高质感视频组件（带封面海报、16:9 防抖动与居中图注）"
  width="80%"
/>
```

#### 实机渲染效果预览：

<VpVideo
  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  poster="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80"
  caption="实机运行：VpVideo 高质感视频组件（带封面海报、16:9 防抖动与居中图注）"
  width="80%"
/>

#### `<VpVideo>` 属性契约 (Props)

| 属性名 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `src` | `string` | **必填** | 视频地址（相对路径 `./assets/demo.mp4`、绝对路径 `/video.mp4` 或网络直链） |
| `poster` | `string` | `''` | 视频加载完成前的封面图地址 |
| `controls` | `boolean` | `true` | 是否展示浏览器原生播放控制条 |
| `autoplay` | `boolean` | `false` | 是否自动静音播放 |
| `loop` | `boolean` | `false` | 是否循环播放 |
| `muted` | `boolean` | `false` | 是否静音 |
| `aspectRatio` | `string` | `'16 / 9'` | 容器宽高比，防止视频载入时引发页面重排抖动 |
| `width` | `string` | `'100%'` | 自定义最大宽度（如 `'80%'`、`'720px'`） |
| `caption` | `string` | `''` | 底部展示的居中斜体说明图注 |

---

### 3.3 交互短代码 `<VpBilibili>`（B站国内视频流）

在中文技术文档中，B站是托管高清演示录屏的最佳平台之一。裸写官方嵌入代码往往存在高度固定导致移动端两侧黑边、弹幕遮挡代码等问题。

使用 `<VpBilibili>` 只需传入 BV 号，即可获得**16:9 响应式自适应、默认静音关闭弹幕防打扰**的沉浸体验：

```html
<VpBilibili
  bvid="BV1GJ411x7h7"
  caption="实机运行：B站视频嵌入实效（16:9 响应式、默认关闭弹幕防打扰）"
  width="80%"
/>
```

#### 实机渲染效果预览：

<VpBilibili
  bvid="BV1GJ411x7h7"
  caption="实机运行：B站视频嵌入实效（16:9 响应式、默认关闭弹幕防打扰）"
  width="80%"
/>

#### `<VpBilibili>` 属性契约 (Props)

| 属性名 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `bvid` | `string` | **必填** | 视频稿件 BV 号（例如 `'BV1GJ411x7h7'`） |
| `page` | `number` | `1` | 多 P 稿件的分 P 序号 |
| `danmaku` | `boolean` | `false` | 是否开启弹幕（技术文档默认关闭以保证阅读流） |
| `autoplay` | `boolean` | `false` | 是否自动播放 |
| `aspectRatio` | `string` | `'16 / 9'` | 自适应容器比例 |
| `caption` | `string` | `''` | 底部居中图注说明 |

---

### 3.4 交互短代码 `<VpYouTube>`（国际化视频流）

针对国际化开源项目，集成 YouTube 视频时采用官方 `youtube-nocookie.com` 隐私增强域名，保障读者合规体验：

```html
<VpYouTube
  id="dQw4w9WgXcQ"
  caption="实机运行：YouTube 隐私增强模式嵌入播放器（16:9 响应式）"
  width="80%"
/>
```

#### 实机渲染效果预览：

<VpYouTube
  id="dQw4w9WgXcQ"
  caption="实机运行：YouTube 隐私增强模式嵌入播放器（16:9 响应式）"
  width="80%"
/>

#### `<VpYouTube>` 属性契约 (Props)

| 属性名 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `id` | `string` | **必填** | YouTube 视频唯一 ID |
| `start` | `number` | `0` | 起始播放时间点（秒） |
| `autoplay` | `boolean` | `false` | 是否自动播放 |
| `aspectRatio` | `string` | `'16 / 9'` | 容器比例 |
| `caption` | `string` | `''` | 底部居中图注说明 |

---

## 4. 最佳实践总结与避坑要点

> [!CAUTION] **防范 Git 仓库体积膨胀**
> - **严禁将未压缩的庞大视频（如 >50MB 录屏）直接放入源码仓库**；持续提交大文件会导致 `git clone` 极度缓慢，极易触发 Git LFS 配额或代码托管平台限制；
> - 推荐使用 [HandBrake](https://handbrake.fr/) 等开源转码工具将演示录屏压缩为 H.264/WebM 格式，或优先将视频托管至 Bilibili、YouTube 或企业私有 OSS/S3 对象存储中。

> [!TIP] **图片压缩建议**
> 对于文档插图，推荐优先采用现代 **WebP** 或矢量 **SVG** 格式；对于截图标注图，单张体积建议控制在 500KB 以内，以保障移动端与弱网环境下的极速秒开体验。
