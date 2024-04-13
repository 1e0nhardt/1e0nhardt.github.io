---
icon: pen-to-square
date: 2023-10-11
sticky: false
star: false
comment: true
category:
  - GameDev
tag:
  - godot
description: Godot组件与基本使用方法
---

# Godot组件与基本使用方法
## MenuButton
Items设置选项。

```js
func _ready():
	$MenuButton.get_popup().connect("id_pressed", on_menu_item_pressed)

    var input_event_key = InputEventKey.new()
    input_event_key.keycode = KEY_Q
    input_event_key.ctrl_pressed = true
    var shortcut = Shortcut.new()
    shortcut.events.append(input_event_key)
    
    $MenuButton.get_popup().add_shortcut(shortcut, 1, true)


func on_menu_item_pressed(id: int):
    var n = $MenuButton.get_popup().get_item_text(id)
    print(n)
    if n == "Save":        
        get_tree().quit()
```

  
FileDialog: 脚本中用$FileDialog.popup()打开窗口。玩家操作完成后获得一个路径。触发file_selected信号。

## GraphEdit
::: warning
接口在4.x版本会大改
:::

GraphNode的缩放和关闭
```js
extends GraphNode


func _ready():
    close_request.connect(on_close_request)
    resize_request.connect(on_resize_request)


func on_close_request():
    queue_free()


func on_resize_request(new_size):
    size = new_size
```

连线和断连
```js
extends Control

@onready var graph_edit = $GraphEdit

var graph_node = preload("res://graph_node.tscn")


func _ready():
    $AddNodeButton.pressed.connect(on_add_node_pressed)
    $RunButton.pressed.connect(on_run_pressed)
    graph_edit.connection_request.connect(on_connection_request)
    graph_edit.disconnection_request.connect(on_disconnection_request)


func on_add_node_pressed():
    var node_instance = graph_node.instantiate()
    graph_edit.add_child(node_instance)


func on_run_pressed():
    print(graph_edit.get_connection_list())


func on_connection_request(from, from_port, to, to_port):
    graph_edit.connect_node(from, from_port, to, to_port)


func on_disconnection_request(from, from_port, to, to_port):
    graph_edit.disconnect_node(from, from_port, to, to_port)
```

## 在2D中自定义_draw()
节点需要继承自CanvasItem。

### 绘制
- 覆盖`_draw()`函数。
- 绘制函数:
	- draw_line()
	- draw_rect()
	- ...

### 更新
- `_draw()`函数只调用一次，之后其定义的绘制指令会被缓存并记住。
- 如果确实需要重绘，调用`CanvasItem.queue_redraw()`

### 坐标空间
drawing API使用CanvasItem的坐标系。这意味着它使用应用CanvasItem转换后的坐标空间。此外，可以使用draw_set_transform或draw_set_transform_matrix应用自定义转换。

注意：在使用draw_line()和fdraw_rect()时，如果线宽为奇数，则需要将位置偏移0.5以保证线位置确实在中心。

## 无边框，窗口透明，点击穿透
### 无边框
- ProjectSettings->Display->Window->Size->Borderless

###  窗口透明
勾选
1. ProjectSettings->Display->Window->Size->Transparent
2. ProjectSettings->Rendering->Viewport->Transparent Background

```python
# 后来设置不行
ProjectSettings.set_setting("display/window/size/transparent", true)
ProjectSettings.set_setting("rendering/viewport/transparent_background", true)
```

### 点击穿透
- `DisplayServer.window_set_mouse_passthrough($Path2D.curve.get_baked_points())`
- `DisplayServer.window_set_mouse_passthrough($Polygon2D.polygon)`
用Path2D或Polygon2D确定可点击的区域，区域外的部分将被设置为点击穿透。(Window上，区域外的部分不会被渲染)

实际只需要传入一个PackedVector2Array即可，需要按polygon的顺序来。

### 子窗口的无边框和透明
```js
extend Window

func _ready():
	get_viewport().borderless = true
	get_viewport().transparent = true
	get_viewport().transparent_bg = true
	get_viewport().always_on_top = true
```


