# 壳检测与脱壳

## 壳检测

Android 加固检测使用统一特征库 `shell_vendors`（39 厂商），三路检测：

1. **manifest application 类名先行判断**（门控）：命中厂商后用该厂商文件特征（dex 中的类、so 文件、assets 文件）确认；
2. **经验规则**：应用包名在 dex 包结构中缺失即疑似加固（壳加密业务 dex），此时跨厂商扫描签名定位；
3. **特征确认成功**后触发脱壳提示。

iOS 同样具备壳识别能力（识别到有壳后会停止执行后续扫描逻辑并提示）。

## --unpack 显式脱壳

::: danger 行为安全设计
脱壳默认**只提示、不动设备**，防止破坏渗透现场。需要真正脱壳时必须显式传入 `--unpack`。
:::

```bash
python app.py android -i Demo.apk --unpack
```

- 检测到加固后，自动推送与 python 侧 frida 版本匹配的 frida-server 到设备并执行脱壳。
- **frida 版本一致性**：python 侧 frida core（17.18.0）与设备端 frida-server 必须同版本；工具链会以 core 为基准自动下载匹配的 server（仓库自带 `tools/unpacker/hexl-server-*`，版本匹配则直接使用）。
- 全阶段 120 秒超时（防反调试无限等待），失败自动降级到壳 payload 静态扫描。
- 全流程经 `ensure_adb()` 解析 adb，macOS/Linux 缺失依赖时自动安装（Java / adb / frida）。

## --prefer-dump 扫描已有产物

已经在外部完成脱壳 / 砸壳的场景，直接指定脱壳产物目录扫描，全程不碰设备：

```bash
python app.py android -i ignored --prefer-dump <脱壳产物目录>
```

## 外部脱壳 / 砸壳工具

遇到壳报错（`This application has shell...`）时可先结合以下工具处理：

| 平台 | 工具 |
| --- | --- |
| Android | Xposed 模块：dexdump；frida 模块：FRIDA-DEXDump；无 Root：blackdex |
| iOS（Windows） | frida-ipa-dump |
| iOS（macOS） | frida-ios-dump |

## fix_magic：脱壳产物修复

脱壳产物常见魔数 / 大小 / 校验和损坏，可先用独立修复模块处理后再扫描，见 [fix_magic 魔数修复](/guide/fix-magic)。
