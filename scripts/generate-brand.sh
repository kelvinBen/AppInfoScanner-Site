#!/usr/bin/env bash
# 品牌素材生成脚本 —— 使用 qianwen-image-generation 技能（Qwen 图像模型）
# 前置：在项目根目录 .env 中配置 DASHSCOPE_API_KEY
#   获取地址：https://platform.qianwenai.com/home/api-keys
#   echo 'DASHSCOPE_API_KEY=sk-xxxx' >> .env
# 产物落 public/brand-drafts/，选定后替换 public/logo.svg 与 public/og-card.png
set -euo pipefail

SKILL_SCRIPT="/Users/tom/.zcode/skills/qianwen-image-generation/scripts/image.py"
OUT_DIR="$(cd "$(dirname "$0")/.." && pwd)/public/brand-drafts"
MODEL="qwen-image-3.0-pro"   # 官方目录当前推荐的旗舰文生图模型；Token Plan Key 请按目录换用受支持型号

mkdir -p "$OUT_DIR"

# 非明文校验 Key：只判断存在性，不回显内容
if [ -z "${DASHSCOPE_API_KEY:-}" ] && ! grep -q '^DASHSCOPE_API_KEY=sk-' .env 2>/dev/null; then
  echo "[!] 未检测到 DASHSCOPE_API_KEY（环境变量或 .env 均未配置）"
  echo "    请到 https://platform.qianwenai.com/home/api-keys 获取后写入项目根 .env："
  echo "    echo 'DASHSCOPE_API_KEY=sk-your-key-here' >> .env"
  exit 1
fi

gen() { # gen <输出文件> <请求JSON>
  local out="$1" req="$2"
  echo "==> 生成 $out"
  python3 "$SKILL_SCRIPT" --model "$MODEL" --request "$req" --output "$OUT_DIR/$out" --print-response
}

# 1) Logo 图标 ×3 稿（扁平几何：盾牌 + 雷达扫描；纯图标不含文字）
LOGO_PROMPT='扁平化矢量风格应用图标，深色圆角方形背景 #0d1117，中心绿色 #2ee6a8 描线盾牌轮廓，盾牌内部有雷达扫描同心圆弧与一个发光圆点，极简几何设计，科技感，边缘干净利落，无文字，无水印，纯色背景，居中构图，适合作为网络安全工具软件 logo'
gen logo_1.png "{\"prompt\":\"$LOGO_PROMPT\",\"n\":1}"
gen logo_2.png "{\"prompt\":\"$LOGO_PROMPT，更粗的描线风格，色调更深的背景\",\"n\":1}"
gen logo_3.png "{\"prompt\":\"$LOGO_PROMPT，盾牌内改为放大镜与信号波纹组合\",\"n\":1}"

# 2) og 社交分享卡（含文字渲染）
gen og-card.png '{"prompt":"宽幅科技感横幅海报，深色背景 #0d1117，中央大号粗体英文标题 AppInfoScanner，下方一行小字 Mobile & Web Asset Recon CLI，左侧一个绿色 #2ee6a8 的盾牌与雷达扫描图形元素，点缀终端代码与数据流光点，简洁现代，对比清晰，无水印","n":1,"size":"1664*928"}'

# 3) 落地页 hero 装饰图
gen hero-bg.png '{"prompt":"深色科技感背景插画，雷达扫描波纹、盾牌轮廓、流动的数据线条与光点，绿色 #2ee6a8 与蓝色渐变点缀，画面留白充足，无文字，无水印，宽幅构图","n":1,"size":"1664*928"}'

echo ""
echo "[OK] 产物输出在 $OUT_DIR"
echo "     选定 logo 后：替换 public/logo.svg（可直接把 png 改名 logo.png 并更新 config.mts 的 logo 路径与 head favicon）"
echo "     选定 og 卡后：替换 public/og-card.png"
echo "     品牌主色如有变化，同步 .vitepress/theme/custom.css 的 --vp-c-brand-* 变量"
