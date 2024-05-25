---
icon: pen-to-square
date: 2024-04-30 
sticky: false
star: false
comment: true
category:
  - Note
tags:
  - specification
description: ass字幕格式
---
# ass字幕格式
来源： https://github.com/libass/libass/wiki/ASS-File-Format-Guide

TODO：
了解ass格式。样式设置。
ass解析器。
python-vlc 如何播放视频外挂字幕。如何实时修改ass字幕。
ffmpeg嵌入软字幕，硬字幕。
b站是否支持软字幕。

## 概述
- 一个ASS/SSA字幕文件通常被称为"script"
- 字幕文件由多个类似ini文件的节(section)组成。每节第一行为`[section_title]`。前后无空格。两节之间至少有一个空行。
- 除了`[Fonts]`节，其他节的每一行都必须是完整，独立的陈述。单个陈述不允许拆分为多行。
- 每个节只能出现一次，并按`[Script Info]`, `[V4++ Style]`, `[Events]`的顺序出现。这三个节是必须有的。`[Fonts]`节是可选的。
- 文件必须为有效的UTF-8格式，并且可以使用UNIX风格或DOS风格的换行符。为了使更多编辑器能够识别，文件开头应添加UTF-8 BOM。
- 除非另有指示，否则整数和小数必须使用10进制，并且不得添加任何领先或尾随的零。
- ASS坐标系的原点在左上角。

## Script Info节
- 节头为`[Script Info]`
- 本节可以设置全局标头(global header)值来影响其他所有内容的行为。
- 标头格式`header_name: header_value`，冒号后的空格不能省略。
- 必须有`ScriptType`标头
- 应该至少有`ScaledBorderAndShadow`、`YCbCr Matrix`、 `PlayResX`、`PlayResY`、`LayoutResX`、`LayoutResY`这些标头。
- 如果脚本是由程序生成或通过编辑器编写的，则通常会在该`[Script Info]`部分的第一行中插入对此的注释。格式为`; comment content`。分号后的空格不能省略

### 功能标头
- ScriptType: SSAv4文件设为`v4.00`，ASS文件设为`v4.00+`，ASS2文件设为`v4.00++`。必须匹配以后在样式和事件部分中使用的格式。
- ScaledBorderAndShadow: 设为yes。
- YCbCr Matrix: 有效的值为`<range>.<colour space>`
	- range: 可以是PC(全范围)，或TV(受限范围)
	- colour space: 601(BT601), 709(BT709), 240M(SMPTE240M),FCC
- LayoutResX and LayoutResY: 设置为相应视频的原生显示尺寸。(应该就是分辨率)
- PlayResX and PlayResY:  创建新文件时和LayoutResX and LayoutResY保持一致。会影响Fontsize的实际大小。
- WrapStyle: 设置全局默认的换行行为。
	- 0: 默认值。在空格或`\n`处换行，每行长度尽量相当。
	- 1: 在空格或`\n`处换行，只把溢出的文本放到下一行。
	- 2: 只会在`\N`处换行。(排版应激活此模式`\q`，但除非执行纯 Sign&Song 脚本，否则全局启用此模式可能没有多大意义)

### 信息标头
以下标头不会影响渲染，但可用于记录有关脚本的元数据： `Title`, `Original Script`, `Original Translation`, `Original Editing`, `Original Timing`, `Script Updated By`, `Update Details`。值没有特别的格式，只要不包含换行或其他ASCII控制序列即可。

## Style节
### v4+(ASS) 风格
- 节头为`[V4+ Styles]`
- 第一行为格式定义，必须是`Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding`
- 后续则逐行逐个按Format定义后续会用到的字体样式。
	- 布尔值`false`必须用`0`表示，`true`必须用`-1`表示。
	- 颜色值必须使用16进制值，加上`&H`前缀。颜色和AlphaGo通道的声明顺序为`ABGR`。`&H00`为完全不透明，`&HFF`为透明。对于不接受 alpha 通道的覆盖标签(override tags)，必须仅指定`BGR`且不指定 alpha。
	- 所有使用的字体及其变体必须存在并且必须附加到最终版本中。
