---
icon: pen-to-square
date: 2023-11-11
sticky: false
star: false
comment: true
category:
  - GameDev
tag:
  - godot
description: 使用Godot中遇到的问题
---

# 使用Godot中遇到的问题

## range节点初始化设置value
value需要在step之后设置，否则value实际会被设为1.0。

## 线的抗锯齿
1. antialiased属性：开销小，但也没什么作用
2. rendering/anti_aliasing/quality/msaa_2d: 2x, 4x, 8x。效果好，开销大。只对几何边缘(线，多边形等)和sprite的边缘像素有用。
3. 插件[Antialiased-line2d](https://godotengine.org/asset-library/asset/1266)

## 属性

```js
var milliseconds: int = 0
var seconds: int:
	get:
		return milliseconds / 1000
	set(value):
		milliseconds = value * 1000
```

```js
signal changed(new_value)
var warns_when_changed = "some value":
	get:
		return warns_when_changed
	set(value):
		changed.emit(value)
		warns_when_changed = value
```

```js
var my_prop:
	get = get_my_prop, set = set_my_prop
```

## 监控属性变化
- `_set(property, value)方法`
- 有的属性需要用`set(property, value)`设置才会触发_set

## 关于vertex shader
- CanvasItem
	- VERTEX是输出，类型为vec2，表示当前节点局部坐标系中的顶点坐标，以pivot为原点，x向右增长，y向下增长。
	- 一个Sprite2D只有4个顶点，在vertex()中只能操作4个顶点。所以让其波浪形运动不能在这里实现。

## 如何实现P5对话框
- 已知
	- 顶点坐标和纹理坐标是一一对应的
	- 改变顶点坐标时，其纹理坐标并不会变
- 可得
	- 先用常规矩形设置纹理
	- 再进行适当的三角切分区分边缘和内容部分
	- 操作顶点实现边缘抖动效果

- 直接用polygon2D画出来即可
- 通过直接修改顶点位置实现动画效果
- AnimationPlayer不支持Polygon2D的顶点位置插值

## 在Shader中读取屏幕颜色
```glsl
uniform sampler2D screen_texture : hint_screen_texture, repeat_disable, filter_nearest;

vec4 screen_color = textureLod(screen_texture, SCREEN_UV, 0.0);
```

注意：在编辑器中，SCREEN_UV是以当前2D视口计算的，视口的左上角为(0, 1)，右下角为(1, 1)。而非2D视口中的屏幕区域。

## 脚本控制shader参数
```js
(sprite.material as ShaderMaterial).set_shader_parameter("percent", 1.0)

tween.tween_property(sprite.material, "shader_parameter/percent", 0.0, 0.25)
```


## 4.0引入的global & instance uniform
### global uniform
1. 在ProjectSettings->Shader Globals中添加
2. 在shader中用global uniform声明即可

用例：
1. 将玩家位置传给shader：塞尔达中林克在草地上走动时，草倒地效果。
2. 塞尔达中天气的变化
3. 塞尔达中材质与环境的交互

### instance uniform
将shader参数变成每个节点独立

限制：
1. 每个shader最多16个
2. 不支持纹理
3. 存在多个shader是，只有第一个shader的会生效。

## tween变化global_position
速度快了会有点抖。

## 最佳实践--先改变属性，再添加节点
因为添加节点到场景后，在改变属性，会调用相应属性的setter方法。部分情况下会使游戏卡顿(例如程序化生成很多节点时)。

## 对场景子节点的操作需要在添加节点到场景后执行
只有添加到场景后，get_node/$/%才有效。

## load vs preload
- preload: 尽早加载资源。
- load: 执行到这一行时才加载资源。
- preload加载的资源不应该改变
- preload的资源只有在所在脚本被卸载时才释放
- load的资源，设为null时会移除所有到该资源的引用，并从内存中释放。

## shader 代码共享
1. 创建gdshaderinc文件，保存公用函数
2. `#include "res://xx/xx.gdshaderinc"`

## 实现Drag and Drop的简单方法
使用StaticBody2D节点，将Input->pickable设为true，用CollisionShape2D确定拖拽生效区域。

```js
extends StaticBody2D

var can_drag = false


func _input_event(_viewport, event, _shape_idx):
    if event is InputEventMouseButton:
        can_drag = event.pressed


func _process(_delta):
    if Input.is_mouse_button_pressed(MOUSE_BUTTON_LEFT) and can_drag:
        position = get_global_mouse_position()
```

## sprite.get_rect() & sprite.global_position
- sprite.get_rect()返回的是局部坐标系中的坐标。
- sprite.global_position 返回锚点的位置
	- Offset->Centered on: 图片中心点
	- Offset->Centered off: 图片左上角

## 调用父类方法
在覆盖父类的方法内用super方法以相同参数调用：`super(args)`。

## autoload类初始化问题
- 不能在自定义类的初始化函数中传入实际节点。此时，节点尚未生成。

## Control & Node2D
- control 
	- 有Rect定义其内容(Rect是在局部坐标系中表示的)
	- anchor position: 锚点，相对于父Control或Viewport
	- offset：相对锚点的偏移。在节点，父节点或屏幕尺寸大小改变时。
- Node2D
	- Node+Transform组件

## Event系统
- 输入事件从场景树的根节点通过调用`Node._input()`向下传播
- UI节点更适合用`_gui_input()`，过滤了一些无关的事件，如:检查z-order，鼠标过滤，聚焦以及在Bounding Rect之外发生的事件
- 调用accept_event()将接受事件，其他节点将不会收到该事件，Node.unhandled_input也不会处理它。
- 设置[mouse_filter](https://docs.godotengine.org/en/stable/classes/class_control.html#class-control-property-mouse-filter)可以告诉Control节点忽略鼠标事件

## 获取Label的字体，字体大小
- `label.get_theme_font_size("font_size")`
- `label.get_theme_font("font")`
- Label的宽度基本等于`label.get_theme_font_size("font_size") * label.text.length`

## 多窗口
- 在主窗口设置: `get_viewport().gui_embed_subwindows = false`。
- 然后添加的Window场景，就会单独显示窗口。

## Sprite2D的PlaceholderTexture的UV不对
TextrureRect的没问题

