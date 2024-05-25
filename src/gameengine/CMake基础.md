---
icon: pen-to-square
date: 2024-05-07
sticky: false
star: false
comment: true
category:
  - Game
tags:
  - hazel
description: CMake基础
---
# CMake基础
[小彭老师的PPT](https://github.com/parallel101/course/blob/master/01/slides.pptx)
## 构建
- `cmake -B build`: 读取当前目录的 CMakeLists.txt，并在 build 文件夹下生成 build/Makefile
- `cmake --build build`: 让 make 读取 build/Makefile，并开始构建 a.out

## 库
- 分为静态库和动态库
	- 静态库相当于直接把代码插入到生成的可执行文件中，会导致体积变大，但是只需要一个文件即可运行。
	- 动态库则只在生成的可执行文件中生成“插桩”函数，当可执行文件被加载时会读取指定目录中的.dll文件，加载到内存中空闲的位置，并且替换相应的“插桩”指向的地址为加载后的地址，这个过程称为重定向。这样以后函数被调用就会跳转到动态加载的地址去。
- 库搜索路径
	- Windows：可执行文件同目录，其次是环境变量%PATH%
	- Linux：ELF格式可执行文件的RPATH，其次是/usr/lib等

- `add_executable`: 生成可执行文件。add_executable(a.out main.cpp)
- `add_library`: 生成库文件
	- 生成静态库：`add_library(test STATIC source1.cpp source2.cpp)`
	- 生成动态库：`add_library(test STATIC source1.cpp source2.cpp)`
- 创建库以后，要在某个可执行文件中使用该库，只需要：
	- `target_link_libraries(myexec PUBLIC test)`  # 为 myexec 链接刚刚制作的库 libtest.a
	- PUBLIC 表示可传播。

## 头文件
1. 为什么 C++ 需要声明？
	1. 因为需要知道函数的参数和返回值类型：这样才能支持重载，隐式类型转换等特性。
	2. 让编译器知道 hello 这个名字是一个函数，不是一个变量或者类的名字
2. 为什么需要头文件？为了避免手动重复写很多声明。
3. `#include "hello.h"`的实际作用是将hello.h文件的内容传入`#include`所在位置
	1. `<cstdio>` 这种形式表示不要在当前目录下搜索，只在系统目录里搜索
	2. `"hello.h"` 这种形式则优先搜索当前目录，找不到再搜索系统目录
4. 防止重复定义
	1. `#pragma once`
	2. `#ifndef`

## 子模块
- 复杂的工程中，我们需要划分子模块，通常一个库一个目录
- 把 hellolib 库的东西移到 hellolib 文件夹下，里面的 CMakeLists.txt 定义 hellolib 的生成规则。
- 要在根目录使用他，可以用 CMake 的 `add_subdirectory`添加子目录，子目录也包含一个 CMakeLists.txt，其中定义的库在 `add_subdirectory` 之后就可以在外面使用。
	- 子目录的 CMakeLists.txt 里路径名（比如 hello.cpp，不用写 hellolib/hello.cpp）都是相对路径
- 通过 `target_include_directories` 指定子模块的头文件
	- 通过 `target_include_directories` 指定的路径会被视为与系统路径等价
- 除了在构建a.out的CMakeLists.txt中使用`target_include_directories`添加库目录。也可以在构建库文件时用`target_include_directories`指定库目录（例如`target_include_directories(hellolib PUBLIC .)`），这样在a.out的CMakeLists.txt中用`target_link_libraries(myexec PUBLIC test)`引入库时就会自动添加相应的库目录，如果不想自动添加，则可以将PUBLIC改为PRIVATE。这就是他们的用途：决定一个属性要不要在被 link 的时候传播。

## 目标选项
- target_include_directories(myapp PUBLIC /usr/include/eigen3)  # 添加头文件搜索目录
- target_link_libraries(myapp PUBLIC hellolib)                               # 添加要链接的库
- target_add_definitions(myapp PUBLIC MY_MACRO=1)             # 添加一个宏定义
- target_add_definitions(myapp PUBLIC -DMY_MACRO=1)         # 与 MY_MACRO=1 等价
- target_compile_options(myapp PUBLIC -fopenmp)                     # 添加编译器命令行选项
- target_sources(myapp PUBLIC hello.cpp other.cpp)                    # 添加要编译的源文件

以及可以通过下列指令（不推荐使用），把选项加到所有接下来的目标去：
- include_directories(/opt/cuda/include)     # 添加头文件搜索目录
- link_directories(/opt/cuda)                       # 添加库文件的搜索路径
- add_definitions(MY_MACRO=1)             # 添加一个宏定义
- add_compile_options(-fopenmp)             # 添加编译器命令行选项

## 第三方库
### 纯头文件库
1. nothings/stb - 大名鼎鼎的 stb_image 系列，涵盖图像，声音，字体等，只需单头文件！
2. Neargye/magic_enum - 枚举类型的反射，如枚举转字符串等（实现方式很巧妙）
3. g-truc/glm - 模仿 GLSL 语法的数学矢量/矩阵库（附带一些常用函数，随机数生成等）
4. Tencent/rapidjson - 单纯的 JSON 库，甚至没依赖 STL（可定制性高，工程美学经典）
5. ericniebler/range-v3 - C++20 ranges 库就是受到他启发（完全是头文件组成）
6. fmtlib/fmt - 格式化库，提供 std::format 的替代品（需要 -DFMT_HEADER_ONLY）
7. gabime/spdlog - 能适配控制台，安卓等多后端的日志库（和 fmt 冲突！）

- 只需要把他们的 include 目录或头文件下载下来，然后 include_directories(spdlog/include) 即可。
- 缺点：函数直接实现在头文件里，没有提前编译，从而需要重复编译同样内容，编译时间长。

### 作为子模块引入
第二友好的方式则是作为 CMake 子模块引入，也就是通过 add_subdirectory。
方法就是把那个项目（以fmt为例）的源码放到你工程的根目录。

这些库能够很好地支持作为子模块引入：
1. fmtlib/fmt - 格式化库，提供 std::format 的替代品
2. gabime/spdlog - 能适配控制台，安卓等多后端的日志库
3. ericniebler/range-v3 - C++20 ranges 库就是受到他启发
4. g-truc/glm - 模仿 GLSL 语法的数学矢量/矩阵库
5. abseil/abseil-cpp - 旨在补充标准库没有的常用功能
6. bombela/backward-cpp - 实现了 C++ 的堆栈回溯便于调试
7. google/googletest - 谷歌单元测试框架
8. google/benchmark - 谷歌性能评估框架
9. glfw/glfw - OpenGL 窗口和上下文管理
10. libigl/libigl - 各种图形学算法大合集

### 引用系统中预安装的第三方库
可以通过 find_package 命令寻找系统中的包/库：
```cmake
find_package(fmt REQUIRED)
target_link_libraries(myexec PUBLIC fmt::fmt)
```

> [!note] 
> 为什么是 fmt::fmt 而不是简单的 fmt？
> 现代 CMake 认为一个包 (package) 可以提供多个库，又称组件 (components)，比如 TBB 这个包，就包含了 tbb, tbbmalloc, tbbmalloc_proxy 这三个组件。
> 因此为避免冲突，每个包都享有一个独立的名字空间，以 :: 的分割。

你可以指定要用哪几个组件
```cmake
find_package(TBB REQUIRED COMPONENTS tbb tbbmalloc REQUIRED)
target_link_libraries(myexec PUBLIC TBB::tbb TBB::tbbmalloc)
```

