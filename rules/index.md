# 规则中心

AppInfoScanner 内置规则的全量浏览：凭据检测、PII、组件识别、加固特征、敏感权限、公共域名后缀等，与主程序 `default_config.py` 保持同步（由 `scripts/sync-rules.py` 生成，配置版本随主程序发布更新）。规则在扫描中的生效方式与自定义覆盖见[自定义规则](/guide/rules)。

<RuleCenter locale="zh" />

## 补充规则

规则中心欢迎补充新规则（新云厂商凭据、PII 类型、组件 / 加固特征、敏感权限等）。两种提交方式：

1. **Issue 提交（推荐）**：使用[规则补充模板](https://github.com/kelvinBen/AppInfoScanner-Site/issues/new?template=rule-submission.md)开一个 issue，填写规则类别、正则、说明与测试用例。
2. **直接 PR**：编辑站点仓库的 [`shared/community-rules.ts`](https://github.com/kelvinBen/AppInfoScanner-Site/blob/main/shared/community-rules.ts)，按文件内示例格式追加。

**规则要求**（审核标准）：

- 正则为 Python `re` 语法，与主程序一致；请给出**应命中 / 不应命中**两组测试串，避免误报。
- 凭据 / PII 类规则需说明依据（官方文档、公开格式规范或实测样本）。
- 组件 / 加固特征需给出组件包名（或二进制标记串）与风险说明，有 CVE 的附编号与安全版本。

审核合入后规则会显示在上方「社区补充规则」区；长期有效的规则将随主程序下个版本固化进内置配置，并在发版时同步回官方规则。
