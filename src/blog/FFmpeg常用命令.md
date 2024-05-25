---
icon: pen-to-square
date: 2024-04-30 
sticky: false
star: false
comment: true
category:
  - Blog
tags:
  - ffmpeg
description: FFmpeg常用命令
---
# FFmpeg常用命令

## 基础
简单来说，FFmpeg 命令行程序需要以下参数格式来执行操作： `ffmpeg {1} {2} -i {3} {4} {5}`，分别是:

1. 全局参数
2. 输入文件参数
3. 输入文件
4. 输出文件参数
5. 输出文件

选项 2、3、4、5 可以可以根据自己的需求进行添加。

## mkv->mp4
`ffmpeg -i input.mkv -vcodec copy -acodec copy out.mp4`
`ffmpeg -i "%1" -vcodec h264 -acodec aac "%1.mp4"`

## 加软字幕
https://www.jianshu.com/p/f33910818a1c
`ffmpeg -i test.mp4 -i test.srt -c copy output.mkv`

## 软字幕转硬字幕
https://www.jianshu.com/p/f33910818a1c
`ffmpeg -i test.mkv -vf subtitles=test.srt out.mp4`

## 直接生成硬字幕
`ffmpeg -i "input.mp4" -vcodec h264_nvenc -vf subtitles=test.ass "out.mp4"`

## 提取字幕
`ffmpeg -i video_file.mp4 -map 0:s:0 subtitle.srt`

## 删除字幕
`ffmpeg -i video.mkv -vcodec copy -acodec copy -sn video-no-subs.mkv`

## 转换字幕格式
`ffmpeg -i subtitle.srt subtitle.ass`

## 提取音频
`ffmpeg -i test.mp4 -f mp3 -vn test.mp3`

## GPU加速
`ffmpeg -i input -vcodec h264_nvenc output`

## 设置码率
`-b 5M`