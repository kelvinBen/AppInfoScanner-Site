# Downloads

The toolchain binaries AppInfoScanner depends on. For normal use, **manual download is not required** — cloning the main repo or first run deploys them to the user workspace automatically. This page serves offline environments, targeted tool replacement, and version checking.

<script setup>
import { downloadTools } from '../../shared/tools'
</script>

<AdSlot placement="tools-top" />

<div class="tool-grid">
  <ToolCard v-for="t in downloadTools" :key="t.name" :tool="t" locale="en" />
</div>

<AdSlot placement="tools-mid" />

## Notes

- All files are distributed with the main repo [kelvinBen/AppInfoScanner](https://github.com/kelvinBen/AppInfoScanner); the links above point to the repo's `tools/` raw paths. When GitHub access is slow from China, use the Gitee mirror ([gitee.com/kelvin_ben/AppInfoScanner](https://gitee.com/kelvin_ben/AppInfoScanner)).
- Toolchain version mapping (see [Quick Start](/en/guide/quickstart)): apktool 3.0.3 / baksmali 2.5.2-dev / frida trio 17.18.0 · 14.10.4 · 2.0.1.
- `hexl-server-*` are device-side frida-servers (matching the python-side frida core 17.18.0); `--unpack` picks the right ABI automatically.
- Toolchains will be distributed via GitHub Releases in the future; the links on this page will be switched accordingly.

<AdSlot placement="site-footer" />
