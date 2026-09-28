---
title: 使用 IDA Pro 对 Dalvik 指令进行动态调试
description: Android 逆向实战：IDA Pro 远程调试 Android 应用 classes.dex 的完整流程（DDMS 8700 端口挂接）。
---

# 使用 IDA Pro 对 Dalvik 指令进行动态调试

> 本文迁移自[作者博客](https://blog.52zhuanke.cn/001.html)（2019-05），为当时环境下的操作实录，IDA 菜单路径在新版本中可能略有变化。

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

2. 在手机上安装 Xposed Installer 工具，并安装 XInstaller 插件。安装完毕后，在 XInstaller 的「其他设置」中找到「调试应用」并勾选，勾选完毕后回到 Xposed Installer 软重启设备。

   注：如果是未 ROOT 的设备，可以在 AndroidManifest.xml 的 application 标签里添加 `android:debuggable="true"`，保存后进行二次打包。

3. 通过 adb install 将 APK 安装到手机：

   ```bash
   adb install /Work/Demo/test.apk
   ```

4. 用 IDA Pro 打开 APK，选择 `classes.dex` 文件。

   > 问：为什么是 classes.dex 文件呢？
   > 答：classes.dex 是应用的主要执行程序，包含着所有的 Dalvik 指令。

5. 等待 IDA Pro 加载分析完毕后，依次点击菜单栏 **Debugger → Debugger options**，在弹出的窗口中勾选 **Suspend on process entry point**，并点击右下角的 **Set specific options** 按钮。

   ![image](/articles/001/01.png)

6. 在新弹出的窗口中，填入 ADB executable 路径。然后点击 **Fill from AndroidManifest.xml** 按钮，IDA Pro 会自动加载 Package Name 和 Activity，最后点击 OK。

   ![image](/articles/001/02.png)

7. 在菜单栏依次点击 **Debugger → Process Options**，在弹出的窗口中将 Port 改为 **8700**，其他保持不变。

   ![image](/articles/001/03.png)

   > 问：为什么是 8700 端口呢？
   > 答：Android SDK 提供了一款工具 DDMS，用来监视 App 的运行状态和结果，它的默认端口是 8700。

8. 到此所有准备工作就绪，可以下断点开始调试 App 了：结合前面打开的 classes.dex 找到对应的内存基址，定位到该基址打上断点。

## 使用技巧

- **打开本地变量窗口**：点击菜单栏 **debugger → use source level debugger**，然后点击 **debugger → debugger windows → locals**。
- **单步跟踪**：按下 F7（步入）或 F8（步过）。

## 相关阅读

- [使用 IDA Pro 对 SO 文件进行动态调试](/articles/ida-so-debug)
- [IDA Pro 运行闪退（Fatal error before kernel init）排查](/articles/ida-crash-fix)
