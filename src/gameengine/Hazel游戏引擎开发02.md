---
icon: pen-to-square
date: 2024-04-30 
sticky: false
star: false
comment: true
category:
  - Game
tag:
  - hazel
description: Hazel游戏引擎开发02 
---

# Hazel游戏引擎开发02
## 事件系统
```cpp
#define EVENT_CLASS_TYPE(type) static EventType GetStaticType() { return EventType::##type; }\
								virtual EventType GetEventType() const override { return GetStaticType(); }\
								virtual const char* GetName() const override { return #type; }
```

1. '#' 表示：对应变量字符串化  
2. '##'表示：把宏参数名与宏定义代码序列中的标识符连接在一起，形成一个新的标识符

```cpp
template<typename T>
using EventFn = std::function<bool(T&)>; 
```
声明了一个函数指针，返回值为bool，参数为T&。


## 预编译头文件
用途：
1. 通过预编译不会改动的头文件(标准库，外部库等)加快编译速度。
2. 方便编写代码。不用一直手动包含常用的头文件，只需包含一个预编译头文件。

使用建议：
1. 不要将会频繁改动的头文件包含在预编译头文件中，因为一旦这些文件发生改动，预编译头文件也需要重新编译。
2. 一些只有一两个文件用到的头文件(不常用的头文件)就不要放进来了，节省不了多少时间。另外，如果真将所有头文件都放进来，模块的依赖关系就被隐藏了。如果要将项目中的代码移动到另一个项目，就没法快速知道其依赖的头文件。
3. 所有项目都应该使用。

使用方法：
1. 新建pch.h, pch.cpp
2. pch.cpp->C/C++->预编译头->预编译头: 选择创建
3. 项目->C/C++->预编译头->预编译头：选择创建。
4. 项目->C/C++->预编译头->预编译头文件： pch.h
5. 每个cpp文件的第一个include必须是pch.h

premake5:
在project下添加：
```lua
project "xx"
	-- ...
	pchheader "hzpch.h"
	pchsource "Hazel/src/hzpch.cpp"
	-- ...
```
	
## 窗口抽象和GLFW
1. 添加git子模块：git submodule add https://github.com/TheCherno/glfw Hazel/vendor/GLFW
2. Cherno提供的glfw库中多了一个premake5.lua用于将glfw配置为vs的项目(需要在system:window下加上staticruntime: "On"，否则会报错)
3. 在项目根目录的premake5.lua引入glfw的premake配置，并配置好链接和包含目录

```lua
IncludeDir = {}
IncludeDir["GLFW"] = "Hazel/vendor/GLFW/include"

-- 将Hazel/vendor/GLFW目录下的premake5.lua包含过来
include "Hazel/vendor/GLFW"

project "Hazel"
	...
    includedirs
    {
		"%{prj.name}/src",
        "%{prj.name}/vendor/spdlog/include",
        "%{IncludeDir.GLFW}"
    }

    links 
    {
        "GLFW",
        "opengl32.lib"
    }
    ...
```

## Glad
**运行时**获取OpenGL函数地址并将其保存在函数指针中供以后使用（一个函数对应一个函数指针）。
https://glad.dav1d.de/

GLFW_INCLUDE_NONE? 让GLFW不包含OpenGL

## imgui
git checkout docking
