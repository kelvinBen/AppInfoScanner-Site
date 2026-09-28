# fix_magic 魔数修复

脱壳 / 砸壳产物经常出现 dex / zip / AndroidManifest 头部损坏（魔数被抹除、file_size 不符、adler32 / sha1 校验失败），导致反编译工具直接报错。`fix_magic` 是随仓库自带的独立修复模块，可检测并修复这些损坏。

## 独立运行

```bash
# 检测文件损坏情况（不改文件）
python3 libs/core/fix_magic.py detect <文件>

# 修复 dex
python3 libs/core/fix_magic.py fix dex <文件>

# 修复 zip（APK）
python3 libs/core/fix_magic.py fix zip <文件>

# 修复 AndroidManifest（axml；xml 是 axml 的别名）
python3 libs/core/fix_magic.py fix axml <文件>
```

## 典型场景

1. `__decode_apk__` 反编译失败时，内置流程会自动走修复重试：`__repair_apk__` 先做 EOCD 校验（确认是 zip 才修魔数，防污染任意文件），内部 dex / manifest 损坏则提取修复后整包重写，`.bak` 备份，仅重试一次。
2. 外部脱壳产物（FRIDA-DEXDump / blackdex 等的输出）无法反编译时，先 `detect` 再 `fix dex`，回到主程序用 `--prefer-dump` 扫描。

## 格式细节

模块头部注释记录了各格式的偏移量语义：dex 的 magic / file_size / adler32 校验和 / sha1 签名偏移，zip 的 EOCD 定位逻辑，axml 的魔数与大小字段。实测 apktool 3.0.3 对魔数抹除有容忍（按 EOCD 定位），魔数损坏往往无需修复即可成功；修复以检测结论为准。
