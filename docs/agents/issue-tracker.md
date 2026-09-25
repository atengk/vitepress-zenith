# 任务追踪器：本地 Markdown

本代码仓库的所有需求（Issues）与技术规格（Specs）均以 Markdown 文件形式保存在 `.scratch/` 目录下。

## 规范约定

- **单个特性独立目录**：`.scratch/<特性标识-slug>/`
- **技术规格文件**：`.scratch/<特性标识-slug>/spec.md`
- **开发任务工单**：每个工单独立成文件，位于 `.scratch/<特性标识-slug>/issues/<NN>-<工单标识-slug>.md`，编号从 `01` 开始递增 —— 严禁合并为单一的大工单文件
- **分流状态记录**：在每个任务文件顶部使用 `Status:` 行标注状态（角色枚举见 [triage-labels.md](./triage-labels.md)）
- **评论与讨论记录**：追加在文件底部的 `## 评论与讨论 (Comments)` 标题下方

## 当技能提示“发布至任务追踪器 (publish to the issue tracker)”时

在 `.scratch/<特性标识-slug>/` 路径下创建对应文件（若目录不存在则自动创建）。

## 当技能提示“获取相关工单 (fetch the relevant ticket)”时

读取对应引用路径下的 Markdown 文件。用户通常会直接提供文件相对路径或工单编号。

## 探路与向导操作 (Wayfinding)

供 `/wayfinder` 技能使用。**路线图 (Map)** 文件与各工单的**子任务文件**一一关联：

- **全局路线图 (Map)**：`.scratch/<目标标识-effort>/map.md` —— 包含随手笔记 (Notes) / 既定决策 (Decisions-so-far) / 待探索迷雾 (Fog)。
- **子任务工单 (Child ticket)**：`.scratch/<目标标识-effort>/issues/<NN>-<标识-slug>.md`，自 `01` 开始编号，正文包含核心待解问题。通过 `Type:` 行标注任务类别（`research`/`prototype`/`grilling`/`task`）；通过 `Status:` 行标注工单状态（`claimed`/`resolved`）。
- **前置依赖阻塞 (Blocking)**：在文件顶部声明 `Blocked by: NN, NN`。仅当所列出的全部前置工单均转为 `resolved` 状态时，当前任务才算解除阻塞。
- **任务推进前沿 (Frontier)**：扫描 `.scratch/<目标标识-effort>/issues/` 中处于开放状态、未受阻塞且未被认领的文件；按编号顺序优先处理。
- **认领任务 (Claim)**：在开展任何实质工作前，先将工单状态标记为 `Status: claimed` 并保存。
- **解决任务 (Resolve)**：在工单底部追加 `## 解决方案 (Answer)` 标题及具体结论，更新为 `Status: resolved`，随后向 `map.md` 的既定决策 (Decisions-so-far) 中同步追加简述与链接引用。
