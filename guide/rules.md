# 自定义规则

## 临时规则（命令行）

`-r` 参数为单次扫描追加临时规则 / 关键字，不改配置文件：

```bash
python app.py android -i Demo.apk -r ".*baidu.com.*"
```

## 持久规则（config.toml）

工作区 `config.toml` 是规则的持久化入口，编辑后下次运行即生效：

- `filter_strs`：提取内容规则（正则）
- `filter_no` / `filter_no_domains`：忽略规则（正则 / 公共域名后缀表）
- `filter_components` / `ios_components`：组件识别表
- `apk_permissions` / `ios_permissions`：敏感权限表
- `shell_vendors`：加固特征库

各配置项语义与写法见[配置参考](/guide/config)。

## 社区规则提交

自定义规则可提交给作者合入内置规则库：

[点击添加自定义规则（GitHub issues #7）](https://github.com/kelvinBen/AppInfoScanner/issues/7)

提交格式：

```text
1. APP 自定义组件添加
   如：fastjson 的规则如下
   APP组件: fastjson com.alibaba.fastjson

2. 需要进行搜索的字符串
   如：查询阿里的 AK 规则如下
   字符串: 阿里云AK .*accessKeyId.*".*"

3. 需要搜索的 web 文件后缀名
   如：jsp 文件的规则如下
   网站： java语言 jsp

4. Android 壳规则
   如：某数字公司的壳规则如下
   壳：某数字公司 com.stub.StubApp
```

> 想先浏览主程序内置的全部规则？见[规则中心](/rules/)；想为新版本补充规则？见[规则中心 · 补充规则](/rules/#补充规则)。
