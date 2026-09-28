# Web / H5 扫描

`web` 类型用于扫描 WEB 站点或 H5 相关的文件内容，支持开源代码、网页另存为的源码、目录批量，以及站点 URL 的自动缓存扫描。

## 基本用法

- 对本地 WEB 站点文件进行扫描

```bash
python app.py web -i <Your web file>

# 例：
python app.py web -i "C:\Users\Administrator\Desktop\Demo.html"
```

- 对 URL 地址中包含的 WEB 站点文件进行扫描

```bash
python app.py web -i <Web Download Url>

# 例：
python app.py web -i "https://127.0.0.1/Demo.html"
```

- 对一个本地目录进行批量扫描

```bash
python app.py web -i <Your Dir>
```

## 扫描范围

Web 扫描默认覆盖以下后缀（大小写不敏感，可在工作区 `config.toml` 的 `web_file_suffix` 中自定义）：

- 页面与脚本：`html` / `js` / `ts` / `vue` / source map / `css`
- 服务端模板与配置：`json` / `yaml` / `env` 等配置文件
- 小程序文件：`wxml` / `wxss`

更多通用参数见[命令行参数](/guide/cli)。
