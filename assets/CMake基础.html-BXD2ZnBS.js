import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as a,o as t,c as o,a as e,b as n,d as s,e as r}from"./app-ygFmrJeo.js";const c={},d=e("h1",{id:"cmake基础",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#cmake基础"},[e("span",null,"CMake基础")])],-1),p={href:"https://github.com/parallel101/course/blob/master/01/slides.pptx",target:"_blank",rel:"noopener noreferrer"},h=r(`<h2 id="构建" tabindex="-1"><a class="header-anchor" href="#构建"><span>构建</span></a></h2><ul><li><code>cmake -B build</code>: 读取当前目录的 CMakeLists.txt，并在 build 文件夹下生成 build/Makefile</li><li><code>cmake --build build</code>: 让 make 读取 build/Makefile，并开始构建 a.out</li></ul><h2 id="库" tabindex="-1"><a class="header-anchor" href="#库"><span>库</span></a></h2><ul><li><p>分为静态库和动态库</p><ul><li>静态库相当于直接把代码插入到生成的可执行文件中，会导致体积变大，但是只需要一个文件即可运行。</li><li>动态库则只在生成的可执行文件中生成“插桩”函数，当可执行文件被加载时会读取指定目录中的.dll文件，加载到内存中空闲的位置，并且替换相应的“插桩”指向的地址为加载后的地址，这个过程称为重定向。这样以后函数被调用就会跳转到动态加载的地址去。</li></ul></li><li><p>库搜索路径</p><ul><li>Windows：可执行文件同目录，其次是环境变量%PATH%</li><li>Linux：ELF格式可执行文件的RPATH，其次是/usr/lib等</li></ul></li><li><p><code>add_executable</code>: 生成可执行文件。add_executable(a.out main.cpp)</p></li><li><p><code>add_library</code>: 生成库文件</p><ul><li>生成静态库：<code>add_library(test STATIC source1.cpp source2.cpp)</code></li><li>生成动态库：<code>add_library(test STATIC source1.cpp source2.cpp)</code></li></ul></li><li><p>创建库以后，要在某个可执行文件中使用该库，只需要：</p><ul><li><code>target_link_libraries(myexec PUBLIC test)</code>  # 为 myexec 链接刚刚制作的库 libtest.a</li><li>PUBLIC 表示可传播。</li></ul></li></ul><h2 id="头文件" tabindex="-1"><a class="header-anchor" href="#头文件"><span>头文件</span></a></h2><ol><li>为什么 C++ 需要声明？ <ol><li>因为需要知道函数的参数和返回值类型：这样才能支持重载，隐式类型转换等特性。</li><li>让编译器知道 hello 这个名字是一个函数，不是一个变量或者类的名字</li></ol></li><li>为什么需要头文件？为了避免手动重复写很多声明。</li><li><code>#include &quot;hello.h&quot;</code>的实际作用是将hello.h文件的内容传入<code>#include</code>所在位置 <ol><li><code>&lt;cstdio&gt;</code> 这种形式表示不要在当前目录下搜索，只在系统目录里搜索</li><li><code>&quot;hello.h&quot;</code> 这种形式则优先搜索当前目录，找不到再搜索系统目录</li></ol></li><li>防止重复定义 <ol><li><code>#pragma once</code></li><li><code>#ifndef</code></li></ol></li></ol><h2 id="子模块" tabindex="-1"><a class="header-anchor" href="#子模块"><span>子模块</span></a></h2><ul><li>复杂的工程中，我们需要划分子模块，通常一个库一个目录</li><li>把 hellolib 库的东西移到 hellolib 文件夹下，里面的 CMakeLists.txt 定义 hellolib 的生成规则。</li><li>要在根目录使用他，可以用 CMake 的 <code>add_subdirectory</code>添加子目录，子目录也包含一个 CMakeLists.txt，其中定义的库在 <code>add_subdirectory</code> 之后就可以在外面使用。 <ul><li>子目录的 CMakeLists.txt 里路径名（比如 hello.cpp，不用写 hellolib/hello.cpp）都是相对路径</li></ul></li><li>通过 <code>target_include_directories</code> 指定子模块的头文件 <ul><li>通过 <code>target_include_directories</code> 指定的路径会被视为与系统路径等价</li></ul></li><li>除了在构建a.out的CMakeLists.txt中使用<code>target_include_directories</code>添加库目录。也可以在构建库文件时用<code>target_include_directories</code>指定库目录（例如<code>target_include_directories(hellolib PUBLIC .)</code>），这样在a.out的CMakeLists.txt中用<code>target_link_libraries(myexec PUBLIC test)</code>引入库时就会自动添加相应的库目录，如果不想自动添加，则可以将PUBLIC改为PRIVATE。这就是他们的用途：决定一个属性要不要在被 link 的时候传播。</li></ul><h2 id="目标选项" tabindex="-1"><a class="header-anchor" href="#目标选项"><span>目标选项</span></a></h2><ul><li>target_include_directories(myapp PUBLIC /usr/include/eigen3) # 添加头文件搜索目录</li><li>target_link_libraries(myapp PUBLIC hellolib) # 添加要链接的库</li><li>target_add_definitions(myapp PUBLIC MY_MACRO=1) # 添加一个宏定义</li><li>target_add_definitions(myapp PUBLIC -DMY_MACRO=1) # 与 MY_MACRO=1 等价</li><li>target_compile_options(myapp PUBLIC -fopenmp) # 添加编译器命令行选项</li><li>target_sources(myapp PUBLIC hello.cpp other.cpp) # 添加要编译的源文件</li></ul><p>以及可以通过下列指令（不推荐使用），把选项加到所有接下来的目标去：</p><ul><li>include_directories(/opt/cuda/include) # 添加头文件搜索目录</li><li>link_directories(/opt/cuda) # 添加库文件的搜索路径</li><li>add_definitions(MY_MACRO=1) # 添加一个宏定义</li><li>add_compile_options(-fopenmp) # 添加编译器命令行选项</li></ul><h2 id="第三方库" tabindex="-1"><a class="header-anchor" href="#第三方库"><span>第三方库</span></a></h2><h3 id="纯头文件库" tabindex="-1"><a class="header-anchor" href="#纯头文件库"><span>纯头文件库</span></a></h3><ol><li>nothings/stb - 大名鼎鼎的 stb_image 系列，涵盖图像，声音，字体等，只需单头文件！</li><li>Neargye/magic_enum - 枚举类型的反射，如枚举转字符串等（实现方式很巧妙）</li><li>g-truc/glm - 模仿 GLSL 语法的数学矢量/矩阵库（附带一些常用函数，随机数生成等）</li><li>Tencent/rapidjson - 单纯的 JSON 库，甚至没依赖 STL（可定制性高，工程美学经典）</li><li>ericniebler/range-v3 - C++20 ranges 库就是受到他启发（完全是头文件组成）</li><li>fmtlib/fmt - 格式化库，提供 std::format 的替代品（需要 -DFMT_HEADER_ONLY）</li><li>gabime/spdlog - 能适配控制台，安卓等多后端的日志库（和 fmt 冲突！）</li></ol><ul><li>只需要把他们的 include 目录或头文件下载下来，然后 include_directories(spdlog/include) 即可。</li><li>缺点：函数直接实现在头文件里，没有提前编译，从而需要重复编译同样内容，编译时间长。</li></ul><h3 id="作为子模块引入" tabindex="-1"><a class="header-anchor" href="#作为子模块引入"><span>作为子模块引入</span></a></h3><p>第二友好的方式则是作为 CMake 子模块引入，也就是通过 add_subdirectory。<br> 方法就是把那个项目（以fmt为例）的源码放到你工程的根目录。</p><p>这些库能够很好地支持作为子模块引入：</p><ol><li>fmtlib/fmt - 格式化库，提供 std::format 的替代品</li><li>gabime/spdlog - 能适配控制台，安卓等多后端的日志库</li><li>ericniebler/range-v3 - C++20 ranges 库就是受到他启发</li><li>g-truc/glm - 模仿 GLSL 语法的数学矢量/矩阵库</li><li>abseil/abseil-cpp - 旨在补充标准库没有的常用功能</li><li>bombela/backward-cpp - 实现了 C++ 的堆栈回溯便于调试</li><li>google/googletest - 谷歌单元测试框架</li><li>google/benchmark - 谷歌性能评估框架</li><li>glfw/glfw - OpenGL 窗口和上下文管理</li><li>libigl/libigl - 各种图形学算法大合集</li></ol><h3 id="引用系统中预安装的第三方库" tabindex="-1"><a class="header-anchor" href="#引用系统中预安装的第三方库"><span>引用系统中预安装的第三方库</span></a></h3><p>可以通过 find_package 命令寻找系统中的包/库：</p><div class="language-cmake line-numbers-mode" data-ext="cmake" data-title="cmake"><pre class="shiki shiki-themes github-light one-dark-pro" style="background-color:#fff;--shiki-dark-bg:#282c34;color:#24292e;--shiki-dark:#abb2bf;" tabindex="0"><code><span class="line"><span style="color:#D73A49;--shiki-dark:#C678DD;">find_package</span><span style="color:#24292E;--shiki-dark:#ABB2BF;">(fmt REQUIRED)</span></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#C678DD;">target_link_libraries</span><span style="color:#24292E;--shiki-dark:#ABB2BF;">(myexec </span><span style="color:#6F42C1;--shiki-dark:#ABB2BF;">PUBLIC</span><span style="color:#24292E;--shiki-dark:#ABB2BF;"> fmt::fmt)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container note"><p class="hint-container-title">注</p><p>为什么是 fmt::fmt 而不是简单的 fmt？<br> 现代 CMake 认为一个包 (package) 可以提供多个库，又称组件 (components)，比如 TBB 这个包，就包含了 tbb, tbbmalloc, tbbmalloc_proxy 这三个组件。<br> 因此为避免冲突，每个包都享有一个独立的名字空间，以 :: 的分割。</p></div><p>你可以指定要用哪几个组件</p><div class="language-cmake line-numbers-mode" data-ext="cmake" data-title="cmake"><pre class="shiki shiki-themes github-light one-dark-pro" style="background-color:#fff;--shiki-dark-bg:#282c34;color:#24292e;--shiki-dark:#abb2bf;" tabindex="0"><code><span class="line"><span style="color:#D73A49;--shiki-dark:#C678DD;">find_package</span><span style="color:#24292E;--shiki-dark:#ABB2BF;">(TBB REQUIRED COMPONENTS tbb tbbmalloc REQUIRED)</span></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#C678DD;">target_link_libraries</span><span style="color:#24292E;--shiki-dark:#ABB2BF;">(myexec </span><span style="color:#6F42C1;--shiki-dark:#ABB2BF;">PUBLIC</span><span style="color:#24292E;--shiki-dark:#ABB2BF;"> TBB::tbb TBB::tbbmalloc)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,26);function m(u,k){const l=a("ExternalLinkIcon");return t(),o("div",null,[d,e("p",null,[e("a",p,[n("小彭老师的PPT"),s(l)])]),h])}const _=i(c,[["render",m],["__file","CMake基础.html.vue"]]),f=JSON.parse('{"path":"/gameengine/CMake%E5%9F%BA%E7%A1%80.html","title":"CMake基础","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2024-05-07T00:00:00.000Z","sticky":false,"star":false,"comment":true,"category":["Game"],"tags":["hazel"],"description":"CMake基础","head":[["meta",{"property":"og:url","content":"https://1e0nhardt.github.io/gameengine/CMake%E5%9F%BA%E7%A1%80.html"}],["meta",{"property":"og:site_name","content":"宁静致远"}],["meta",{"property":"og:title","content":"CMake基础"}],["meta",{"property":"og:description","content":"CMake基础"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-05-25T16:58:41.000Z"}],["meta",{"property":"article:author","content":"leonhardt"}],["meta",{"property":"article:tag","content":"hazel"}],["meta",{"property":"article:published_time","content":"2024-05-07T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-05-25T16:58:41.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"CMake基础\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-05-07T00:00:00.000Z\\",\\"dateModified\\":\\"2024-05-25T16:58:41.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"leonhardt\\",\\"url\\":\\"/intro.html\\"}]}"]]},"headers":[{"level":2,"title":"构建","slug":"构建","link":"#构建","children":[]},{"level":2,"title":"库","slug":"库","link":"#库","children":[]},{"level":2,"title":"头文件","slug":"头文件","link":"#头文件","children":[]},{"level":2,"title":"子模块","slug":"子模块","link":"#子模块","children":[]},{"level":2,"title":"目标选项","slug":"目标选项","link":"#目标选项","children":[]},{"level":2,"title":"第三方库","slug":"第三方库","link":"#第三方库","children":[{"level":3,"title":"纯头文件库","slug":"纯头文件库","link":"#纯头文件库","children":[]},{"level":3,"title":"作为子模块引入","slug":"作为子模块引入","link":"#作为子模块引入","children":[]},{"level":3,"title":"引用系统中预安装的第三方库","slug":"引用系统中预安装的第三方库","link":"#引用系统中预安装的第三方库","children":[]}]}],"git":{"createdTime":1716656321000,"updatedTime":1716656321000,"contributors":[{"name":"1e0nhardt","email":"huwkigane@gmail.com","commits":1}]},"readingTime":{"minutes":5.11,"words":1533},"filePathRelative":"gameengine/CMake基础.md","localizedDate":"2024年5月7日","excerpt":""}');export{_ as comp,f as data};
