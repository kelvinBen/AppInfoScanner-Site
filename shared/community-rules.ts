// 社区规则补充数据源 —— 用户提交、经审核后合入。
// 提交方式见 /rules/ 页面「补充规则」一节（GitHub Issue 模板或直接 PR 本文件）。
// 合入长期有效的规则会随主程序发版固化进 default_config，并在下个版本同步回官方规则。

import type { RegexRuleSet } from './rules-data'

export interface CommunityRule {
  /** 规则集名，如 MyCompany_Token */
  name: string
  /** 正则（Python re 语法，与主程序一致） */
  patterns: string[]
  /** 说明：检测目标与依据（如官方文档链接） */
  note: string
  /** 提交人 GitHub ID */
  author: string
}

export const communityRules: CommunityRule[] = [
  // 示例格式（提交后由维护者整理到此处）:
  // {
  //   name: 'Volcengine_Token',
  //   patterns: [r'(?i)volc[_-]?engine[_-]?token["\']?\s*[:=]\s*["\'][0-9a-zA-Z]{20,}["\']'],
  //   note: '火山引擎访问令牌，格式参考官方 SDK 文档 https://... (示例，勿直接合入)',
  //   author: 'your-github-id',
  // },
]

/** 页面展示用：空则隐藏社区区 */
export const hasCommunityRules = (): boolean => communityRules.length > 0

export type { RegexRuleSet }