- `Name`: 必须是唯一的非空字符串，不得以空格开头或结尾。稍后用于引用和使用定义的样式。
- `Fontname`: 设置所需字体的系列名称。不得超过 31 个字符，并且字体的系列名称必须在所有平台上匹配。
- `Spacing`： 浮点数。在每个字形之间应用间距。
- `BorderStyle`: 可以`1`用于扩展字形形状的常规轮廓，也`3`可以使用矩形框代替。
- `Alignment`：参见`\an`允许值。
- `Encoding`: 必须始终设置为`1`。
- `Fontsize`:浮点数。
- `PrimaryColour`, `SecondaryColour`, `OutlineColour`, `BackColour`: ABGR颜色值。
- `Bold`, `Italic`, `Underline`, `StrikeOut`: 布尔值。
- `ScaleX`, `ScaleY`: 浮点数。
- `Outline`, `Shadow`: 浮点数。
- `Angle`: 浮点数。
- `MarginL`, `MarginR`, `MarginV`: 整数。

### 其他风格
略

## Fonts节
此部分是可选的，包含嵌入到字幕文件本身中的字体。如果没有嵌入字体，则必须省略该部分。

如果可能，您应该将字体附加到 MKV 容器（或类似的多媒体容器），而不是将它们嵌入到字幕文件本身中。

## Events节
### 格式
- 节头为`[Events]`
- 有两类事件。格式取决于格式版本。
	- `Dialogue`，将在指定的时间和位置渲染到屏幕上
	- `Comment`，不渲染但显示在编辑器中。
- v4+格式中，节头下一行必须为`Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text`
- 除最后一个`Text`字段外，任何字段值都不允许包含逗号。
- `Layer`：范围内的整数值`[0, 2³¹-1]`。低值先渲染。
- `Start`/ `End`：事件的开始/结束时间；字幕只会在这些时间之间显示； start 与 end 是互斥的。格式为`h:mm:ss.dd`。
- `Style`：必须与先前定义的名称完全匹配`Style`。该样式定义将用于整个事件。
- `Name`：一个自由格式的元数据字段，主要用于指示角色正在说/正在思考/...这段对话。不影响渲染。
- `Margin*` : 如果非零，则覆盖样式中的相应值`MarginR`。`MarginV`
- `Effect`：应用于事件的效果。主要是一些滚动效果。略。
- `Text`：包含将在屏幕上显示的文本和命令。该字段允许包含逗号。

### 覆盖标签
- 见[Aegisub 文档](https://aegisub.org/docs/latest/ass_tags/)
- 不要使用`\fe`，使用`\blur`而非`\be`
- 换行使用`\N`, 尽量不要用`\n`。

## 示例文件
```text
﻿[Script Info]
ScriptType: v4.00+
ScaledBorderAndShadow: yes
YCbCr Matrix: None
PlayResX: 640
PlayResY: 360
LayoutResX: 640
LayoutResY: 360
WrapStyle: 0

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Default,DejaVu Sans,65,&H007F67D0,&H00187DC1,&H00000000,&H00D4AA86,-1,0,0,0,100,100,0,0,1,0.4,0,7,10,10,10,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
Comment: 0,0:00:00.00,0:00:06.99,Default,,0,0,0,,Placeholder; replace with proper type later
Dialogue: 0,0:00:00.00,0:00:06.99,Default,,0,0,0,,{\pos(52,72)\an7\1c&HB3B3B3&\p1}m 2 34 l 8 60 112 37 107 24{\p0}
Dialogue: 0,0:00:00.00,0:00:06.99,Default,,0,0,0,,{\q2\shad0\bord2\fs36\org(126.31,107.61)\pos(128.85,116.69)\fax-0.068131\fscx207.70\fscy50.43\frz4.2185\frx25.9522\fry63.2018}Bakery
```