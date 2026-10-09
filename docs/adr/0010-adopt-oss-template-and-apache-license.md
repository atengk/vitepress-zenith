# 接入 OSS-Template 工程底座与升级为 Apache-2.0 协议

为了提升 VitePress Zenith 作为开源矩阵模板的工程交付可靠性与协作规范，我们决定全量接入 atengk/oss-template 通用开源底座，并将开源许可证由 MIT 升级为 Apache-2.0。

## 决策背景

VitePress Zenith 原工程仅具备基础的 GitHub Pages 部署脚本（deploy.yml），缺乏严谨的自动化 CI 检查（类型检查、生产编译）、自动化 Release 发布与语义化更新日志生成能力。同时，为强化代码分发中的专利授权保护并与 oss-template 体系无缝对齐，项目原有的 MIT 许可证需要升级。

## 决策内容

1. **工程化底座注入**：全量移植 oss-template 的 CI 流水线（TypeScript 类型检查与生产编译门禁）、Release 自动化发版流（集成 git-cliff 语义化日志生成与 GitHub Release 挂载）、交互式提交助手（scripts/commit.sh）与全生命周期发版防呆自检（scripts/release.sh）。
2. **许可证升级**：将代码库许可证由 MIT 升级为 Apache-2.0，明晰贡献者专利授权与衍生分发限制。
3. **技术栈与包管理深度绑定**：流水线全面适配 pnpm 工具链，通过 `pnpm install --frozen-lockfile` 保证确定性构建。

## 备选方案

- **方案 A（保持 MIT 协议）**：虽具备更高的随意使用度，但缺乏显式的专利授权与商标约束，且与 oss-template 核心规范不一致。
- **方案 B（仅手工打 Tag 与 GitHub 默认 Release）**：依赖人肉保障，容易出现脏工作区发版或遗留类型报错的问题，不具备可重复交付保证。

## 影响与后果

- **正面**：发版具备 5 大前置自检（未提交文件、远端同步、分支状态、构建状态与版本合规性），消除劣质版本发布风险；Release Notes 自动按 feat/fix 分类呈现。
- **成本**：下游使用者在二次分发时需保留 Apache-2.0 许可证声明。
