# iOS 扫描

`ios` 类型用于扫描 iOS 应用相关文件的内容，支持本地 IPA、Mach-O、目录批量，以及 IPA 下载地址的自动下载扫描（暂不支持 App Store 的 IPA）。

## 基本用法

- 对本地 IPA 文件进行扫描

```bash
python app.py ios -i <Your ipa file>

# 例：
python app.py ios -i "C:\Users\Administrator\Desktop\Demo.ipa"
```

- 对本地 Mach-O 文件进行扫描

```bash
python app.py ios -i <Your Mach-O file>

# 例：
python app.py ios -i "C:\Users\Administrator\Desktop\Demo\Payload\Demo.app\Demo"
```

- 对 URL 地址中包含的 IPA 文件进行扫描（URL 过长时用双引号包裹）

```bash
python app.py ios -i <IPA Download Url>

# 例：
python app.py ios -i "https://127.0.0.1/Demo.ipa"
```

- 对一个本地目录进行批量扫描

```bash
python app.py ios -i <Your Dir>
```

## 说明

- 暂时不支持对 App Store 中的 IPA 文件进行扫描，需先砸壳后再扫描。
- 加壳 / 砸壳指引见[壳检测与脱壳](/guide/unpack)。
- iOS 路径会基于 `strings` 全量提取 Mach-O 字符串后做组件 / 权限 / 凭据匹配，macOS 下已针对 `strings` 节感知问题做了 stdin 全文件扫描处理。
- iOS 路径当前跳过 AK/SK 检测（上游既有决策），PII 与组件检测照常。

更多通用参数见[命令行参数](/guide/cli)。
