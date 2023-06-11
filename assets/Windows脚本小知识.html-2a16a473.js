import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as d,a as n}from"./app-84045666.js";const a={},s=n(`<h1 id="windows脚本小知识" tabindex="-1"><a class="header-anchor" href="#windows脚本小知识" aria-hidden="true">#</a> Windows脚本小知识</h1><h2 id="注释" tabindex="-1"><a class="header-anchor" href="#注释" aria-hidden="true">#</a> 注释</h2><div class="language-cmd line-numbers-mode" data-ext="cmd"><pre class="language-cmd"><code>rem 注释内容
::: 注释内容
%注释内容%

goto start  
可以是多行文本，可以是命令  
可以包含符号和其他特殊字符  
冒号start为一个标签
使用goto语句可以在标签间进行跳转
:start
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="为window-命令行添加别名" tabindex="-1"><a class="header-anchor" href="#为window-命令行添加别名" aria-hidden="true">#</a> 为Window 命令行添加别名</h2><p>win+r 输入regedit 打开注册表编辑器</p><p>打开：计算机\\HKEY_CURRENT_USER\\Software\\Microsoft\\Command Processor 右键新建可扩充字符串值：value填一个脚本名 &quot;C:\\cmd_alias.bat&quot;</p><p>脚本内容</p><div class="language-cmd line-numbers-mode" data-ext="cmd"><pre class="language-cmd"><code>@echo off
rem $* 表示后面可以有任意数量的命令行参数
rem doskey 相当于 alias
doskey ls=dir /b $*
doskey tb=tensorboard --logdir $*
doskey ca=conda activate $*
doskey ns=nvidia-smi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8),r=[s];function l(c,o){return i(),d("div",null,r)}const m=e(a,[["render",l],["__file","Windows脚本小知识.html.vue"]]);export{m as default};
