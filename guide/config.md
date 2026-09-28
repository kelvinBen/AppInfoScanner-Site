# 配置参考

内置规则有限，并非所有输入都能得到理想结果；可根据需要在 `config.toml` 中调整规则，合理的规则配置可以显著提升检索质量。

## 工作区机制

- 配置文件为 TOML 格式，首次运行时自动部署到用户文档目录的 AppInfoScanner 目录下（如 `~/Documents/AppInfoScanner/config.toml`），带中文注释说明，可直接编辑，下次运行即生效；删除该文件后重新运行即可恢复默认配置。
- 旧版本工作区中的 `config.py` 会在升级后首次运行时自动迁移为 `config.toml`，原文件保留为 `config.py.bak`。
- 配置带 `config_version` 版本号，跨版本升级自动迁移；规则合并采用**深合并**——版本升级新增的内置规则自动保留，你的自定义规则优先。

## 规则写法

TOML 单引号字符串（字面量串）中反斜杠原样生效，适合正则规则，如 `'.*accessKeyId.*".*?"'`；仅当规则中包含单引号时才需要改用双引号字符串并对反斜杠双写。

## 配置项说明

| 配置项 | 说明 |
| --- | --- |
| `apk_permissions` | Android 敏感权限表（manifest 声明 → 中文风险说明），命中后以「权限 (说明)」输出 |
| `ios_permissions` | iOS 隐私权限表（Info.plist 声明键 → 中文风险说明），扫描 IPA 时自动解析 `.app/Info.plist` 检测 |
| `filter_components` | Android 组件识别表（包名片段 → 组件与风险说明），聚焦存在 RCE/CVE 的组件：fastjson、Log4j（Log4Shell）、Shiro、XStream、CommonsCollections 反序列化链、Struts2、SnakeYAML、XXE 系、BouncyCastle、Netty 等 |
| `ios_components` | iOS 组件识别表（标记串 → 组件与风险说明），含 SSZipArchive（Zip-Slip）、OpenSSL、libxml 等高危组件、AFNetworking / 微信 / 极光等常见 SDK 与 FLEX 调试工具，按二进制 strings 内容匹配 |
| `filter_strs` | 提取内容规则（正则），默认覆盖常见协议地址、IPv4/IPv6 与本地回环服务 |
| `filter_no` | 忽略规则（正则），默认仅含保留地址段（`0.x` / 广播地址 / 文档示例网段 / `::1`） |
| `filter_no_domains` | 公共域名后缀表，命中 host 或其任意父域后缀即忽略（如 `w3.org` 覆盖 `www.w3.org`；`bugly.qq.com` 只覆盖自身及子域，不连坐 `qq.com`）。新增公共域名时写裸域名即可，无需 `.*` 前缀 |
| `shell_vendors` | Android 加固统一特征库（厂商 → `{classes, so, assets}`），配合三路壳检测使用 |
| `web_file_suffix` | Web 扫描的文件后缀（大小写不敏感），含 html/js/ts/vue/source map/css/服务端模板/配置文件（json/yaml/env 等）与小程序文件（wxml/wxss） |
| `sniffer_filter` | 网络嗅探忽略的文件后缀（静态资源 / 二进制：图片 / 字体 / 音视频 / 文档 / 压缩包 / 安装包等 50+ 类，仅 `-n` 时生效） |
| `headers` | 自动下载过程中需要的请求头信息 |
| `data` | 自动下载过程中需要的请求报文体 |
| `method` | 自动下载过程中需要的请求方法 |

## 示例：追加一条提取规则

```toml
# config.toml（工作区副本）中 filter_strs 追加元素即可
filter_strs = [
    # ...内置规则保持不动...
    '.*accessKeyId.*".*?"',
]
```

规则库相关的提交与共享见[自定义规则](/guide/rules)。
