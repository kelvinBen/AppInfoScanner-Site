---
title: 使用 IDA Pro 对 SO 文件进行动态调试
description: Android 逆向实战：android_server 挂接调试 native SO 的完整流程（23946 端口 + 基址断点）。
---

# 使用 IDA Pro 对 SO 文件进行动态调试

> 本文迁移自[作者博客](https://blog.52zhuanke.cn/002.html)（2019-05），为当时环境下的操作实录，IDA 菜单路径在新版本中可能略有变化。

## 准备工作

- 一台 macOS / Windows 系统的电脑
- 一部已 root 的手机
- 一条数据线
- IDA Pro
- adb
- 需要调试的 APK

**演示环境**：macOS · 小米 5 Max · IDA Pro 7.0 64 位

## 开始

1. 手机通过数据线连接电脑。

2. 将 IDA 安装目录下 dbgsrv 目录中的 android_server 发送到手机：

   ```bash
   adb shell push "/Applications/IDA Pro 7.0/ida.app/Contents/MacOS/dbgsrv/android_server64" /data/local/tmp
   ```

   注：android_server 的架构与打开的 IDA 架构一一对应——IDA 打开的是 64 位，则推送 64 位的 android_server。

3. 给 android_server 赋予 755 权限：

   ```bash
   adb shell chmod 755 /data/local/tmp/android_server64
   ```

4. 启动调试服务器（默认监听端口 23946）：

   ```bash
   adb shell su -c "/data/local/tmp/android_server64"
   ```

5. 进行端口转发：

   ```bash
   adb forward tcp:23946 tcp:23946
   ```

6. 在手机上运行要调试的 App，并打开 IDA Pro。

7. 依次点击菜单栏 **debugger → attach → remote Armlinux/android debugger**，在弹出的窗口中填充：

   ```text
   Hostname: localhost
   Port: 23946
   ```

   ![image](/articles/002/01.png)

8. 在弹出的窗口中选择要调试的 App 的包名，点击 OK。

   ![image](/articles/002/02.png)

9. 此时 IDA 会把 App 挂起。在 IDA 界面按下 `Ctrl+S` 找到需要调试的 SO 文件，同时记录该文件的加载基址，点击 OK 关闭对话框。

10. 按下快捷键 `G`，输入「基址 + 文件偏移」所得地址，点击 OK 跳转到 SO 文件中需要下断点的位置。按下 `F2` 设置断点，当 App 执行到此处时便会断下来。

## 相关阅读

- [使用 IDA Pro 对 Dalvik 指令进行动态调试](/articles/ida-dalvik-debug)
- [IDA Pro 运行闪退（Fatal error before kernel init）排查](/articles/ida-crash-fix)
