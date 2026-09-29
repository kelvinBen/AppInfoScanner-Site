---
title: 实战链路：从加壳 APK 到代理抓包的完整资产收集
description: 官方示范：AppInfoScanner 扫描定位、Frida 一键脱壳、fix_magic 修复、adb reverse 隧道 + BurpSuite 抓包的串联打法。
---

# 实战链路：从加壳 APK 到代理抓包的完整资产收集

> 官方示范文（2026-09）。以下仅限**已授权**的测试目标，参数口径以 V1.0.11 为准。

一把 HW 里最常见的开局：拿到一个 APK，什么都是黑盒。下面这条链路把 AppInfoScanner 的四个能力串起来用——**壳检测 → 一键脱壳 → 产物修复 → 代理隧道定位**。

## 第一步：先扫一遍，让壳自己现形

```bash
python app.py android -i target.apk
```

360 / 梆梆 / 爱加密等 39 家加固特征会被直接报出来（三路检测：application 类名 / so / assets）。此时直接扫描壳产物意义不大，报告会明确提示需要脱壳——**但别急着关掉报告**：`report.json` 里 shell 段的厂商判断决定了下一步脱壳的姿势（部分壳的 dump 产物需要走修复）。

## 第二步：--unpack 一键脱壳

root 真机 USB 连接后：

```bash
python app.py android -i target.apk --unpack
```

工具会自动把版本匹配的 frida-server（17.18.0，按设备 ABI 选 arm32/arm64）推到 `/data/local/tmp` 并启动，dump 出 dex 后自动进入扫描。不需要自己装 frida、不需要手动起 server——python 侧与设备端版本一致性是内置保证的。

## 第三步：dump 产物有问题？fix_magic 修复

脱壳产物常见头部损坏（魔数 / 文件大小 / adler32 校验和被抹），表现为反编译失败或提取无结果：

```bash
python3 libs/core/fix_magic.py detect out/target/dump/xxx.dex   # 先检测
python3 libs/core/fix_magic.py fix dex out/target/dump/xxx.dex  # 再修复
```

修好的产物不必重新脱壳，直接：

```bash
python app.py android -i target.apk --prefer-dump
```

## 第四步：顺着回环地址挖本地服务，搭隧道抓包

这是最容易被忽略的一段。很多本地 VPN / 代理类 APP 的核心通讯走 `127.0.0.1:port`——AppInfoScanner **不会把回环当噪声丢掉**，而是独立分类保留端口，并在报告里自动给出现成的隧道命令建议（`report.txt` / `report.json` / `report.xlsx` 均携带）：

```bash
adb reverse tcp:8888 tcp:8888   # 宿主机 BurpSuite 监听 8888
```

BurpSuite 侧 proxy 监听 `0.0.0.0:8888`，APP 的本地流量就顺着 reverse 隧道进了 Burp——不需要iptables、不需要改 APK 里的代理地址。

## 第五步：对域名资产做授权验证

提取出的域名做一次存活与指纹确认，注意嗅探是**显式开启 + 授权范围**两道门：

```bash
python app.py android -i target.apk --sniffer --scope authorized_domains.txt
```

内网与回环地址不嗅探（它们本来就在报告里了），`--scope` 清单限定边界，避免误探授权范围外的目标。

## 小结

| 环节 | 命令 | 产出 |
| --- | --- | --- |
| 初扫 + 壳检测 | `android -i` | 厂商判断、初步资产 |
| 一键脱壳 | `--unpack` | 干净 dex + 全量扫描 |
| 产物修复 | `fix_magic detect/fix` | 可反编译产物 |
| 直扫已有产物 | `--prefer-dump` | 跳过重复脱壳 |
| 本地服务隧道 | `adb reverse`（报告自带建议） | Burp 可见的本地流量 |
| 资产验证 | `--sniffer --scope` | 状态码 / 标题 / CDN / IP |

相关文档：[壳检测与脱壳](/guide/unpack)、[fix_magic 魔数修复](/guide/fix-magic)、[网络嗅探](/guide/sniffer)。
