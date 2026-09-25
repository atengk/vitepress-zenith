# 06 — 全局免导入交互短代码组件库

**目标行为 (What to build):**
全局注册一组高质感、高复用度的交互短代码组件：`<VpCard>`、`<VpCardGrid>`（卡片矩阵）、`<VpTimeline>`、`<VpTimelineItem>`（版本时间轴）、`<VpBadge>`（状态胶囊）、`<VpLinkCard>`（精美外链导航）与 `<VpDemoPreview>`（交互运行态沙箱与源码折叠），写作者在任何 Markdown 中直接书写标签即可生效。

**前置依赖 (Blocked by):**
01 — 工程底座与全能 Landing Page 骨架
02 — 沉浸式专注阅读模式与阅读进度条

**状态 (Status):**
ready-for-agent

- [ ] 实现 `<VpCard>` 与 `<VpCardGrid>` 组件，具备悬浮微光、渐变边框与图标插槽
- [ ] 实现 `<VpTimeline>` 与 `<VpTimelineItem>` 组件，支持清晰展示版本发布与项目里程碑
- [ ] 实现 `<VpBadge>` 与 `<VpLinkCard>` 组件，支持多种语义色与外链图标跳转
- [ ] 实现 `<VpDemoPreview>` 组件，在同一卡片中同时展示组件的实时交互运行态与底层源码折叠查看
- [ ] 在主题入口中全局自动注册上述全部组件，编写完整的组件使用与排版示例
