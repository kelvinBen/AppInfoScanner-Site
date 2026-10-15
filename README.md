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
| `articles/releases/` | 版本说明系列：每个版本一篇更新说明，与 changelog 单源镜像，**发版时同步补一篇**（新文章结构对齐现有版本页：frontmatter + 日期/下载/导航头 + changelog 该版本段 + 前后版本导航尾） |
| `articles/usage/` | 各版本使用方法系列：每版一篇**发布当时**的官方用法手册，内容为新 tag 上 README 使用章节切片（`git show <tag>:README.md` 取「环境说明」→「联系作者」前，剔除截图外链，2020 年原文需 perl 字节级清零宽字符）；与 releases 对应篇双向互链，**发版时同步补一篇** |
| `shared/ads.ts` | 广告位数据源（自营「赞助商」样式；空配置零渲染） |
| `.vitepress/theme/` | 主题扩展：品牌色、AdSlot / ToolCard 组件 |
| `scripts/generate-brand.sh` | Qwen 图像生成品牌素材（需配置 `DASHSCOPE_API_KEY`） |

## 发布

`main` 分支推送即触发 `.github/workflows/deploy.yml` 自动构建并发布到 GitHub Pages。

## 内容同步约定

主仓库每次发版后，站点同步三件事（2026-10-15 定稿约定）：

1. **changelog 补段**：中英双语（中文源自主仓 `update.md`，英文源自主仓 `update_EN.md`，均从新 tag 提取；`scripts/sync-from-main.sh` 可生成草稿再润色）；
2. **releases 补一篇**：`articles/releases/<版本>.md`，结构对齐现有版本页，changelog 该版本段即正文；
3. **usage 补一篇**：`articles/usage/<版本>.md`，从新 tag 的 README 切「环境说明 → 联系作者前」使用章节，头部互链 releases 对应篇。

另外：`shared/programs.ts` 当前版前移（tag 归档 + Gitee 镜像链接 + DATES 登记日期）；主仓库 README 用法变更时同步站点 `guide/` 各页。

## 品牌素材

正式品牌稿已定稿（Qwen 图像生成，2026-09-28）：logo 采用盾牌+雷达粗描线稿（备选稿存 `brand-drafts/`，仅入库不部署），`public/` 下 `logo.png` / `favicon-32.png` / `favicon-512.png` / `apple-touch-icon.png` / `og-card.png` 均由定稿切出。logo 为 RGBA PNG（圆角外透明）；换稿时改 `scripts/generate-brand.sh` 的 prompt 重新生成，再跑 `python3 scripts/process-logo.py <源图>` 完成透明化与切图。特性卡图标在 `public/icons/`（light/dark 双套手绘 SVG）。
