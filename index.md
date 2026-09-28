---
layout: home

hero:
  name: AppInfoScanner
  text: 移动端 / Web 资产信息收集 CLI
  tagline: 适用于 HW 行动 / 红队 / 渗透测试场景，从 Android、iOS、Web/H5 中快速提取 URL、IP、组件、AK/SK 等关键资产信息，并以 json / txt / xlsx 报告输出。
  image:
    src: /logo.svg
    alt: AppInfoScanner
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/quickstart
    - theme: alt
      text: 下载中心
      link: /tools/
    - theme: alt
      text: GitHub
      link: https://github.com/kelvinBen/AppInfoScanner

features:
  - icon: 📱
    title: 三端全覆盖
    details: 支持 DEX、APK、IPA、Mach-O、HTML、JS、Smali 等文件与目录级批量扫描，APK/IPA/H5 支持自动下载后一键收集。
  - icon: 🔑
    title: 凭据检测 · 56 规则集
    details: AK/SK 检测全面覆盖阿里云 / 腾讯云 / AWS / Google / GitHub / GitLab / Slack / Stripe / JWT / 私钥 / URL 内嵌密码等通用凭据。
  - icon: 🪪
    title: PII 检测 · 14 规则集
    details: 手机号、身份证、邮箱、银行卡、车牌、姓名、护照、VIN、IMEI、统一社会信用代码等个人 / 企业敏感信息（关键项带校验位验证）。
  - icon: 🛡️
    title: 组件识别 × CVE 对照
    details: Android 20 项 + iOS 22 项 CVE/RCE 组件检测；提取 fastjson / bcprov / log4j 等组件版本号，对照 CVE 影响范围给出受影响 / 安全结论。
  - icon: 📦
    title: 壳检测与一键脱壳
    details: 39 厂商加固统一特征库三路检测；--unpack 显式脱壳（自动推送版本匹配的 frida-server），--prefer-dump 直接扫描已有脱壳产物。
  - icon: 🛰️
    title: 授权网络嗅探
    details: 状态码 / 标题 / Server / CDN / 解析 IP 基础嗅探；--sniffer 显式开启，--scope 域名清单限定授权范围，内网与回环地址不嗅探。
  - icon: 📊
    title: 结构化报告
    details: report.json / report.txt / report.xlsx 三格式输出，敏感权限、加固厂商、敏感前缀 [!] 高价值发现集中汇总。
  - icon: 🔄
    title: 自动更新与工具链供给
    details: update 子命令检测 / 下载 / MD5 校验 GitHub Release；config.toml 带版本号跨版本自动迁移；macOS/Linux 缺失工具链自动安装。
---

::: warning 免责声明
请勿将本项目技术或代码应用在恶意软件制作、软件著作权 / 知识产权盗取或不当牟利等**非法用途**中。实施上述行为或利用本项目对非自己著作权所有的程序进行数据嗅探将涉嫌违反《中华人民共和国刑法》第二百一十七条、第二百八十六条，《中华人民共和国网络安全法》《中华人民共和国计算机软件保护条例》等法律规定。本项目提及的技术仅可用于私人学习测试等合法场景中，任何不当利用该技术所造成的刑事、民事责任均与本项目作者无关。
:::

## 适用场景

- 日常渗透测试中对 APP 进行关键资产信息收集，比如 URL 地址、IP 地址、关键字等信息的采集等。
- 大型攻防演练场景中对 APP 进行关键资产信息收集，比如 URL 地址、IP 地址、关键字等信息的采集等。
- 对 WEB 网站源代码进行信息采集（可以是开源代码，也可以是网页另存为的源代码）。
- 对 H5 页面进行 URL 地址、IP 地址、关键字等信息进行采集等。
- 对某个 APP 进行定向信息收集等。

## 扫描效果

![扫描结果](/result.png)

## 加入 404StarLink 2.0 - Galaxy

AppInfoScanner 是 404Team [星链计划 2.0](https://github.com/knownsec/404StarLink2.0-Galaxy) 中的一环，如果对 AppInfoScanner 有任何疑问又或是想要找小伙伴交流，可以参考[星链计划的加群方式](https://github.com/knownsec/404StarLink2.0-Galaxy#community)。
