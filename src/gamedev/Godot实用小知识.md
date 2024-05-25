---
icon: pen-to-square
date: 2024-05-12
sticky: false
star: false
comment: true
category:
  - Game
tags:
  - hazel
description: Godot实用小知识
---
# Godot实用小知识
## 文档注释
https://docs.godotengine.org/zh-cn/4.x/tutorials/scripting/gdscript/gdscript_documentation_comments.html
`#`为普通注释，`##`为文档注释。文档注释必须写在成员声明之前，或写于脚本顶部来为脚本提供基本说明。若使用文档注释注释了导出变量，则可在编辑器中通过悬停窗来查看该导出变量的文档注释。

## 忽略警告
- 修改项目配置，影响所有文件。
	- 例如：忽略未使用的参数警告。 project->settings->debug/gdscript/warnings/unused_parameter
- 装饰器，在某个函数中忽略特定警告
	- 例如：忽略整数除法警告。@warning_ignore("integer_division")

## 仅在编辑器中运行
@tool当在脚本的顶部添加时，脚本会在编辑器中执行。

可以使用Engine.is_editor_hint()确定脚本的哪些部分在编辑器中执行，在游戏中以及两者兼而有之。

- 对于不在编辑器中执行的Node，只能访问其默认属性，不能访问用户定义的属性。
- Autoload节点始终不能访问。
- 新增加的@tool脚本需要重启才能在编辑器中生效

## Godot节点生命周期
- `_init()`: 构造器。Class.new()
- `_ready()`: 所有子节点都准备好了后，被通知ready后调用。 
- `_enter_tree()` :  DFS遍历到时调用。
- `_exit_tree()`: DFS返回时调用。
- `_process(delta)`: 每帧调用。tick()
- `_physics_process(delta)`
- `_input(event)`: 接受游戏中所有事件
- `_unhandled_input(event)`
- `_notification(what)`: 节点中发生的所有事件的通知

典型用例：当玩家在游戏窗口外点击时，暂停游戏。
```js
func _notification(what):
	if what == Mainloop.NOTIFICATION_APPLICATION_FOCUS_OUT:
		pause_game()
```

## owner vs get_parent()
- owner
	- 在当前场景中:
		- 非根节点的owner就是根节点
		- 根节点的owner为null
	- 添加到其他场景中：
		- 非根节点的owner就是原场景根节点
		- 根节点的owner为新场景的根节点
	- 由脚本动态生成的节点的默认`Owner`是`null`
- get_parent():
	- 在当前场景中:
		- 非根节点：当前节点的父节点
		- 根节点：root
	- 添加到其他场景中：当前节点的父节点

## :=
`var life_points := 4`
写冒号但省略写类型时,Godot将尝试推测类型

## 如何获取当前代码所在文件，行数，函数
get_stack(): 返回一个字典的数组，存储了当前调用栈的信息。
```python
# Returns an array of dictionaries representing the current call stack. See also print_stack().

func _ready():
    foo()

func foo():
    bar()

func bar():
    print(get_stack())

>>>
[{function:bar, line:12, source:res://script.gd}, {function:foo, line:9, source:res://script.gd}, {function:_ready, line:6, source:res://script.gd}]
```

## 在GDScript中创建资源并保存
```python
var atlas_res = AtlasTexture.new()
atlas_res.region = Rect2(441, 556, 35, 35)
atlas_res.margin = Rect2(3.5, 3.5, 7, 7)
# ...
ResourceSaver.save(atlas_res, "res://resources/test.tres")
```

## Resource类与实例
- 通过load或preload加载相同的Resources，返回的是相同的实例
- 定义属性时，最好指定类型
- 只有export的属性会被序列化

## 枚举
gdscript的枚举实际相当于
```python
const enum_name = {
	ENUM_TYPE1 = 0,
	ENUM_TYPE2 = 1,
	ENUM_TYPE3 = 2,
}
```
