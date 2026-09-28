# 下载中心

AppInfoScanner 依赖的工具链二进制清单。正常使用**无需手动下载**——克隆主仓库或首次运行时会自动部署到用户工作区；此页面供离线环境、单独补齐工具或版本核对的场景使用。

<script setup>
import { downloadTools } from '../shared/tools'
</script>

<AdSlot placement="tools-top" />

<div class="tool-grid">
  <ToolCard v-for="t in downloadTools" :key="t.name" :tool="t" locale="zh" />
</div>

<AdSlot placement="tools-mid" />

## 说明

- 所有文件随主仓库 [kelvinBen/AppInfoScanner](https://github.com/kelvinBen/AppInfoScanner) 分发，上述链接为主仓库 `tools/` 目录的 raw 地址；国内访问不畅时可使用 Gitee 镜像（[gitee.com/kelvin_ben/AppInfoScanner](https://gitee.com/kelvin_ben/AppInfoScanner)）。
- 工具链版本对应关系（详见[快速开始](/guide/quickstart)）：apktool 3.0.3 / baksmali 2.5.2-dev / frida 三件套 17.18.0 · 14.10.4 · 2.0.1。
- `hexl-server-*` 为设备端 frida-server（与 python 侧 frida core 17.18.0 配套），`--unpack` 脱壳时自动按设备 ABI 选择推送。
- 未来工具链将随 Release 独立分发（Release 化），届时本页下载地址会同步切换。

<AdSlot placement="site-footer" />
