---
icon: pen-to-square
isOriginal: true
#author: Ms.Hope
date: 2023-06-11
comment: true
sticky: false
star: false
category:
  - misc
tag:
  - windows
description: Windows脚本小知识
---

# Windows脚本小知识

## 注释
```cmd
rem 注释内容
::: 注释内容
%注释内容%

goto start  
可以是多行文本，可以是命令  
可以包含符号和其他特殊字符  
冒号start为一个标签
使用goto语句可以在标签间进行跳转
:start
```

## 为Window 命令行添加别名
win+r 输入regedit 打开注册表编辑器

打开：计算机\\HKEY_CURRENT_USER\\Software\\Microsoft\\Command Processor
右键新建可扩充字符串值：value填一个脚本名 "C:\\cmd_alias.bat"

脚本内容
```cmd
@echo off
rem $* 表示后面可以有任意数量的命令行参数
rem doskey 相当于 alias
doskey ls=dir /b $*
doskey tb=tensorboard --logdir $*
doskey ca=conda activate $*
doskey ns=nvidia-smi
```


