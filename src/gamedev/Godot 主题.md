---
icon: pen-to-square
date: 2024-05-18
sticky: false
star: false
comment: true
category:
  - Game
tags:
  - hazel
description: Godot 主题
---
# Godot 主题

## 总览
theme是保存Control节点和Window节点样式设置的资源。单独Control节点的样式可以使用节点的theme_override属性修改( 代码中用Control.add_theme_color_override)，theme资源可以让所有相同类型的Control节点应用相同的样式。在 ProjectSettings.gui/theme/custom中设置的theme会应用到整个项目，在单独Control节目的theme属性中设置的theme会影响该节点以及其所有子节点。

一个Control节点的样式的确定，优先级由高到低分别为:
1. 当前节点的theme_override
2. 当前节点的theme
3. 父节点的theme
4. 项目的theme