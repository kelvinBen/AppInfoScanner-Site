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

文件反编译失败。

```text
请将错误截图以及对应的 APK 文件提交至
https://github.com/kelvinBen/AppInfoScanner/issues
作者看到后会及时进行处理
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
