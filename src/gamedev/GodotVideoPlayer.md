---
icon: pen-to-square
date: 2024-05-23
sticky: false
star: false
comment: true
category:
  - Game
tags:
  - hazel
description: GodotVideoPlayer
---
# GodotVideoPlayer

## 项目设置
- 项目描述
- 版本号
- 使用自定义用户目录：方便看日志
	- use custom user dir
	- custom user dir name
- 视口：1920x1080
- 禁用垂直同步。播放视频时帧率能更高。
- ClearColor：改为纯黑
- Debug->File Logging->Enable File logging 开


## 设置gdextension
### 流程
1. `git submodule add -b 4.2 https://github.com/godotengine/godot-cpp gd_extensions/godot_cpp` 添加子模块，版本需要对应
2. Sconstruct
3. build.py
4. gozen.gdextension
5. 插件编写

```python
# Sconstruct
import os

env = SConscript("../godot_cpp/SConstruct")
env.Append(CPPPATH=['src'])
dest_dir = "../../src/bin/gozen/"

num_jobs = ARGUMENTS.get('jobs', 16)
platform = ARGUMENTS.get('platform', 'windows')

src = Glob("src/*.cpp")
libpath = '{}libgozen{}{}'.format(dest_dir, env['suffix'], env['SHLIBSUFFIX'])
shardlib = env.SharedLibrary(libpath, src)

Default(shardlib)
```

```python
#  build.py
import os

os.chdir("gd_extensions/gozen")
os.system("scons -j 16 target=template_debug")
os.chdir("../..")
```

```yaml
[configuration]

entry_symbol = "gozen_library_init"
compatibility_minimum = 4.2
reloadable = true # 热更新dll

[libraries]

windows.debug.x86_64 = "res://bin/gozen/libgozen.windows.template_debug.x86_64.dll"
windows.release.x86_64 = "res://bin/gozen/libgozen.windows.template_release.x86_64.dll"

```

### cpp include
```json
"includePath": [
		"${workspaceFolder}/**",
		"${workspaceFolder}/gd_extensions/godot_cpp/**",
		"${workspaceFolder}/gd_extensions/godot_cpp/include/**",
		"${workspaceFolder}/gd_extensions/godot_cpp/gen/**",
		"${workspaceFolder}/gd_extensions/godot_cpp/src/**"
	]
```

### 插件编写
```cpp
// register_types.hpp
#pragma once

#include <gdextension_interface.h>
#include <godot_cpp/core/class_db.hpp>
#include <godot_cpp/core/defs.hpp>
#include <godot_cpp/godot.hpp>

using namespace godot;

void initialize_gozen_library_init_module(ModuleInitializationLevel p_level);
void uninitialize_gozen_library_init_module(ModuleInitializationLevel p_level);


// register_types.cpp
#include "register_types.hpp"
#include "Video.hpp"

void initialize_gozen_library_init_module(ModuleInitializationLevel p_level) {
    if (p_level != MODULE_INITIALIZATION_LEVEL_SCENE)
        return;
	// 将Video类注册到ClassDB以在Godot中使用
    ClassDB::register_class<Video>();
}

void uninitialize_gozen_library_init_module(ModuleInitializationLevel p_level) {
    if (p_level != MODULE_INITIALIZATION_LEVEL_SCENE)
        return;
}

extern "C" {
    // Initialization.
    GDExtensionBool GDE_EXPORT gozen_library_init(GDExtensionInterfaceGetProcAddress p_get_proc_address, GDExtensionClassLibraryPtr p_library, GDExtensionInitialization *r_initialization) {
        godot::GDExtensionBinding::InitObject init_obj(p_get_proc_address, p_library, r_initialization);
		// 注册模块初始化方法和注销方法
        init_obj.register_initializer(initialize_gozen_library_init_module);
        init_obj.register_terminator(uninitialize_gozen_library_init_module);
        init_obj.set_minimum_library_initialization_level(MODULE_INITIALIZATION_LEVEL_SCENE);

        return init_obj.init();
    }
}

// Video.hpp
#pragma once

#include <godot_cpp/classes/control.hpp>
#include <godot_cpp/variant/utility_functions.hpp>

using namespace godot;

class Video : public Resource {
	GDCLASS(Video, Resource);

public:
    inline void print_something(String text)
    {
        UtilityFunctions::print_rich(String("[b]Text[/b]: {text}").replace("{text}", text));
    }

protected:
	// 绑定方法，注册方法信息。以在Godot中正常调用。
	static inline void _bind_methods() {
        ClassDB::bind_method(D_METHOD("print_something", "text"), &Video::print_something);
    }

};
```

## FFmpeg
[6.1 API 文档](https://ffmpeg.org/doxygen/6.1/index.html)

`git submodule add -b release/6.1 https://github.com/FFmpeg/FFmpeg gd_extensions/gozen/ffmpeg`

> [!note]
> 移动git子模块，使用git mv
> git mv gd_extensions/gozen/ffmpeg other/ffmpeg


