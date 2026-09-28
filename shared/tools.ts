// 下载中心数据源：工具随主仓库 kelvinBen/AppInfoScanner 分发，此处指向仓库 raw 链接。
// 未来工具链 Release 化后，只需把 url 换成 Release 资产地址，页面零改动。

export interface ToolItem {
  name: string
  version: string
  size: string
  platform: string
  /** 中文说明 */
  zh: string
  /** 英文说明 */
  en: string
  /** GitHub 下载地址 */
  url: string
  /** 国内镜像（Gitee，可选） */
  mirror?: string
}

const RAW = 'https://github.com/kelvinBen/AppInfoScanner/raw/master/tools'
const GITEE_RAW = 'https://gitee.com/kelvin_ben/AppInfoScanner/raw/master/tools'

export const downloadTools: ToolItem[] = [
  {
    name: 'apktool.jar',
    version: '3.0.3',
    size: '15 MB',
    platform: '全平台 / All',
    zh: 'Android APK 反编译工具，仓库自带并在首次运行时自动部署到用户工作区。',
    en: 'Android APK decompiler, bundled in the repo and auto-deployed to the user workspace on first run.',
    url: `${RAW}/apktool.jar`,
    mirror: `${GITEE_RAW}/apktool.jar`,
  },
  {
    name: 'baksmali.jar',
    version: '2.5.2-dev',
    size: '3.8 MB',
    platform: '全平台 / All',
    zh: 'DEX 转 smali 反编译工具，配合 apktool 完成 Android 静态分析链路。',
    en: 'DEX-to-smali disassembler that completes the Android static analysis chain alongside apktool.',
    url: `${RAW}/baksmali.jar`,
    mirror: `${GITEE_RAW}/baksmali.jar`,
  },
  {
    name: 'strings.exe',
    version: '-',
    size: '146 KB',
    platform: 'Windows x86',
    zh: 'Windows（32 位）下的二进制字符串提取工具。',
    en: 'Binary string extraction tool for 32-bit Windows.',
    url: `${RAW}/strings.exe`,
    mirror: `${GITEE_RAW}/strings.exe`,
  },
  {
    name: 'strings64.exe',
    version: '-',
    size: '160 KB',
    platform: 'Windows x64',
    zh: 'Windows（64 位）下的二进制字符串提取工具。',
    en: 'Binary string extraction tool for 64-bit Windows.',
    url: `${RAW}/strings64.exe`,
    mirror: `${GITEE_RAW}/strings64.exe`,
  },
  {
    name: 'unpacker/aapt.exe',
    version: '-',
    size: '1.5 MB',
    platform: 'Windows',
    zh: 'Android 资源打包/解析工具，脱壳流程中用于解析 APK 信息（仅 Windows 自带，macOS/Linux 回退 manifest 已解析的包名）。',
    en: 'Android asset packaging tool used in the unpacking flow (bundled for Windows only; macOS/Linux falls back to the parsed manifest package name).',
    url: `${RAW}/unpacker/aapt.exe`,
    mirror: `${GITEE_RAW}/unpacker/aapt.exe`,
  },
  {
    name: 'unpacker/adb.exe',
    version: '-',
    size: '4.5 MB',
    platform: 'Windows',
    zh: 'Android 调试桥，脱壳流程中与设备交互（仅 Windows 自带；macOS/Linux 缺失时自动安装）。',
    en: 'Android Debug Bridge for device interaction during unpacking (bundled for Windows; auto-installed on macOS/Linux).',
    url: `${RAW}/unpacker/adb.exe`,
    mirror: `${GITEE_RAW}/unpacker/adb.exe`,
  },
  {
    name: 'unpacker/hexl-server-arm32',
    version: '17.18.0',
    size: '25 MB',
    platform: 'Android arm32',
    zh: '设备端 frida-server（arm32，与 python 侧 frida 17.18.0 配套），--unpack 脱壳时推送到设备。',
    en: 'Device-side frida-server (arm32, matching frida 17.18.0) pushed to the device by --unpack.',
    url: `${RAW}/unpacker/hexl-server-arm32`,
    mirror: `${GITEE_RAW}/unpacker/hexl-server-arm32`,
  },
  {
    name: 'unpacker/hexl-server-arm64',
    version: '17.18.0',
    size: '56 MB',
    platform: 'Android arm64',
    zh: '设备端 frida-server（arm64，与 python 侧 frida 17.18.0 配套），--unpack 脱壳时推送到设备。',
    en: 'Device-side frida-server (arm64, matching frida 17.18.0) pushed to the device by --unpack.',
    url: `${RAW}/unpacker/hexl-server-arm64`,
    mirror: `${GITEE_RAW}/unpacker/hexl-server-arm64`,
  },
]
