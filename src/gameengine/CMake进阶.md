---
icon: pen-to-square
date: 2024-05-08
sticky: false
star: false
comment: true
category:
  - Game
tags:
  - hazel
description: CMake进阶
---
# CMake进阶
[小彭老师的PPT](https://github.com/parallel101/course/blob/master/11/slides.pptx)

## 命令行小技巧
传统CMake(2.x)构建
```sh
mkdir build 
cd build
cmake .. # 运行CMake，生成Makefile
make -j4 # 使用 make 真正开始构建，4线程
sudo make install # 安装
cd ..
```

现代CMake(3.x)构建
```sh
# 在源码目录用 -B 直接创建 build 目录并生成 build/Makefile
cmake -B build 
# 自动调用本地的构建系统在 build 里构建，即：make -C build -j4
cmake --build build -j4
# 调用本地的构建系统执行 install 这个目标，即安装
sudo cmake --build build --target install
```
优点：
1. 不用切换目录
2. `cmake --build build`统一了不同平台：Linux 上会调用 make，Windows 上调用 devenv.exe

### CMake项目构建--配置阶段
`cmake -B build`
- 只检测环境并生成构建规则。
- 会在 build 目录下生成本地构建系统能识别的项目文件（Makefile 或是 .sln）。
- 在配置阶段可以通过 -D 设置缓存变量。第二次配置时，之前的 -D 添加仍然会被保留。
```sh
cmake -B build -DCMAKE_INSTALL_PREFIX=/opt/openvdb-8.0
cmake -B build -DCMAKE_BUILD_TYPE=Release
cmake -B build # CMAKE_BUILD_TYPE 和 CMAKE_INSTALL_PREFIX 都会保留
```

### CMake项目构建--构建阶段
cmake --build build
- 实际调用编译器来编译代码

### -D选项--指定配置变量（又称缓存变量）
- CMAKE_INSTALL_PREFIX: 设置安装路径
- DCMAKE_BUILD_TYPE: 设置构建模式为发布模式（开启全部优化）

### -G选项--指定生成器
- 负责从 CMakeLists.txt 生成本地构建系统（指make、MSBuild）构建规则文件的，称为生成器（generator）。
- Linux 系统上的 CMake 默认用是 Unix Makefiles 生成器；Windows 系统默认是 Visual Studio 2019 生成器；MacOS 系统默认是 Xcode 生成器。
- 可以用 -G 参数改用别的生成器，例如 cmake -GNinja 会生成 Ninja 这个构建系统的构建规则。Ninja 是一个高性能，跨平台的构建系统，Linux、Windows、MacOS 上都可以用。
- Ninja 可以从包管理器里安装，没有包管理器的 Windows 可以用 Python 的包管理器安装：`pip install ninja`
- 事实上，MSBuild 是单核心的构建系统（CUDA toolkit 在 Windows 上只允许用 MSBuild 构建），Makefile 虽然多核心但因历史兼容原因效率一般。而 Ninja 则是专为性能优化的构建系统，他和 CMake 结合都是行业标准了。

## 添加源文件
最基础的方式
```cmake
add_executable(main main.cpp other.cpp)
```

先创建目标，稍后再添加源文件
```cmake
add_executable(main)
target_sources(main PUBLIC main.cpp other.cpp)
```

使用变量存储
```cmake
add_executable(main)
set(sources main.cpp other.cpp)
target_sources(main PUBLIC ${sources})
```

> [!note]
>  建议把头文件也加上，这样在 VS 里可以出现在“Header Files”一栏。

使用 GLOB 自动查找**当前目录下**指定扩展名的文件，实现批量添加源文件
```cmake
add_executable(main)
file(GLOB sources *.cpp *.h)
target_sources(main PUBLIC ${sources})
```

启用 `CONFIGURE_DEPENDS` 选项，当添加新文件时，自动更新变量
```cmake
add_executable(main)
file(GLOB sources CONFIGURE_DEPENDS *.cpp *.h)
target_sources(main PUBLIC ${sources})
```

如何将子目录中的源文件添加进来
1. `aux_source_directory`，自动搜集需要的文件后缀名
2. `file(GLOB_RECURSE sources CONFIGURE_DEPENDS *.cpp *.h)`
	1. 可能会将build目录里的临时cpp文件也包含进来
	2. 解决方法是把源码统一放到 src 目录下
	3. `file(GLOB_RECURSE sources CONFIGURE_DEPENDS src/*.cpp src/*.h)`

## 项目配置变量
### CMAKE_BUILD_TYPE
`CMAKE_BUILD_TYPE` 是 CMake 中一个特殊的变量，用于控制构建类型，其值可以是：
- Debug 调试模式，完全不优化，生成调试信息，方便调试程序
- Release 发布模式，优化程度最高，性能最佳，但是编译比 Debug 慢
- MinSizeRel 最小体积发布，生成的文件比 Release 更小，不完全优化，减少二进制体积
- RelWithDebInfo 带调试信息发布，生成的文件比 Release 更大，因为带有调试的符号信息
默认情况下`CMAKE_BUILD_TYPE`为空字符串，这时相当于 Debug。

> [!info]
> 各种构建模式在编译器选项上的区别
> 在Release模式下，追求的是程序的最佳性能表现，在此情况下，编译器会对程序做最大的代码优化以达到最快运行速度。另一方面，由于代码优化后不与源代码一致，此模式下一般会丢失大量的调试信息。
> 1. Debug: `-O0 -g`
> 2. Release: `-O3 -DNDEBUG`
> 3. MinSizeRel: `-Os -DNDEBUG`
> 4. RelWithDebInfo: `-O2 -g -DNDEBUG`
> 注意: 定义了 NDEBUG 宏会使 assert 被去除掉。

> [!note]
> 设定一个变量的默认值
> ```cmake
> if (NOT CMAKE_BUILD_TYPE)
> 	set(CMAKE_BUILD_TYPE Release)
> endif()
> ```
> 大多数 CMakeLists.txt 的开头都会有这样三行，为的是让默认的构建类型为发布模式（高度优化）而不是默认的调试模式（不会优化）。

### project
[CMake常见变量——Project和CMake相关信息](https://blog.csdn.net/fuyajun01/article/details/8891749)
初始化项目信息，并把当前 CMakeLists.txt 所在位置作为根目录。
```cmake
cmake_minimum_required(VERSION 3.15)
project(hellocmake)

# 打印项目相关信息
message("PROJECT_NAME:${PROJECT_NAME}")
message("PROJECT_SOURCE_DIR:${PROJECT_SOURCE_DIR}")
message("PROJECT_BINARY_DIR:${PROJECT_BINARY_DIR]")
# 当前源码目录的位置，例如 ~/hellocmake
message("CMAKE_CURRENT_SOURCE_DIR:${CMAKE_CURRENT_SOURCE_DIR}")
# 当前输出目录的位置，例如 ~/hellocmake/build
message("CMAKE_CURRENT_BINARY_DIR:${CMAKE_CURRENT_BINARY_DIR}")
add_executable(mainmain.cpp)
```
这里初始化了一个名称为 hellocmake 的项目，对于 MSVC，他会在 build 里生成 hellocmake.sln 作为“IDE 眼中的项目”。

> [!warning]
> `PROJECT_SOURCE_DIR` 表示最近一次调用 project 的 CMakeLists.txt 所在的源码目录。
> `CMAKE_CURRENT_SOURCE_DIR` 表示当前 CMakeLists.txt 所在的源码目录。
> `CMAKE_SOURCE_DIR` 表示最为外层 CMakeLists.txt 的源码根目录。
> 利用 `PROJECT_SOURCE_DIR` 可以实现从子模块里直接获得项目最外层目录的路径。
> 不建议用 `CMAKE_SOURCE_DIR`，那样会让你的项目无法被人作为子模块使用。

> [!info]
> `PROJECT_SOURCE_DIR`：当前项目源码路径（存放main.cpp的地方）
> `PROJECT_BINARY_DIR`：当前项目输出路径（存放main.exe的地方）
> `CMAKE_SOURCE_DIR`：根项目源码路径（存放main.cpp的地方）
> `CMAKE_BINARY_DIR`：根项目输出路径（存放main.exe的地方）
> `PROJECT_IS_TOP_LEVEL`：BOOL类型，表示当前项目是否是（最顶层的）根项目
> `PROJECT_NAME`：当前项目名
> `CMAKE_PROJECT_NAME`：根项目的项目名
> 详见：https://cmake.org/cmake/help/latest/command/project.html

子模块里也可以用 project 命令，将当前目录作为一个独立的子项目。这样一来 `PROJECT_SOURCE_DIR` 就会是子模块的源码目录而不是外层了。这时候 CMake 会认为这个子模块是个独立的项目，会额外做一些初始化。他的构建目录 `PROJECT_BINARY_DIR` 也会变成 build/<源码相对路径>。在 MSVC 上也会看见 build/mylib/mylib.vcxproj 的生成。

`project`设置了项目名后，也会设置 `<项目名>_SOURCE_DIR` 等变量。
> [!info]
> CMake 的 `${}` 表达式可以嵌套
> `${${PROJECT_NAME}_VERSION}` 相当于 `\${hellocmake_VERSION}`

### project VERSION
`project(项目名 VERSION x.y.z)`可以把当前项目的版本号设定为 x.y.z。
- 之后可以通过 `PROJECT_VERSION` 来获取当前项目的版本号。
- `PROJECT_VERSION_MAJOR` 获取 x（主版本号）。
- `PROJECT_VERSION_MINOR` 获取 y（次版本号）。
- `PROJECT_VERSION_PATCH` 获取 z（补丁版本号）。

### project LANGUAGES
`project(项目名 LANGUAGES 使用的语言列表...)`  指定了该项目使用了哪些编程语言。
```cmake
# 如果不指定 LANGUAGES，默认为 C 和 CXX。
project(hellocmake)
# 和上面等价
project(hellocmake LANGUAGES C CXX)
# 也可以先设置 LANGUAGES NONE，之后再调用 enable_language(CXX)。
project(hellocmake LANGUAGES NONE)
enable_language(CXX)
```

目前支持的语言包括：
- C：C语言
- CXX：C++语言
- ASM：汇编语言
- Fortran：老年人的编程语言
- CUDA：英伟达的 CUDA（3.8 版本新增）
- OBJC：苹果的 Objective-C（3.16 版本新增）
- OBJCXX：苹果的 Objective-C++（3.16 版本新增）
- ISPC：一种因特尔的自动 SIMD 编程语言（3.18 版本新增）


常见问题：`LANGUAGES` 中没有启用 C 语言，但是却用到了 C 语言。

### 设置C++标准
- `CMAKE_CXX_STANDARD`: 一个整数，表示要用的 C++ 标准。
- `CMAKE_CXX_STANDARD_REQUIRED`: 布尔类型，默认 OFF。表示是否一定要支持指定的 C++ 标准：如果为 OFF 则 CMake 检测到编译器不支持 C++17 时不报错，而是默默调低到 C++14 给你用；为 ON 则发现不支持报错，更安全。
- `CMAKE_CXX_EXTENSIONS`: 布尔类型。默认为 ON，表示启用 GCC 特有的一些扩展功能；OFF 则关闭 GCC 的扩展功能，只使用标准的 C++。
	- 要兼容其他编译器（如 MSVC）的项目，都会设为 OFF 防止不小心用了 GCC 才有的特性。
	- 最好是在 `project` 指令前设置 `CMAKE_CXX_STANDARD` 这一系列变量，这样 CMake 可以在 project 函数里对编译器进行一些检测。

> [!warning]
> 请勿直接修改 `CMAKE_CXX_FLAGS` 来添加 -std=c++17

### 指定最低所需的 CMake 版本
`cmake_minimum_required(VERSION 3.15)`
会对 cmake_policy 有所影响。

### CMakeLists.text模板
```cmake
cmake_minimum_required (VERSION 3.15)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

project(zeno LANGUAGES C CXX)

if (PROJECT_BINARY_DIR STREQUAL PROJECT_SOURCE_DIR)
	message(WARNING "The binary directory of CMake cannot be the same as source directory!")
endif（）

if (NOT CMAKE_BUILD_TYPE)
	set(CMAKE_BUILD_TYPE Release)
endif（）

if (WIN32)
	add_definitions(-DNOMINMAX -D_USE_MATH_DEFINES)
endif（）

if (NOT MSVC)
	find_program(CCACHE_PROGRAM ccache)
	if (CCACHE_PROGRAM)
		message(STATUS "Found CCache:${CCACHE_PROGRAM}")
		set_property(GLOBAL PROPERTY RULE_LAUNCH_COMPILE ${CCACHE_PROGRAM})
		set_property(GLOBAL PROPERTY RULE_LAUNCH_LINK ${CCACHE_PROGRAM})
	endif（）
endif（）
```

## 链接库文件
静态库
```cmake
add_library (mylib STATIC mylib.cpp)
add_executable(main main.cpp)
target_link_libraries(main PUBLIC mylib)
```

动态库
```cmake
add_library (mylib SHARED mylib.cpp)
add_executable(main main.cpp)
target_link_libraries(main PUBLIC mylib)
```

对象库
```cmake
add_library (mylib OBJECT mylib.cpp)
add_executable(main main.cpp)
target_link_libraries(main PUBLIC mylib)
```
对象库类似于静态库，但不生成 .a 文件，只由 CMake 记住该库生成了哪些对象文件。

- 对象库是 CMake 自创的，绕开了编译器和操作系统的各种繁琐规则，保证了跨平台统一性。
- 在自己的项目中，推荐全部用对象库(OBJECT)替代静态库(STATIC)避免跨平台的麻烦。
- 对象库仅仅作为组织代码的方式，而实际生成的可执行文件只有一个，减轻了部署的困难。

> [!note]
> 静态库的麻烦：GCC 编译器自作聪明，会自动剔除没有引用符号的那些对象。
> 对象库可以绕开编译器的不统一：保证不会自动剔除没引用到的对象文件。
> 虽然动态库也可以避免剔除没引用的对象文件，但引入了运行时链接的麻烦。

> [!info]
> `add_library` 无参数时，是静态库还是动态库?
> 会根据 BUILD_SHARED_LIBS 这个变量的值决定是动态库还是静态库。ON 则相当于 SHARED，OFF 则相当于 STATIC。如果未指定 BUILD_SHARED_LIBS 变量，则默认为 STATIC。
> 如果发现一个项目里的 add_library 都是无参数的，意味着你可以用：`cmake -B build -DBUILD_SHARED_LIBS:BOOL=ON`来让他全部生成为动态库。

### 常见坑点：动态库无法链接静态库
解决：让静态库编译时也生成位置无关的代码(PIC)，这样才能装在动态库里。
```cmake
set (CMAKE_POSITION_INDEPENDENT_CODE ON)
add_library(otherlib STATIC otherlib.cpp)

add_library (mylib SHARED mylib.cpp)
target_link_libraries(mylib PUBLIC otherlib)

add_executable(main main.cpp)
target_link_libraries(main PUBLIC mylib)
```
也可以只针对一个库，只对他启用位置无关的代码(PIC)
```cmake
add_library (otherlib STATIC otherlib.cpp)
set_property(TARGET otherlib PROPERTY POSITION_INDEPENDENT_CODE ON)

add_library(mylib SHARED mylib.cpp)
target_link_libraries(mylib PUBLIC otherlib)

add_executable(mainmain.cpp)
target_link_libraries(main PUBLIC mylib)
```

## 对象的属性
