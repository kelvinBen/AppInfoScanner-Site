// 广告位数据源：自营「赞助商/合作伙伴」样式（图片 + 跳转链接）。
// 当前为空配置 —— AdSlot 对空配置零渲染、无布局占位；售出后按下方格式追加即可上线。
// 图片放 public/ads/ 下；placement 对应页面投放位。
// 注意：github.io 免费托管对广告联盟类重商业内容有限制，请保持自营样式；
//       日后接广告联盟或商业化加重时，建议绑自定义域名或迁移托管。

export type AdPlacement = 'tools-top' | 'tools-mid' | 'site-footer'

export interface AdItem {
  id: string
  /** 广告图（public 内路径，如 /ads/sponsor-foo.png） */
  image: string
  /** 跳转链接 */
  link: string
  /** 可选标题（图片加载失败时的替代文案） */
  title?: string
  /** 投放位 */
  placement: AdPlacement
  /** 启用开关 */
  enabled: boolean
}

export const ads: AdItem[] = [
  // 示例（复制后取消注释并替换）：
  // {
  //   id: 'sponsor-foo',
  //   image: '/ads/sponsor-foo.png',
  //   link: 'https://example.com',
  //   title: 'Foo 赞助商',
  //   placement: 'tools-top',
  //   enabled: true,
  // },
]
