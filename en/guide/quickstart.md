# Quick Start

## Requirements

- Python 3.11+ runtime (3.14 verified)
- Toolchain and versions (auto-install on macOS/Linux, bundled or manual on Windows):

| Tool | Version | How to get |
| --- | --- | --- |
| Java | 11+ (Zulu 11 verified) | Manual on Windows; auto via brew/apt on macOS/Linux |
| adb | platform-tools current | Bundled in tools/unpacker on Windows; auto-install on macOS/Linux when unpacking |
| frida | 17.18.0 | pip install, must match device frida-server version |
| frida-tools | 14.10.4 | pip install |
| frida-dexdump | 2.0.1 | pip install |
| apktool | 3.0.3 | Bundled tools/apktool.jar, auto-deployed to workspace |
| baksmali | 2.5.2-dev | Bundled tools/baksmali.jar |
| smali | 3.0.9-dev | Built into apktool (for dex rebuilding) |

## Installation

1. Download

```bash
git clone https://github.com/kelvinBen/AppInfoScanner.git

# Or copy this link to your browser to download the latest release:
# https://github.com/kelvinBen/AppInfoScanner/releases/latest

# Fast download in China:
git clone https://gitee.com/kelvin_ben/AppInfoScanner.git
```

2. Install dependencies

```bash
cd AppInfoScanner
python -m pip install -r requirements.txt
```

## Run

- Scan Android APK files, DEX files, APK download URLs, or directories

```bash
python app.py android -i <APK/DEX file or download URL or directory>
```

- Scan iOS IPA files, Mach-O files, IPA download URLs, or directories

```bash
python app.py ios -i <IPA/Mach-O file or download URL or directory>
```

- Scan Web site files, directories, or URLs to cache

```bash
python app.py web -i <site file or directory or URL>
```

On first run, a workspace is created automatically under your user documents folder (`~/Documents/AppInfoScanner/`), deploying a commented `config.toml` and the toolchain. Edit that file to customize rules; changes take effect on the next run.

## Next Steps

- [Android Scanning](/en/guide/android) / [iOS Scanning](/en/guide/ios) / [Web / H5 Scanning](/en/guide/web)
- Full [CLI Reference](/en/guide/cli)
- [Configuration](/en/guide/config): config.toml rule customization
- Advanced: [Shell Detection & Unpacking](/en/guide/unpack), [Network Sniffing](/en/guide/sniffer), [fix_magic Repair](/en/guide/fix-magic)
