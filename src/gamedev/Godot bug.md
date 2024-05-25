---
icon: pen-to-square
date: 2024-05-15
sticky: false
star: false
comment: true
category:
  - Game
tags:
  - hazel
description: Godot bug
---
# Godot bug
FileDialog的OpenAny实际没用，相当于OpenFile。

OptionButton实现多级选项时，更新popup后不能及时生效，并且item_selected信号触发不正常，点几次以后才能正常触发。