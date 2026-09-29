# 常见问题

## 1. 信息检索垃圾数据过多？

```text
方法1：根据实际情况调整工作区 config.toml 中的规则信息
方法2：忽略资源文件（-n）
```

## 2. 出现错误：`Error: This application has shell, the retrieval results may not be accurate, Please remove the shell and try again!`

说明需要扫描的应用存在壳，需要进行脱壳 / 砸壳以后才能进行扫描。可以结合以下工具进行脱壳 / 砸壳处理：

```text
Android:
    xposed 模块： dexdump
    frida 模块： FRIDA-DEXDump
    无 Root 脱壳： blackdex
iOS:
    frida 模块：
        Windows 系统使用： frida-ipa-dump
        macOS 系统使用： frida-ios-dump
```

内置 `--unpack` 一键脱壳与脱壳产物修复见[壳检测与脱壳](/guide/unpack)与[fix_magic 魔数修复](/guide/fix-magic)。

## 3. 出现错误：`File download failed! Please download the file manually and try again.`

文件下载失败。

```text
1) 请检查输入的 URL 地址是否正确
2) 请检查网络是否存在问题，或者在工作区配置文件 config.toml 中配置
   请求头信息（headers）、请求报文体（data）、请求方法（method）保存后重新执行
```

## 4. 出现错误：`Decompilation failed, please submit error information at https://github.com/kelvinBen/AppInfoScanner/issues`

