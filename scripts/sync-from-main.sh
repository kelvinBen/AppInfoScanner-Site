#!/usr/bin/env bash
# 从主仓库 AppInfoScanner 提取 update.md 生成 changelog 页面草稿（生成后需人工润色再提交）
# 用法：scripts/sync-from-main.sh [主仓库路径，默认 ../AppInfoScanner]
set -euo pipefail

MAIN_REPO="${1:-../AppInfoScanner}"
SRC="$MAIN_REPO/update.md"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DST="$ROOT/changelog/index.md.draft.md"

if [ ! -f "$SRC" ]; then
  echo "[!] 找不到 $SRC，请确认主仓库路径（当前默认：$MAIN_REPO）"
  exit 1
fi

{
  echo "# 更新日志"
  echo ""
  echo "完整版本历史，从新到旧。工具本体更新说明同步自主仓库 [update.md](https://github.com/kelvinBen/AppInfoScanner/blob/master/update.md)。"
  echo ""
  # 去掉语言切换行，其余原样保留（update.md 本身就是标准 markdown 版本段）
  grep -v '^\*\*语言/Language' "$SRC"
} > "$DST"

echo "[OK] 草稿已生成：$DST"
echo "     润色后覆盖 changelog/index.md（英文侧同步 en/changelog/index.md）"
