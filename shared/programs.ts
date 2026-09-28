// 主程序下载数据源：当前版本 + 历史版本。
// 下载指向 codeload/Gitee 归档（tag 必须存在于主仓库远程，当前有 V1.0.5~V1.0.11 七个 tag）。
// 未来工具链 Release 化后，把 url 换成 Release 资产地址即可，页面零改动。

export interface ProgramRelease {
  /** 展示版本号，如 V1.0.11 */
  version: string
  /** 主仓库远程 tag 名 */
  tag: string
  /** 发布日期 YYYY-MM-DD */
  date: string
  /** 中文要点（一行） */
  zh: string
  /** 英文要点（一行） */
  en: string
  /** GitHub 源码包（codeload tag 归档） */
  url: string
  /** 国内镜像（Gitee tag 归档） */
  mirror?: string
}

const REPO = 'https://github.com/kelvinBen/AppInfoScanner'
const GITEE = 'https://gitee.com/kelvin_ben/AppInfoScanner'

const ghZip = (tag: string) => `${REPO}/archive/refs/tags/${tag}.zip`
const giteeZip = (tag: string) => `${GITEE}/repository/archive/${tag}.zip`

/** 最新开发版（master 分支归档，随主仓库推进） */
export const masterZipUrl = `${REPO}/archive/refs/heads/master.zip`
export const cloneCmd = 'git clone https://github.com/kelvinBen/AppInfoScanner.git'
export const cloneCmdMirror = `git clone ${GITEE}.git`

/** 当前版本 */
export const currentProgram: ProgramRelease = {
  version: 'V1.0.11',
  tag: 'V1.0.11_Releases',
  date: '2026-09-26',
  zh: '实战反馈九项修复、规则库扩充至 421 条、config.toml 三层深度合并与自动更新机制。',
  en: 'Nine field-feedback fixes, rule sets expanded to 421, 3-tier config merge and auto-update.',
  url: ghZip('V1.0.11_Releases'),
  mirror: giteeZip('V1.0.11_Releases'),
}

/** 历史版本（含当前版，新版本发布时在此数组头部插入即可） */
export const historyPrograms: ProgramRelease[] = [
  currentProgram,
  {
    version: 'V1.0.10',
    tag: 'V1.0.10_Releases',
    date: '2026-09-20',
    zh: '核心功能安全加固、单元测试套件（80 项）、fix_magic 修复模块、文档与 GPL-3.0 许可证。',
    en: 'Core security hardening, unit test suite (80 tests), fix_magic repair module, docs & GPL-3.0.',
    url: ghZip('V1.0.10_Releases'),
    mirror: giteeZip('V1.0.10_Releases'),
  },
  {
    version: 'V1.0.9',
    tag: 'V1.0.9_Releases',
    date: '2022-10-23',
    zh: 'apktool 升级至最新版本，反编译兼容性修复。',
    en: 'apktool upgraded to the latest version with decompile compatibility fixes.',
    url: ghZip('V1.0.9_Releases'),
    mirror: giteeZip('V1.0.9_Releases'),
  },
  {
    version: 'V1.0.8',
    tag: 'V1.0.8_Releases',
    date: '2021-08-08',
    zh: '新增 AK/SK 云凭据检测。',
    en: 'AK/SK cloud credential detection added.',
    url: ghZip('V1.0.8_Releases'),
    mirror: giteeZip('V1.0.8_Releases'),
  },
  {
    version: 'V1.0.7',
    tag: 'V1.0.7_Releases',
    date: '2020-12-09',
    zh: '新增文件自动下载（APK / 非 AppStore IPA / H5 页面缓存）。',
    en: 'Auto-download added (APK / non-AppStore IPA / H5 page caching).',
    url: ghZip('V1.0.7_Releases'),
    mirror: giteeZip('V1.0.7_Releases'),
  },
  {
    version: 'V1.0.6',
    tag: 'V1.0.6_Releases',
    date: '2020-11-16',
    zh: '新增 AI 智能分析快速过滤第三方 URL 地址。',
    en: 'AI-assisted third-party URL filtering added.',
    url: ghZip('V1.0.6_Releases'),
    mirror: giteeZip('V1.0.6_Releases'),
  },
  {
    version: 'V1.0.5',
    tag: 'V1.0.5_Releases',
    date: '2020-11-11',
    zh: '新增 DOM / SAX / DOM4J / JDOM 等 XML 解析组件识别。',
    en: 'XML parser detection added (DOM / SAX / DOM4J / JDOM).',
    url: ghZip('V1.0.5_Releases'),
    mirror: giteeZip('V1.0.5_Releases'),
  },
]
