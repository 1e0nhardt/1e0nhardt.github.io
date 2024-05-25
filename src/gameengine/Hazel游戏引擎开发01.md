---
icon: pen-to-square
date: 2024-04-30 
sticky: false
star: false
comment: true
category:
  - GameEngine
tag:
  - hazel
description: Hazel游戏引擎开发01
---

# Hazel游戏引擎开发01

## 整体设计
- EntryPoint：引擎启动时什么控制什么发生。main函数之类的
- Applicatio layer：应用生命周期(run loop...)，事件
- Window layer
	- Input
	- Event
- Renderer
- Render API abstraction
- Debugging support
- Scripting language
- Memory System
- ECS
- Physics
- File I/O, VFS
- Build System：将外部资产格式转换为引擎内部格式。Import, reload。

## 项目设置
### 解决方案准备
1. 在Github上创建Hazel项目
2. 创建一个VS解决方案Hazel
3. 将github项目克隆到本地文件夹，然后将内容(.git, LICENSE, README.md)移动到Hazel解决方案的根目录下
4. 最终效果如图
![](/assets/images/Hazel游戏引擎开发01_1.png)
### Hazel项目属性设置
Hazel项目上右键->属性
![](/assets/images/Hazel游戏引擎开发01_2.png)
新建Sandbox项目，用于测试引擎。
属性设置同上，但配置类型不用该，exe即可。

让Sandbox项目引用Hazel项目：构建Sandbox项目时，会自动编译链接Hazel项目生成的动态库
Sandbox项目->右键->添加->引用：勾选Hazel，确定。
![](/assets/images/Hazel游戏引擎开发01_3.png)
> [!note]
> VS编译dll时也会生成一个lib文件。使用时lib相当于头文件，实际代码在dll中。例如assimp库，指定lib后还需将assimp-vc143-mtd.dll放到项目中。

## EntryPoint
定义预编译宏：项目->右键->属性，面板中找 C/C++->预处理器->预处理器定义， 添加指定的宏定义。

> [!note]
> VS新建空项目可能出现属性面板没有C/C++这一项的bug。解决方法是随便写点代码，运行一下，再打开属性，面板就有了。

> [!note]
> CreateApplication方法，视频中加了Hazel::前缀，我用vs2022,c++17加了反而报错，去掉才行。

> [!note]
> EntryPoint的作用就是将main函数移动到Hazel引擎项目中，由引擎来管理。这样客户端只需要定义一个返回Application指针的方法。

## 添加日志系统
1. 添加git子模块：git submodule add https://github.com/gabime/spdlog Hazel/vendor/spdlog
2. 设置头文件：项目属性->C/C++->常规->附加包含目录中增加Hazel\\vendor\\spdlog\\include

> [!bug]
> spdlog在vs2022中有[bug](https://github.com/microsoft/cpprestsdk/issues/1768)，需要在预处理器定义中添加_SILENCE_STDEXT_ARR_ITERS_DEPRECATION_WARNING。
> 

## 构建工具-premake-beta2

```lua
workspace "Hazel"
    architecture "x64"
    -- 设置启动项目
	startproject "Sandbox"
    configurations { "Debug", "Release", "Dist" }

-- 定义变量
outputdir = "%{cfg.buildcfg}-%{cfg.system}-%{cfg.architecture}"

project "Hazel"
	-- 项目文件夹位置
    location "Hazel"
    -- 配置类型
    kind "SharedLib"
    language "C++"

	-- 输出目录
    targetdir ("bin/" .. outputdir .. "/%{prj.name}")
    -- 中间目录
    objdir ("bin-int/" .. outputdir .. "/%{prj.name}")

    files { 
        "%{prj.name}/src/**.h",
        "%{prj.name}/src/**.cpp"
    }

	-- C/C++->常规->附加包含目录
    includedirs
    {
        "%{prj.name}/vendor/spdlog/include"
    }

    filter "system:windows"
        cppdialect "C++17" -- C++语言标准
        -- On:代码生成的运行库选项是MTD,静态链接MSVCRT.lib库; 
        -- Off:代码生成的运行库选项是MDD,动态链接MSVCRT.dll库;
        staticruntime "On"
        systemversion "latest" -- WindowsSDK

		-- C++->预处理器->预处理器定义
        defines
        {
            "HZ_PLATFORM_WINDOWS",
            "HZ_BUILD_DLL",
            "_SILENCE_STDEXT_ARR_ITERS_DEPRECATION_WARNING"
        }
		
		-- 构建后执行命令
        postbuildcommands
        {
	        -- COPY弃用了，改成这样即可
            ("{COPYFILE} %{cfg.buildtarget.relpath} ../bin/" .. outputdir .. "/Sandbox/%{cfg.buildtarget.name}")
        }

    filter "configurations:Debug"
        defines "HZ_DEBUG"
        symbols "On"

    filter "configurations:Release"
        defines "HZ_RELEASE"
        optimize "On"

    filter "configurations:Dist"
        defines "HZ_DIST"
        optimize "On"


project "Sandbox"
    location "Sandbox"
    kind "ConsoleApp"
    language "C++"

    targetdir ("bin/" .. outputdir .. "/%{prj.name}")
    objdir ("bin-int/" .. outputdir .. "/%{prj.name}")

    files { 
        "%{prj.name}/src/**.h",
        "%{prj.name}/src/**.cpp"
    }

    includedirs
    {
        "Hazel/vendor/spdlog/include",
        "Hazel/src",
    }

    links {
        "Hazel"
    }

    filter "system:windows"
        cppdialect "C++17"
        staticruntime "On"
        systemversion "latest"

        defines
        {
            "HZ_PLATFORM_WINDOWS",
            "_SILENCE_STDEXT_ARR_ITERS_DEPRECATION_WARNING"
        }

    filter "configurations:Debug"
        defines "HZ_DEBUG"
        symbols "On"

    filter "configurations:Release"
        defines "HZ_RELEASE"
        optimize "On"

    filter "configurations:Dist"
        defines "HZ_DIST"
        optimize "On"
```

