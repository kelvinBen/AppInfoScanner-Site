# AppInfoScanner 官网

[AppInfoScanner](https://github.com/kelvinBen/AppInfoScanner)（移动端 / Web 资产信息收集 CLI）的官方网站，基于 [VitePress](https://vitepress.dev/) 构建，中英双语，发布在 GitHub Pages：

> https://blog.52zhuanke.cn/AppInfoScanner-Site/
> （ kelvinben.github.io/AppInfoScanner-Site/ 会 301 跳转至此——用户站绑定的自定义域名）

## 本地开发

```bash
pnpm install     # 安装依赖（本仓库统一 pnpm，禁止 package-lock.json）
pnpm docs:dev    # 开发服务器 http://localhost:5173
pnpm docs:build  # 构建产物到 .vitepress/dist/
pnpm docs:preview # 本地预览构建产物 http://localhost:4173
```

## 目录速览

| 路径 | 说明 |
| --- | --- |
| `index.md` / `en/index.md` | 中 / 英落地页 |
| `guide/` / `en/guide/` | 使用指南（快速开始 / 平台 / 参数 / 配置 / 进阶） |
| `tools/` / `en/tools/` | 下载中心（数据源 `shared/tools.ts`，改数据即上新） |
| `changelog/` / `en/changelog/` | 更新日志（`scripts/sync-from-main.sh` 可从主仓库 update.md 生成草稿） |
| `shared/ads.ts` | 广告位数据源（自营「赞助商」样式；空配置零渲染） |
| `.vitepress/theme/` | 主题扩展：品牌色、AdSlot / ToolCard 组件 |
| `scripts/generate-brand.sh` | Qwen 图像生成品牌素材（需配置 `DASHSCOPE_API_KEY`） |

## 发布

`main` 分支推送即触发 `.github/workflows/deploy.yml` 自动构建并发布到 GitHub Pages。

## 内容同步约定

主仓库每次发版后，跟进同步站点 changelog（`scripts/sync-from-main.sh` 生成草稿再润色）；README 用法变更时同步 `guide/` 各页。

## 品牌素材

当前 `public/logo.svg` 为过渡版手绘标识。配置 `DASHSCOPE_API_KEY` 到项目根 `.env` 后执行 `scripts/generate-brand.sh`，用 Qwen 图像模型生成正式品牌稿（logo 多稿 / og 分享卡 / hero 装饰图），产物落 `public/brand-drafts/`，选定后替换 `public/logo.svg` 与 `og-card.png`。
