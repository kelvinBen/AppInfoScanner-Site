---
title: Python 3.7+ 安装 pip 报错 No module named '_ctypes'
description: CentOS 下编译安装 Python 缺 libffi-devel 导致 pip 安装失败的排查与修复。
---

# Python 3.7+ 安装 pip 报错 No module named '_ctypes'

> 本文迁移自[作者博客](https://blog.52zhuanke.cn/010.html)（2019-06），为当时环境下的操作实录。

**环境**：CentOS 7.0 · Python 3.8.0

## 错误描述

给 CentOS 的 Python 安装 pip 模块时出现如下错误：

![image](/articles/010/01.png)

## 错误原因

Python 3 中有个内置模块叫 ctypes，它是 Python 的外部函数库模块，提供兼容 C 语言的数据类型，并通过它调用 Linux 系统下的共享库（Shared library）。此模块需要依赖系统外部函数库（libffi）的开发链接库（头文件和链接库）。

由于 CentOS 7 系统中没有安装 libffi 的开发链接库软件包，安装 pip 时就报了 `ModuleNotFoundError: No module named '_ctypes'`。

## 解决方案

安装外部函数库开发包后重新编译 Python：

1. 使用 yum 安装 libffi-devel：

   ```bash
   yum install libffi-devel -y
   ```

   ![image](/articles/010/02.png)

2. 在 Python 源码目录重新编译并安装：

   ```bash
   make && make install
   # 如果出现下述错误，是因为没有在 Python 的源码目录进行编译，解决方法见下节。
   # make: *** No targets specified and no makefile found.  Stop.
   # make: *** No rule to make target `install'.  Stop.
   ```

3. 最后安装 pip，可以看到成功安装：

   ![image](/articles/010/03.png)

## 编译报错的解决方法

步骤 2 报错时，请检查当前目录是否在 Python 的源码目录：

![image](/articles/010/04.png)
![image](/articles/010/05.png)

如果源码目录已经找不到了，按以下步骤重新获取：

```bash
# 获取 python 源码压缩包
wget https://www.python.org/ftp/python/3.8.0/Python-3.8.0b1.tgz
# 解压
tar -zxvf Python-3.8.0b1.tgz
# 切换到解压后的目录再编译安装
cd Python-3.8.0b1
make && make install
```

![image](/articles/010/06.png)

然后安装 pip 即可成功。