## 多窗口
```python
# Window默认是嵌入式的，设置该属性为false后创建的窗口是独立的。
get_viewport().gui_embed_subwindows = false
var new_window: Window = todo_window.instantiate()
add_child(new_window)
new_window.position = Vector2(300, 500)
new_window.visible = true
new_window.title = "X-Ray Glass"
new_window.size = Vector2(400, 400)
# 创建后可以改回来
get_viewport().gui_embed_subwindows = true
```

## Tween
tween必须用create_tween方法创建。

tweener默认是按顺序执行(chain)。可以使用set_parallel让之后的tweener并行执行。
- tween.set_parallel() # 设置多个tween并行执行
- tween.chain() # 等待所有tween执行完成

可以通过`Tween set_pause_mode ( TweenPauseMode mode )`调整场暂停时，动画的行为。

可以调整所有tweener的动画速度`Tween set_speed_scale ( float speed )`

插值方法效果参考：[easings.net](https://easings.net/en)

可以为tween创建的tweener设置默认的插值方法。
```python
var tween = get_tree().create_tween().bind_node(self).set_trans(Tween.TRANS_ELASTIC)
tween.tween_property($Sprite, "modulate", Color.RED, 1)
tween.tween_property($Sprite, "scale", Vector2(), 1)
tween.tween_callback($Sprite.queue_free)
```

- bind_node(self)表示将tween的绑定到self中。

### 避免使用多个tween操作一个属性
应该避免对一个物体的一个属性使用多个tween。同时作用于相同属性的tween，后创建效果的会覆盖先创建的。如果需要打断并重启动画，考虑将tween赋予一个变量:
```python
var tween
func animate():
	if tween:
		tween.kill() # Abort the previous animation.
	tween = create_tween()
```

Tween不是为重复使用而设计的，尝试这样做会导致未定义的行为。为每个动画以及每次从头开始重播动画时创建一个新的Tween。记住，Tween会立即启动，因此只有在要开始动画时才创建Tween。

### tween_property
- `PropertyTweener tween_property (Object object, NodePath property, Variant final_val, float duration)`
- This method tweens a ==property== of an ==object== between an initial value and ==final_val== in a span of time equal to ==duration==, in seconds.
- 初始值就是tweener开始执行时object的property的值。
- 正确的property名称可以通过将鼠标悬浮在inspector显示的属性上得到
- 支持`property:component`语法。例如单独修改position.x，则可以用`position:x`

PropertyTweener
- from(value) 手动设置tweener的初始值为value
- from_current() 手动设置tweener的初始值为创建tweener时的值，而非默认的tweener开始执行时的值。
- as_relative() 将tween_property的终值的意义改为相对位移。
- set_delay (float delay)
- set_ease (EaseType ease)
- set_trans (TransitionType trans)

例子：将物体从a到b移动两次，使用不同的过渡方法。
```python
var tween = create_tween()
tween.tween_property($Sprite, "position", Vector2.RIGHT * 300, 1).as_relative().set_trans(Tween.TRANS_SINE)
tween.tween_property($Sprite, "position", Vector2.RIGHT * 300, 1).as_relative().from_current().set_trans(Tween.TRANS_EXPO)
```

### tween_interval
- `IntervalTweener tween_interval(float time)`
- 创建一个time秒内什么都不干的tweener。
- 功能类似set_delay
- 也可以当一个计时器使用
	- `await create_tween().tween_interval(2).finished`

### tween_callback
- `CallbackTweener tween_callback(Callable callback)`
- 调用任意方法
- 通常是在动画结束时做一些收尾工作

例子:每秒调用一次
```python
var tween = get_tree().create_tween().set_loops()
tween.tween_callback(shoot).set_delay(1)
```


### tween_method
- `MethodTweener tween_method (Callable method, Variant from, Variant to, float duration)`
- It calls a method over time with a tweened value provided as an argument. The value is tweened between from and to over the time specified by duration, in seconds.
- 用插值得到的值为参数调用method。值`v=from+(to-from)*(t/duration)`

MethodTweener
- set_delay (float delay)
- set_ease (EaseType ease)
- set_trans (TransitionType trans)

## CanvasLayer
- 添加一个独立的2D渲染层
- 可以设置layer数值。数值低的先渲染
- CanvasLayer的transform是独立的，不依赖父节点的transform。
- 每个CanvasItem节点都在一个canvas layer中，每个canvas layer都有一个transform，可以通过Transform2D(2x3的矩阵，代表旋转缩放平移的仿射矩阵)获取。