文件反编译失败。这是历史 issue 中出现频率最高的一类问题（[#14](https://github.com/kelvinBen/AppInfoScanner/issues/14) / [#22](https://github.com/kelvinBen/AppInfoScanner/issues/22) / [#37](https://github.com/kelvinBen/AppInfoScanner/issues/37) / [#39](https://github.com/kelvinBen/AppInfoScanner/issues/39) / [#50](https://github.com/kelvinBen/AppInfoScanner/issues/50) 等），按以下顺序排查：

```text
1) 确认 Java 版本为 11+（apktool 3.0.3 要求；老 issue 多为 Java 8 及以下导致）
2) V1.0.10 起已内置修复重试：反编译失败会先校验 EOCD 再修复 zip/dex/manifest
   魔数损坏（自动备份 .bak）并重试一次，多数魔数损坏场景已无需人工干预
3) 仍失败时，可先独立修复样本：python3 libs/core/fix_magic.py detect/fix <文件>
   （详见 fix_magic 指南），修复后的产物再重新扫描
4) 以上无效时，将错误截图与对应 APK 提交至
   https://github.com/kelvinBen/AppInfoScanner/issues
```

## 5. 运行环境有什么要求？

```text
Python : 3.11+（3.14 验证通过），依赖见 requirements.txt
Java   : apktool 3.0.3 需 Java 11+（README 早期「Java ≤ 1.8」的说法对应旧版 jar，已过时）
工具链 : Windows 使用仓库自带 tools/；macOS/Linux 缺失 Java/adb/frida 时自动安装
```

## 6. 用户工作区和扫描结果在哪里？

默认输出根为 `~/Documents/AppInfoScanner/`（`~/Documents` 不存在的精简 Linux 回退到 `~/AppInfoScanner/`），其中包含：

```text
config.toml   用户配置（首次运行生成）
out/          扫描结果（result/<样本名>_<时间戳>/ 三格式报告）
download/     自动下载的 APK/IPA/H5
history/      历史记录（始终跟随默认输出根，-o 不改变它）
logs/         运行日志（仅保留最新 20 个）
```

`-o` 参数只改变扫描结果目录。

## 7. 旧版的 config.py 怎么迁移？

首次运行时旧版工作区 `config.py` 会自动迁移为 `config.toml`（原文件保留为 `config.py.bak`）。V1.0.11 起配置为三层深度合并：内置默认 → 工作区 `config.toml` → 命令行参数，缺失键自动沿用默认值并带版本号跨版本自动迁移，详见[配置参考](/guide/config)。

## 8. 脱壳时提示 frida 版本不匹配？

python 侧 frida core 与设备端 frida-server **必须同版本**（当前锁定 17.18.0）。`--unpack` 会自动推送版本匹配的 frida-server 到设备，无需手动处理；若手动部署过 server，请确认版本一致。详见[壳检测与脱壳](/guide/unpack)。

## 9. CentOS 编译 Python 后装 pip 报 No module named '_ctypes'？

系统缺少 libffi 开发包：`yum install libffi-devel -y` 后回到 Python 源码目录重新 `make && make install`。完整步骤见[迁移文章](/articles/pip-ctypes-fix)。

## 10. 扫描卡在 `Searching for strings that match the rules` 不动了？

见 [#27](https://github.com/kelvinBen/AppInfoScanner/issues/27)。多为超大文件拖慢全量字符串扫描。V1.0.10 起已设上限保护：单文件超过 10 MB 自动跳过并提示 `[-] Skip large file`，单条字符串超 512 字符自动截断。如仍觉得慢，可用 `-t` 调大线程数，或用 `-r` 限定规则范围。

## 11. 脱壳后 dex 输出为空 / 扫描提取无结果？

见 [#42](https://github.com/kelvinBen/AppInfoScanner/issues/42) 与 [#44](https://github.com/kelvinBen/AppInfoScanner/issues/44)。脱壳产物常见头部损坏（魔数 / 文件大小 / 校验和被抹除），导致反编译或扫描拿不到结果。用自研修复模块处理后再扫描：

```bash
python3 libs/core/fix_magic.py detect <脱壳产物>   # 检测损坏项
python3 libs/core/fix_magic.py fix dex <文件>      # 修复 dex（zip/axml 同理）
```

修复后用 `--prefer-dump` 直接扫描已有脱壳产物，无需再次脱壳。详见[fix_magic 魔数修复](/guide/fix-magic)。

## 12. 安装 requirements.txt 或 frida 报错？

见 [#34](https://github.com/kelvinBen/AppInfoScanner/issues/34) 与 [#47](https://github.com/kelvinBen/AppInfoScanner/issues/47)。

```text
1) pip 加国内源: pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
2) frida 三件套为锁定版本（frida==17.18.0 / frida-tools==14.10.4 /
   frida-dexdump==2.0.1），不要混装其他版本，升级必须三件同批
3) Python 版本需 3.11+
```

## 13. macOS / Linux 能正常使用吗？

可以（[#1](https://github.com/kelvinBen/AppInfoScanner/issues/1)、[#24](https://github.com/kelvinBen/AppInfoScanner/issues/24)）。三个平台均受支持：Windows 使用仓库自带 `tools/` 工具链；macOS / Linux 缺失 Java、adb、frida 时会自动安装（brew / apt 等），iOS 解析所需的 `strings` 在 macOS / Linux 从 PATH 解析（macOS 已做节感知处理），Windows 使用自带 strings.exe。仅 `tools/unpacker/` 下的 adb.exe / aapt.exe 等 Windows 二进制为 Windows 专属，对应能力在 macOS / Linux 有等价实现。

## 14. 怎么批量扫描多个 APP 或目录？

见 [#16](https://github.com/kelvinBen/AppInfoScanner/issues/16) 与 [#10](https://github.com/kelvinBen/AppInfoScanner/issues/10)。`-i` 直接传目录即可目录级批量扫描，Android / iOS / Web 均支持，每个样本生成独立的分时间戳结果目录：

```bash
python app.py android -i /Work/APKs/
python app.py web -i /Work/sources/
```

## 15. 报 `adb: no devices/emulators found` 或 Windows 找不到 AdbWinApi.dll？

见 [#36](https://github.com/kelvinBen/AppInfoScanner/issues/36)、[#45](https://github.com/kelvinBen/AppInfoScanner/issues/45) 与 [#48](https://github.com/kelvinBen/AppInfoScanner/issues/48)。

```text
1) 普通扫描（URL/IP/组件/凭据提取）不需要连接设备，该报错只影响 --unpack 脱壳
2) 脱壳前确认: 手机开启 USB 调试并已授权、数据线可传数据、adb devices 能看到设备
3) Windows 下请使用仓库自带 tools/unpacker/adb.exe（依赖 DLL 在同目录），
   不要单独拷贝 adb.exe 到别处运行
```

## 16. 报错找不到 Bootstrapper 模块？

见 [#13](https://github.com/kelvinBen/AppInfoScanner/issues/13)。多为仓库克隆不完整或旧版本文件覆盖混装导致。完整重新克隆（或从[下载中心](/tools/)取完整源码包）后重跑即可。
