# 快速开始

## 环境要求

- Python 3.11+ 运行环境（3.14 验证通过）
- 依赖工具链及版本（缺失时 macOS/Linux 自动安装，Windows 使用仓库自带二进制或手动安装）：

| 工具 | 版本 | 获取方式 |
| --- | --- | --- |
| Java | 11+（Zulu 11 验证） | Windows 手动安装；macOS/Linux 经 brew/apt 等自动安装 |
| adb | platform-tools 当前版 | Windows 随仓库 tools/unpacker；macOS/Linux 触发脱壳时自动安装 |
| frida | 17.18.0 | pip 安装，与设备端 frida-server 版本保持一致 |
| frida-tools | 14.10.4 | pip 安装 |
| frida-dexdump | 2.0.1 | pip 安装 |
| apktool | 3.0.3 | 随仓库 tools/apktool.jar，工作区自动部署 |
| baksmali | 2.5.2-dev | 随仓库 tools/baksmali.jar |
| smali | 3.0.9-dev | apktool 内置（重建 dex 时使用） |

## 安装

1. 下载

```bash
git clone https://github.com/kelvinBen/AppInfoScanner.git

# 或者复制以下链接到浏览器下载最新正式版本
# https://github.com/kelvinBen/AppInfoScanner/releases/latest

# 国内快速下载通道
git clone https://gitee.com/kelvin_ben/AppInfoScanner.git
```

2. 安装依赖库

```bash
cd AppInfoScanner
python -m pip install -r requirements.txt
```

## 运行

- 扫描 Android 应用的 APK 文件、DEX 文件、需要下载的 APK 文件下载地址、保存需要扫描的文件的目录

```bash
python app.py android -i <APK/DEX 文件或下载地址或目录>
```

- 扫描 iOS 应用的 IPA 文件、Mach-O 文件、需要下载的 IPA 文件下载地址、保存需要扫描的文件目录

```bash
python app.py ios -i <IPA/Mach-O 文件或下载地址或目录>
```

- 扫描 Web 站点的文件、目录、需要缓存的站点 URL

```bash
python app.py web -i <站点文件或目录或URL地址>
```

首次运行时会自动在用户文档目录下创建工作区（`~/Documents/AppInfoScanner/`），部署带中文注释的 `config.toml` 与工具链，之后直接编辑该文件即可自定义规则，下次运行生效。

## 下一步

- [Android 扫描](/guide/android) / [iOS 扫描](/guide/ios) / [Web / H5 扫描](/guide/web)
- [命令行参数](/guide/cli) 全量参考
- [配置参考](/guide/config)：config.toml 规则自定义
- 进阶：[壳检测与脱壳](/guide/unpack)、[网络嗅探](/guide/sniffer)、[fix_magic 魔数修复](/guide/fix-magic)
