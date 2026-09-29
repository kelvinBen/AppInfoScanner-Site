import { defineConfig } from 'vitepress'

// 站点唯一事实源：GitHub Pages 项目页，仓库名变更时只需改这里
const BASE = '/AppInfoScanner-Site/'
const SITE_URL = 'https://blog.52zhuanke.cn/AppInfoScanner-Site/'
const REPO_URL = 'https://github.com/kelvinBen/AppInfoScanner'

export default defineConfig({
  base: BASE,
  sitemap: { hostname: SITE_URL },
  lang: 'zh-CN',
  title: 'AppInfoScanner',
  description: '移动端 / Web 资产信息收集 CLI（红队 / 渗透测试场景）',
  head: [
    ['link', { rel: 'icon', type: 'image/png', sizes: '512x512', href: BASE + 'logo.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: BASE + 'favicon-32.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: BASE + 'apple-touch-icon.png' }],
    ['meta', { property: 'og:site_name', content: 'AppInfoScanner' }],
    ['meta', { property: 'og:title', content: 'AppInfoScanner' }],
    ['meta', { property: 'og:description', content: '移动端 / Web 资产信息收集 CLI（红队 / 渗透测试场景）' }],
    ['meta', { property: 'og:image', content: SITE_URL + 'og-card.png' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: SITE_URL }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  ],
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      themeConfig: {
        nav: [
          { text: '使用指南', link: '/guide/quickstart', activeMatch: '/guide/' },
          { text: '下载中心', link: '/tools/', activeMatch: '/tools/' },
          { text: '规则中心', link: '/rules/', activeMatch: '/rules/' },
          { text: '更新日志', link: '/changelog/', activeMatch: '/changelog/' },
          { text: '常见问题', link: '/faq' },
          { text: '技术文章', link: '/articles/', activeMatch: '/articles/' },
          { text: '关于', link: '/about' },
          { text: '赞助', link: '/sponsor/', activeMatch: '/sponsor/' },
        ],
        sidebar: {
          '/guide/': [
            {
              text: '开始',
              items: [{ text: '快速开始', link: '/guide/quickstart' }],
            },
            {
              text: '平台指南',
              items: [
                { text: 'Android 扫描', link: '/guide/android' },
                { text: 'iOS 扫描', link: '/guide/ios' },
                { text: 'Web / H5 扫描', link: '/guide/web' },
              ],
            },
            {
              text: '参考',
              items: [
                { text: '命令行参数', link: '/guide/cli' },
                { text: '配置参考', link: '/guide/config' },
              ],
            },
            {
              text: '进阶',
              items: [
                { text: '壳检测与脱壳', link: '/guide/unpack' },
                { text: '网络嗅探', link: '/guide/sniffer' },
                { text: '自定义规则', link: '/guide/rules' },
                { text: 'fix_magic 魔数修复', link: '/guide/fix-magic' },
              ],
            },
          ],
          '/tools/': [{ text: '下载中心', items: [{ text: '工具下载', link: '/tools/' }] }],
          '/rules/': [{ text: '规则中心', items: [{ text: '内置规则浏览', link: '/rules/' }, { text: '补充规则', link: '/rules/#补充规则' }] }],
          '/changelog/': [{ text: '更新日志', items: [{ text: '版本历史', link: '/changelog/' }] }],
          '/sponsor/': [{ text: '赞助', items: [{ text: '赞助与捐赠', link: '/sponsor/' }] }],
          '/articles/': [
            {
              text: '技术文章',
              items: [
                { text: '文章索引', link: '/articles/' },
                { text: 'IDA 调试 Dalvik 指令', link: '/articles/ida-dalvik-debug' },
                { text: 'IDA 调试 SO 文件', link: '/articles/ida-so-debug' },
                { text: 'IDA 启动闪退排查', link: '/articles/ida-crash-fix' },
                { text: 'pip 报错 _ctypes 修复', link: '/articles/pip-ctypes-fix' },
              ],
            },
          ],
        },
        outline: { level: [2, 3], label: '本页目录' },
        docFooter: { prev: '上一篇', next: '下一篇' },
        darkModeSwitchLabel: '主题',
        lightModeSwitchTitle: '切换到浅色',
        darkModeSwitchTitle: '切换到深色',
        sidebarMenuLabel: '菜单',
        returnToTopLabel: '回到顶部',
      },
    },
    en: {
      label: 'English',
      lang: 'en-US',
      title: 'AppInfoScanner',
      description: 'Mobile & Web asset reconnaissance CLI (red team / pentest)',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/en/guide/quickstart', activeMatch: '/en/guide/' },
          { text: 'Downloads', link: '/en/tools/', activeMatch: '/en/tools/' },
          { text: 'Rule Center', link: '/en/rules/', activeMatch: '/en/rules/' },
          { text: 'Changelog', link: '/en/changelog/', activeMatch: '/en/changelog/' },
          { text: 'FAQ', link: '/en/faq' },
          { text: 'Articles', link: '/en/articles/', activeMatch: '/en/articles/' },
          { text: 'About', link: '/en/about' },
          { text: 'Sponsor', link: '/en/sponsor/', activeMatch: '/en/sponsor/' },
        ],
        sidebar: {
          '/en/guide/': [
            {
              text: 'Getting Started',
              items: [{ text: 'Quick Start', link: '/en/guide/quickstart' }],
            },
            {
              text: 'Platform Guides',
              items: [
                { text: 'Android Scanning', link: '/en/guide/android' },
                { text: 'iOS Scanning', link: '/en/guide/ios' },
                { text: 'Web / H5 Scanning', link: '/en/guide/web' },
              ],
            },
            {
              text: 'Reference',
              items: [
                { text: 'CLI Reference', link: '/en/guide/cli' },
                { text: 'Configuration', link: '/en/guide/config' },
              ],
            },
            {
              text: 'Advanced',
              items: [
                { text: 'Shell Detection & Unpacking', link: '/en/guide/unpack' },
                { text: 'Network Sniffing', link: '/en/guide/sniffer' },
                { text: 'Custom Rules', link: '/en/guide/rules' },
                { text: 'fix_magic Repair', link: '/en/guide/fix-magic' },
              ],
            },
          ],
          '/en/tools/': [{ text: 'Downloads', items: [{ text: 'Tool Downloads', link: '/en/tools/' }] }],
          '/en/rules/': [{ text: 'Rule Center', items: [{ text: 'Built-in Rules', link: '/en/rules/' }, { text: 'Contributing Rules', link: '/en/rules/#contributing-rules' }] }],
          '/en/changelog/': [{ text: 'Changelog', items: [{ text: 'Version History', link: '/en/changelog/' }] }],
          '/en/sponsor/': [{ text: 'Sponsor', items: [{ text: 'Sponsor & Donate', link: '/en/sponsor/' }] }],
          '/en/articles/': [
            {
              text: 'Articles',
              items: [
                { text: 'Index', link: '/en/articles/' },
                { text: 'IDA: Dalvik Debugging', link: '/articles/ida-dalvik-debug' },
                { text: 'IDA: SO Debugging', link: '/articles/ida-so-debug' },
                { text: 'IDA: Startup Crash Fix', link: '/articles/ida-crash-fix' },
                { text: 'pip _ctypes Fix', link: '/articles/pip-ctypes-fix' },
              ],
            },
          ],
        },
        outline: { level: [2, 3], label: 'On this page' },
      },
    },
  },
  themeConfig: {
    logo: '/logo.png',
    siteTitle: 'AppInfoScanner',
    socialLinks: [{ icon: 'github', link: REPO_URL }],
    externalLinkIcon: true,
    footer: {
      message: 'Released under the GPL-3.0 License. 仅限授权渗透测试 / 红队场景使用 / Authorized pentest use only.',
      copyright: 'Copyright © 2021-present kelvinBen · AppInfoScanner',
      links: [
        { text: '友情链接 · 404StarLink 2.0 - Galaxy', link: 'https://github.com/knownsec/404StarLink2.0-Galaxy' },
      ],
    },
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                displayDetails: '显示明细',
                footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' },
              },
            },
          },
          en: {
            translations: {
              button: { buttonText: 'Search', buttonAriaLabel: 'Search' },
              modal: {
                noResultsText: 'No results found',
                resetButtonTitle: 'Reset query',
                footer: { selectText: 'Select', navigateText: 'Navigate', closeText: 'Close' },
              },
            },
          },
        },
      },
    },
  },
})
