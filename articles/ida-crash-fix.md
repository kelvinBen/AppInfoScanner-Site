---
title: IDA Pro 运行闪退：Fatal error before kernel init
description: IDA Pro 启动闪退排查：删除 ida.reg 重建信息表即可恢复。
---

# IDA Pro 运行闪退：Fatal error before kernel init

> 本文迁移自[作者博客](https://blog.52zhuanke.cn/003.html)（2019-05），为当时环境下的操作实录。

**系统环境**：macOS 10.12.6

## 问题描述

拿到一个 Android 应用，需要对其进行安全测试，使用 IDA Pro 对 SO 文件进行调试，日常打开 IDA Pro 竟然闪退了，还给了一个错误提示「应用程序 "ida" 不能打开。」——信息量约等于零。

![image](/articles/003/01.png)

换到命令行，直接运行 IDA Pro 的可执行文件（「IDA Pro 安装路径下 idabin 目录中的 ida 或 ida64」，与 dbgsrv 同级目录），再次给出简短的错误信息：**Fatal error before kernel init**。

![image](/articles/003/02.png)

重装 IDA Pro 后问题依旧。搜索后确认是**插件原因导致的启动失败**，社区给出的方案有两条：

1. 删除 `zynamics_binexport_8.p6` 文件
2. 删除 `~/.idapro` 隐藏目录下的 `ida.reg` 文件

## 解决方案

- 方案一：本机搜索后并未找到对应文件，怀疑与版本有关，未采用。
- 方案二（实测有效）：删除 `~/.idapro` 隐藏目录下的 `ida.reg` 文件（Windows 用户到用户目录下查找），重新启动 IDA Pro 即可成功。**删除前记得备份。**

## 问题原因

1. 插件原因导致的启动失败。
2. `ida.reg` 中包含了用户的注册信息、界面描述和执行过的脚本历史记录，删除它等于重建 IDA 信息表。

## 相关阅读

- [使用 IDA Pro 对 Dalvik 指令进行动态调试](/articles/ida-dalvik-debug)
- [使用 IDA Pro 对 SO 文件进行动态调试](/articles/ida-so-debug)
