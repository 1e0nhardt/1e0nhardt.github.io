---
icon: pen-to-square
date: 2024-05-25
sticky: false
star: false
comment: true
category:
  - Game
tags:
  - hazel
description: FFmpeg学习
---
# FFmpeg学习

## 参考资料
[FFmepg libav tutorial](https://github.com/leandromoreira/ffmpeg-libav-tutorial/blob/master/README-cn.md)

[PyAV: FFmpeg python binding](https://pyav.org/docs/stable/)

[FFmpeg 编码与编辑课程原版](https://slhck.info/ffmpeg-encoding-course)

以下为我翻译的内容。

@slidestart

<!-- .slide: data-background="#00ff00" style="text-align: left;" -->
## FFMPEG编码与编辑课程 <!-- .h2: class="r-fit-text" -->
原作者: Werner Robitza  
June 04, 2018

---

<!-- .slide: style="text-align: left;" -->
## 目标
该课程将包含
- ffmpeg基本概念
- 安装ffmpeg
- 编码视频
- 应用滤镜(filters)
- 分析视频

---

## FFMPEG导论 <!-- .h2: class="r-fit-text" -->

---

<!-- .slide: style="text-align: left;" -->
## 关于ffmpe项目
- 免费，开源的多媒体编辑，转换……软件
- 开始于2000
- 持续开发至今

### 相关框架
- [ImageMagick](https://imagemagick.org/index.php)
- [MLT Framework](https://mltframework.org)

---

<!-- .slide: style="text-align: left;" -->
## 工具
ffmpeg包含
- 命令行工具：ffmpeg, ffprobe, ffplay
- 库：libavcodec, libavformat, libavfilter, libavutil, libavresample, libswscale, libswresample, libpostproc  

很多项目(VLC, MLT Framework, ...)都用到了ffmpeg库，当然也可以用于C/C++开发。

---

<!-- .slide: style="text-align: left;" -->
## 关于库(libav*)
- libavformat: 媒体格式读写(mp4, mkv, ...)
- libavcodec: 编解码器(H.264, H.265, ...)
- libavfilter: 各种视频和音频滤镜
- ...等等

使用这些库进行编程的示例。  
[雷霄骅大神写的程序示例](http://leixiaohua1020.github.io/#ffmpeg-development-examples)

---

## 架构
简化的总体架构
<img class="r-stretch" src="/assets/images/ffmpeg_arch.png">

---

<section>
\[\begin{aligned}
  \dot{x} &amp; = \sigma(y-x) \\
  \dot{y} &amp; = \rho x - y - xz \\
  \dot{z} &amp; = -\beta z + xy
  \end{aligned} \]
</section>

---


@slideend
