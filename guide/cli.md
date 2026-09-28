# 命令行参数

## 基本命令格式

```bash
python app.py [TYPE] [OPTIONS] <扫描的文件或目录或URL地址>
```

## 符号说明

| 符号 | 含义 |
| --- | --- |
| `<>` | 需要扫描的文件、目录或 URL 地址 |
| `\|` | 或的关系，只能选择一个 |
| `[]` | 需要输入的参数 |

## TYPE 参数

对应基本命令格式中的 `[TYPE]`，目前支持 `android` / `ios` / `web` 三种类型，必须指定其一。

| TYPE | 用途 |
| --- | --- |
| `android` | 扫描 Android 应用相关的文件内容 |
| `ios` | 扫描 iOS 应用相关的文件内容 |
| `web` | 扫描 WEB 站点或 H5 相关的文件内容 |

支持根据后缀名称自动修正：即便输入的是 `ios`，若 `-i` 输入的文件名为 `XXX.apk`，则会执行 android 相关的扫描。

## OPTIONS 参数

支持多个参数组合使用。

| 参数 | 说明 |
| --- | --- |
| `-i, --inputs` | 输入需要扫描的文件、目录或需要自动下载的文件 URL 地址，路径过长时请用双引号包裹。**必填** |
| `-r, --rules` | 输入需要扫描文件内容的临时扫描规则 |
| `--sniffer / --no-sniffer` | 开启 / 关闭网络嗅探，默认为**关闭**。红队场景下建议配合 `--scope` 使用 |
| `--scope` | 指定授权域名清单文件路径（每行一个域名或后缀），仅对名单内域名发起嗅探 |
| `--unpack` | 显式开启脱壳（检测到加固后推送 frida-server 到设备），默认仅提示不动设备。仅 `android` 可用 |
| `--prefer-dump` | 指定已有脱壳产物目录直接扫描，不碰设备。仅 `android` 可用 |
| `-n, --no-resource` | 忽略所有的资源文件，包含网络嗅探功能中的资源文件（需先在工作区 `config.toml` 中配置 `sniffer_filter` 相关规则），默认为不忽略 |
| `-a, --all` | 逐条输出命中的内容（详细模式），默认仅输出汇总 |
| `-t, --threads` | 设置线程并发数量，默认 10 |
| `-o, --output` | 指定扫描结果与临时文件的输出目录，默认为用户文档目录下的 AppInfoScanner 目录，日志文件也跟随此目录 |
| `-p, --package` | 指定 Android 的 APK / DEX 文件需要扫描的 JAVA 包名。仅 `android` 可用 |

## update 子命令

```bash
python app.py update --check    # 仅检测新版本，显示当前/最新版本号
python app.py update            # 执行更新（从 GitHub Release 下载 / MD5 校验 / 自动替换）
python app.py update --tools    # 检查工具链版本（apktool/baksmali）
```
