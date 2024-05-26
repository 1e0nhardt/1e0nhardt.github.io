---
title: ffmpeg入门
icon: person-chalkboard
layout: Slide
revealJs:
    width: 1600
    height: 1200
---

@slidestart

<!-- .slide: data-background="#00ff00" style="text-align: left;" -->
## FFMPEG编码与编辑课程
<!-- .element: class="r-fit-text" -->
原作者: Werner Robitza  
June 04, 2018

---

<!-- .slide: style="text-align: left;" -->
## 目标
该课程将包含
- ffmpeg基本概念
- 安装ffmpeg
- 编码视频
- 应用过滤器(filters)
- 分析视频

---

## FFMPEG导论
<!-- .element: class="r-fit-text" -->

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
- libavfilter: 各种视频和音频过滤器
- ...等等

使用这些库进行编程的示例。  
[雷霄骅大神写的程序示例](http://leixiaohua1020.github.io/#ffmpeg-development-examples)

---

## 架构
简化的总体架构
![Arch](/assets/images/ffmpeg_arch.png)
<!-- .element: class="r-stretch" -->

---

<!-- .slide: style="text-align: left;" -->
## 安装和编译
下载源码和编译好的程序: http://ffmpeg.org/download.html

Windows编译: https://github.com/jb-alvarado/media-autobuild_suite

Linux安装: apt-get等包管理器

---

## 通用视频编码概念
<!-- .element: class="r-fit-text" -->

---

<!-- .slide: style="text-align: left;" -->
## 容器格式
容器包含实际的媒体数据，如视频、音频、字幕等。典型的容器类型：
- MP4: 通常包含H.264视频、AAC音频等
- MKV: 适用于任何媒体格式的通用容器
- WebM: mkv的子集，用于Web流
- AVI: 经典容器

使用ffmpeg -formats查看支持的容器格式。(Mux, Demux：封装和解封装)

---

<!-- .slide: style="text-align: left;" -->
## 编解码器--CODEC
- CODEC = Coder/Decoder
- 视频，音频编码(code)和解码的规范
- 通常不是关于如何编码(encode)/压缩(compress)数据的规范
- 有时codec==实际的编码/解码软件

使用ffmpeg -codecs查看支持的codec。

---

<!-- .slide: style="text-align: left;" -->
## 最重要的有损CODECs
目前最常使用，由ITU/ISO标准化：
- H.262/MPEG-2 Part H: 广播、电视，用于向后兼容
- H.264/MPEG-4 Part 10：如今视频编码的事实标准
- H.265/HEVC/MPEG-H：H.264的继任者，质量提升高达50%
- MP3/MPEG-2 Audio Layer III：曾经是事实上的音频编码标准
- AAC/ISO/IEC 14496-3:2009：高级音频编码标准

--

免版税的竞争对手：
- VP8：Google提供的免费开源编解码器（现在使用不多）
- VP9：VP8的继任者，几乎和H.265一样好
- AV1：VP9的继任者，声称比H.265更好

---

<!-- .slide: style="text-align: left;" -->
## 最重要的无损CODECs
无损编解码器适用于存档、编辑等...

无损 = 在较小文件大小下没有压缩伪影

- YUV, HuffYUV, FFV1, ffvhuff 等
- PCM, FLAC, ALAC 等

--

此外，还有“视觉无损”的编解码器：

- Apple ProRes, Avid DNxHD, JPEG2000, 高质量 H.264/H.265 等

高比特率且通常只有I帧

---

<!-- .slide: style="text-align: left;" -->
## 编码器--ENCODERs
- 编码器是实际输出符合编解码器标准的比特流的软件
- 编码器的质量和性能可以有所不同，有些比其他更好（有些是免费的，有些则不是）

使用ffmpeg -encoders查看支持的encoder。

--

示例：
- libx264：最受欢迎的免费开源 H.264 编码器
- NVENC：基于 NVIDIA GPU 的 H.264 编码器
- libx265：免费开源的 HEVC 编码器
- libvpx：Google 的 VP8 和 VP9 编码器
- libaom：AV1 编码器
- libfdk-aac：AAC 编码器
- aac：FFmpeg 原生的 AAC 编码器

---

<!-- .slide: style="text-align: left;" -->
## 像素格式
- 视频流中原始像素的表示
- 指定亮度/颜色分量的顺序和色度抽样(chroma subsampling)

![Arch](/assets/images/ffmpeg_pixel_format.png)
<!-- .element: class="r-stretch" -->

使用ffmpeg -pix_fmts查看支持的pixel format。

---

## 使用ffmpeg命令行工具编码
<!-- .element: class="r-fit-text" -->

---

<!-- .slide: style="text-align: left;" -->
## 通用语法
```cmd
ffmpeg <global-options> <input-options> -i <input> <output-options> <output>
```
- 全局选项用于日志输出、文件覆盖等
- 输入选项用于读取文件
- 输出选项用于：转换（编解码器、质量等），过滤(filtering)，流映射...

完整帮助：ffmpeg -h full 但它很庞大！

---

<!-- .slide: style="text-align: left;" -->
## 转码与转封装
转码(transcoding)：从一种codec到另一种codec的转换。(例如H.264使用libx264)
```cmd
ffmepg -i <input> -c:v libx264 output.mp4
```

转封装(remuxing)：从一种容器格式到另一种容器格式的转换。(不重编码)
```cmd
ffmpeg -i input.mp4 -c copy output.mkv
```

ffmpeg将从输入文件中读取视频，音频，字幕流各一，并将其映射到输出。

--

<!-- .slide: style="text-align: left;" -->
解释：
- -c：指定编解码器
- -c copy 只复制比特流
- -c:v：仅指定视频编解码器
- -c:a：仅指定音频编解码器
- -an, -vn, -sn: 用于去除音频/视频/字幕流

---

<!-- .slide: style="text-align: left;" -->
## 转码幕后
来自 http://ffmpeg.org/ffmpeg-all.html:

ffmpeg 读取输入文件并从中获取编码过的数据包(packets)。如果有多个输入文件，ffmpeg会按顺序读取每个文件。

编码过的包(packets)会传到解码器(decoder)。解码器产生未压缩的帧(frames)，这些帧后续会经过过滤器(filtering)处理。之后，这些帧会传给编码器(encoder)，编码器将这些帧编码成新的包(packets)。最后，这些packets会传给封装器(muxer),由封装器写入输出文件。

---

<!-- .slide: style="text-align: left;" -->
## 定位和剪切(seeking and cutting)
剪切从时间戳<start>开始，持续<duration>，或到<end>为止的片段。
```cmd
ffmpeg -ss <start> -i <input> -t <duration> -c copy <output>
ffmpeg -ss <start> -i <input> -to <end> -c copy <output>
```

示例:
```cmd
ffmpeg -ss 00:01:50 -i <input> -t 10.5 -c copy <output>
ffmpeg -ss 2.5 -i <input> -to 10 -c copy <output>
```

--

<!-- .slide: style="text-align: left;" -->
## 关于定位的笔记
- 当重编码视频时，使用时间轴定位总是准确的。
- 当复制比特流时(-c copy)，ffmpeg可能复制一些不显示但必要的帧。
- 用-c copy剪切可能会导致视频开头有一些黑帧。(在不支持的播放器上)
- 参见: 
  - https://trac.ffmpeg.org/wiki/Seeking
  - https://superuser.com/questions/138331/using-ffmpeg-to-cut-up-video


---

<!-- .slide: style="text-align: left;" -->
## 设置质量
- 输出质量依赖编码器的默认设置和源材料的质量。
- 不要只编码而不设置质量。
- 通常：你需要选择一个目标比特率或质量级别。
- 目标比特率依赖视频类别，大小和帧率。

--

<!-- .slide: style="text-align: left;" -->
## 质量设定选项
可能得选项(只是示例):
- -b:v 或 -b:a 设置比特率
  - 例如：-b:v 1000k表示1000kbit/s，-b:v 8MB表示8Mbit/s。
- -q:v 或 -q:a 设置固定质量参数
  - 例如：-q:a 2 为自带的AAC编码器。

编码专用选项示例
- -crf 为libx264/libx265设置恒定速率因子(Constant Rate Factor)
- -vbr 为FDK-AAC设置恒定质量。
- 更多选项示例请看: ffmpeg -h encoder=libx264

--

<!-- .slide: style="text-align: left;" -->
## CRF是什么？
- CRF=Constant Rate Factor：恒定速率因子
- 整个编码过程中保持恒定质量
- 适合以固定质量存储视频，如果文件大小不重要的话。

--

<!-- .slide: style="text-align: left;" -->
## 转码到H.264,PT.1的示例
CRF编码：
```cmd
ffmpeg -i <input> -c:v libx264 -crf 23 -c:a aac -b:a 128k output.mkv
```
对H.264，CRF在18~28之间比较"好"，低一点更好。(HEVC和VP9的CRF设置不同)

## 转码到H.264,PT.2的示例
two-pass编码：
```cmd
ffmpeg -y -i <input> -c:v libx264 -b:v 8M -pass 1 -c:a aac -b:a 128k -f mp4 /dev/null
ffmpeg -i <input> -c:v libx264 -b:v 8M -pass 2 -c:a aac -b:a 128k output.mp4
```

Window下：使用NUL 代替 /dev/null。

参见：https://trac.ffmpeg.org/wiki/Encode/H.264

---

<!-- .slide: style="text-align: left;" -->
## 速率控制
不同的速率控制方法：
- 恒定比特率(Constant Bitrate, CBR)
- 可变比特率(Variable Bitrate, VBR)
  - 平均比特率(ABR)
  - 恒定量化参数(CQP)
  - 基于心理视觉属性的恒定质量，例如 x264/x265/libvpx-vp9 中的 CRF
  - 约束比特率(VBV)

如何选择？更多信息： 
https://slhck.info/video/2017/03/01/rate-control.html

重要：速率依赖内容特征。
<!-- .element: style="color: red;" -->

--

<!-- .slide: style="text-align: left;" -->
## 速度-质量-文件大小
(有损)编码总是需要在速度-质量-文件大小之间寻找平衡。
- 您可以进行快速、高质量的编码，但文件会很大
- 您可以拥有高质量、更小的文件大小，但编码将需要更长的时间
- 您可以拥有快速编码的小文件，但质量会很差

-- 

<!-- .slide: style="text-align: left;" -->
## X264的速度/质量预设
使用preset选项
```cmd
ffmpeg -i <input> -c:v libx264 -crf 23 -preset ultrafast -an output.mkv
ffmpeg -i <input> -c:v libx264 -crf 23 -preset medium -an output.mkv
ffmpeg -i <input> -c:v libx264 -crf 23 -preset veryslow -an output.mkv
```

所有的预设：ultrafast, superfast, veryfast, faster, fast, medium, slow, slower, veryslow

示例输出(相同质量):
- 预设 编码时间 文件大小
- ultrafast 4.85s 15M
- medium 24.14s 5.2M
- veryslow 112.23s .49M

---

<!-- .slide: style="text-align: left;" -->
## 改变帧率
通过丢弃或复制帧改变帧率：
```cmd
ffmpeg -i <input> -r 24 <output>
```

更复杂的方法需要过滤器(filtering)，见fps,mpdecimate,minterpolate过滤器。
```cmd
ffmpeg -i <input> -filter:v fps=24 <output>
```

---

<!-- .slide: style="text-align: left;" -->
## 流映射
每个文件和文件所属的流都有一个唯一的ID，从0开始。

- 0:0 是第一个输入文件的第一个流
- 0:1 是第一个输入文件的第二个流
- 2:a:0 是第三个输入文件的第一个音频流
- ...

你可以将输入流映射到输出，例如将音频添加到视频中
```cmd
ffmpeg -i input.mp4 -i input.m4a -c copy -map 0:v:0 -map 1:a:0 output.mp4
```

参见: https://trac.ffmpeg.org/wiki/Map

---

<!-- .slide: style="text-align: left;" -->
## 简单的过滤
ffmpeg有大量视频，音频，字幕的过滤器。
```cmd
ffmpeg -i <input> -filter:v "<filter1>,<filter2>,<filter3>" <output>
```

`<filter>`有名称和一些选项和预定义变量
```cmd
-filter:v "<name>=<option1>=<value1>:<option2>=<value2>"
```

--

<!-- .slide: style="text-align: left;" -->
## 缩放
缩放到320x240
```cmd
ffmpeg -i <input> -vf "scale=w=320:h=240" <output>
```

缩放到高240并保持宽高比能被2整除
```cmd
ffmpeg -i <input> -vf "scale=w=-2:h=240" <output>
```

缩放到1280x720或更小
```cmd
ffmpeg -i <input> -vf "scale=w=1280:h=720:force_original_aspect_ratio=decrease" <output>
```

更多建议：
- http://trac.ffmpeg.org/wiki/Scaling%20(resizing)%20with%20ffmpeg
- https://superuser.com/questions/547296/

--

<!-- .slide: style="text-align: left;" -->
## 填充(PADDING)
向视频添加黑边，例如1920x800填充到1920x1080
```cmd
ffmpeg -i <input> -vf "pad=1920:1080:(ow-iw)/2:(oh-ih)/2" <output>
```

![Arch](/assets/images/ffmpeg_padding.png)
<!-- .element: class="r-stretch" -->

注意
- 可以使用数学表达式
- ow和oh是输出视频的宽高
- iw和ih是输入视频的宽高

--

<!-- .slide: style="text-align: left;" -->
## 淡入淡出(FADING)
在特定时间持续特定长度的简单淡入淡出
```cmd
ffmpeg -i <input> -vf "fade=t=in:st=0:d=5,fade=t=out:st=30:d=5" <output>
```

--

<!-- .slide: style="text-align: left;" -->
## 文本渲染
在视频上打印文本的复杂系统
```cmd
ffmpeg -i <input> -vf drawtext="text='Hello World':fontcolor=white:fontsize=24:x=10:y=10:box=1:boxcolor=red" <output>
```
- 大量可用选项：颜色、字体、位置、大小、阴影、边框、背景
- 文本扩展（刻录帧号或时间码）
- 参见：http://ffmpeg.org/ffmpeg-all.html#drawtext-1

--

<!-- .slide: style="text-align: left;" -->
## 复杂过滤
复杂过滤器有不只一个输入或输出
```cmd
ffmpeg -i <input1> -i <input2> -filter_complex "[0:v:0][1:v:0]overlay[outv]" -map "[outv]" <output>
```

步骤：
- 指定过滤链的输入(`[0:v:0][1:v:0]`)
- 指定链中的过滤器(`overlay`)
- 指定输出标签(`[outv]`)
- 将输出标签映射到最终输出文件(`-map "[outv]"`)
- 使用`;`分割多个过滤链

参见 http://ffmpeg.org/ffmpeg-all.html#Filtergraph-syntax-1

--

<!-- .slide: style="text-align: left;" -->
## 拼接流
解码三个视频/音频流并拼接
![Arch](/assets/images/ffmpeg_concatenating.png)
<!-- .element: class="r-stretch" -->
```cmd
ffmpeg -i <input1> -i <input2> -i <input3> -filter_complex "[0:0][0:1][1:0][1:1][2:0][2:1]concat=n=3:v=1:a=1[outv][outa]" -map "[outv]" -map "[outa]" <output>
```

参见：http://trac.ffmpeg.org/wiki/Concatenate 

--

<!-- .slide: style="text-align: left;" -->
## 时间轴编辑
只在特定时间点启用过滤器

示例
- 在左上角显示水印
- 只在1~2秒时间段
```cmd
ffmpeg -i <video> -i <watermark> -filter_complex "[0:v][1:v]overlay=10:10:enable='between(t,1,2)'[outv]" -map "[outv]" <output>
```

参见：http://ffmpeg.org/ffmpeg-all.html#Timeline-editing

--

<!-- .slide: style="text-align: left;" -->
## 计算简单的质量指标
PSNR
```cmd
ffmpeg -i <degraded> -i <reference> -filter_complex psnr -f null /dev/null
```

SSIM
```cmd
ffmpeg -i <degraded> -i <reference> -filter_complex ssim -f null /dev/null
```

--

<!-- .slide: style="text-align: left;" -->
## 更多其他过滤器
- 场景变化检测器：select
- 去水印：delogo
- 模糊，边缘检测和卷积滤波器
- 视频防抖(video stablization)
- vectorscopes, 直方图以及其他信息
- 色度和alpha键(keying)
- 字幕编辑

---

## 使用ffprobe获取视频信息
<!-- .element: class="r-fit-text" -->

---

<!-- .slide: style="text-align: left;" -->
## 一般概念
```cmd
ffprobe <input>
    [-select_streams <selection>]
    [-show_streams|-show_format|-show_frames|-show_packets]
    [-show_entries <entries>]
    [-of <output-format>]
```

- `-select_streams`: 选择特定流
- `show_`: 选择要展示的信息
- `show_entries`: 选择需要展示的键值对
- `-of`: 选择输出格式

参见：
- https://ffmpeg.org/ffprobe.html
- http://trac.ffmpeg.org/wiki/FFprobeTips

--

<!-- .slide: style="text-align: left;" -->
## ffprobe使用示例1
显示所有可用流
```cmd
ffprobe <input> -show_streams
```

显示视频流信息
```cmd
ffprobe <input> -select_streams v -show_format
```

以 CSV 格式显示每帧的演示时间戳和帧类型（p=0禁用CSV标题）
```cmd
ffprobe <input> -select_streams v -show_frames -show_entries frame=pts_time,pict_type -of csv=p=0
```

--

<!-- .slide: style="text-align: left;" -->
## ffprobe使用示例2
将输出更改为 JSON 格式以进行解析
```cmd
ffprobe <input> -select_streams v -show_packets -of json
```

获取文件中的流数(nk=1禁用键)
```cmd
ffprobe <input> -show_format -show_entries format=nb_streams -of compact=nk=1:p=0
```

获取持续时间
```cmd
ffprobe <input> -show_format -show_entries format=duration -of compact=nk=1:p=0
// HH:MM:SS.ms
ffprobe -sexagesimal <input> -show_format -show_entries format=duration -of compact=nk=1:p=0
```

获取音频比特率
```cmd
ffprobe <input> -select_streams a -show_entries format=bit_rate -of compact=nk=1:p=0
```

---

## 检视视频CODECs
<!-- .element: class="r-fit-text" -->

---

<!-- .slide: style="text-align: left;" -->
## 调试运动矢量
使用ffmpeg和H.264 codec可视化运动的简单方法
```cmd
ffplay -flags2 +export_mvs input.mp4 -vf codecview=mv=pf+bf+bb
ffmpeg -flags2 +export_mvs -i input.mp4 -vf codecview=mv=pf+bf+bb <output>
```

- pf – P帧的前向预测运动矢量
- bf – B帧的前向预测运动矢量
- bb – B帧的反向预测运动矢量

更多信息：http://trac.ffmpeg.org/wiki/Debug/MacroblocksAndMotionVectors

---

<!-- .slide: style="text-align: left;" -->
## 视频流分析器
图形化分析比特流的不同软件
- Elecard Stream Analyzer (commercial)
- CodecVisa (commercial)
- Intel Video Pro Analyzer (commercial)
- AOMAnalyzer (free, AV1/VP9 video)

---

## 总结
<!-- .element: class="r-fit-text" -->

---

<!-- .slide: style="text-align: left;" -->
## 总结
你应该了解以下内容：
- 理解ffmpeg库，codec, 容器，编码器，...
- 编码视频和音频
- 应用基础过滤器
- 读取流信息和元数据
- 会自己寻求帮助

@slideend