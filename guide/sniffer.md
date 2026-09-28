# 网络嗅探

对提取到的域名 / IP 发起探测，采集**状态码、标题（Title）、Server、CDN、解析 IP** 等基础信息，辅助判断资产存活情况与归属。

## 开关与授权范围

::: danger 行为安全设计
嗅探默认**关闭**，需 `--sniffer` 显式开启；红队场景下建议始终配合 `--scope` 使用，只对授权范围内的域名发起请求。
:::

```bash
# 显式开启嗅探
python app.py android -i Demo.apk --sniffer

# 配合授权域名清单（每行一个域名或后缀）
python app.py android -i Demo.apk --sniffer --scope authorized_domains.txt

# 显式关闭（默认行为）
python app.py android -i Demo.apk --no-sniffer
```

`authorized_domains.txt` 示例：

```
example.com
target.cn
api.target.cn
```

## 嗅探策略

- **内网与保留地址不嗅探**：私网 IPv4（`10.` / `172.16-31.` / `192.168.`）、链路本地（含 `169.254.169.254` 云元数据端点）、回环与一切 IPv6 字面量只做提取、不发请求；域名照常嗅探。
- **回环是情报不是噪声**：`127.0.0.1:端口` / `localhost:port` 形态的结果独立分类保留端口信息，并自动生成 `adb reverse tcp:PORT tcp:PORT` 抓包命令建议（本地 VPN / 代理类 APP 的典型架构线索）。
- 资源文件后缀（图片 / 字体 / 音视频等 50+ 类）可经 `-n` 配合 `sniffer_filter` 配置忽略。
- 嗅探结果并入结构化报告（json / txt / xlsx）的独立分区。

## 自定义请求

自动下载与嗅探相关的请求头 / 报文体 / 方法可在工作区 `config.toml` 的 `headers` / `data` / `method` 中配置，见[配置参考](/guide/config)。
