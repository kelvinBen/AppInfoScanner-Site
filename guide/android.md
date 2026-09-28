# Android 扫描

`android` 类型用于扫描 Android 应用相关文件的内容，支持本地 APK、DEX、目录批量，以及 APK 下载地址的自动下载扫描。

## 基本用法

- 对本地 APK 文件进行扫描

```bash
python app.py android -i <Your apk file>

# 例：
python app.py android -i C:\Users\Administrator\Desktop\Demo.apk
```

- 对本地 DEX 文件进行扫描

```bash
python app.py android -i <Your DEX file>

# 例：
python app.py android -i C:\Users\Administrator\Desktop\Demo.dex
```

- 对 URL 地址中包含的 APK 文件进行扫描（URL 过长时用双引号包裹）

```bash
python app.py android -i <APK Download Url>

# 例：
python app.py android -i "https://127.0.0.1/Demo.apk"
```

- 对一个本地目录进行批量扫描

```bash
python app.py android -i <Your Dir>

# 例：
python app.py android -i C:\Users\Administrator\Desktop\Demo
```

## Android 专属参数

| 参数 | 说明 |
| --- | --- |
| `-p, --package <包名>` | 只扫描指定 JAVA 包名下的内容，如 `-p "com.baidu"` |
| `--unpack` | 显式开启脱壳（检测到加固后推送 frida-server 到设备），默认仅提示不动设备，防止破坏渗透现场。见[壳检测与脱壳](/guide/unpack) |
| `--prefer-dump <目录>` | 直接扫描已有脱壳产物目录，不碰设备 |

## 常用组合示例

```bash
# 添加临时规则：追加对百度域名的扫描
python app.py android -i Demo.apk -r ".*baidu.com.*"

# 忽略所有资源文件，减少垃圾数据
python app.py android -i Demo.apk -n

# 开启详细输出（逐条显示命中内容）
python app.py android -i Demo.apk -a

# 设置 20 个并发线程
python app.py android -i Demo.apk -t 20

# 指定结果集与缓存文件输出目录
python app.py android -i Demo.apk -o C:\Users\Administrator\Desktop\Temp

# 过滤 com.baidu 包名下的内容
python app.py android -i Demo.apk -p "com.baidu"
```

更多通用参数（`-r` / `-n` / `-a` / `-t` / `-o` / 嗅探开关等）见[命令行参数](/guide/cli)。
