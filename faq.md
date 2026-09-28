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
