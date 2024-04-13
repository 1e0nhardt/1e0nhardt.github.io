import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as a,c as n,a as i}from"./app-BsuYk19D.js";const e={},l=i(`<h1 id="windows脚本小知识" tabindex="-1"><a class="header-anchor" href="#windows脚本小知识"><span>Windows脚本小知识</span></a></h1><h2 id="注释" tabindex="-1"><a class="header-anchor" href="#注释"><span>注释</span></a></h2><div class="language-cmd line-numbers-mode" data-ext="cmd" data-title="cmd"><pre class="shiki shiki-themes github-light one-dark-pro" style="background-color:#fff;--shiki-dark-bg:#282c34;color:#24292e;--shiki-dark:#abb2bf;" tabindex="0"><code><span class="line"><span style="color:#24292E;--shiki-dark:#ABB2BF;">rem 注释内容</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#ABB2BF;">::: 注释内容</span></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#ABB2BF;">%</span><span style="color:#24292E;--shiki-dark:#ABB2BF;">注释内容</span><span style="color:#D73A49;--shiki-dark:#ABB2BF;">%</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#ABB2BF;">goto start  </span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#ABB2BF;">可以是多行文本，可以是命令  </span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#ABB2BF;">可以包含符号和其他特殊字符  </span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#ABB2BF;">冒号start为一个标签</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#ABB2BF;">使用goto语句可以在标签间进行跳转</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#ABB2BF;">:start</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="为window-命令行添加别名" tabindex="-1"><a class="header-anchor" href="#为window-命令行添加别名"><span>为Window 命令行添加别名</span></a></h2><p>win+r 输入regedit 打开注册表编辑器</p><p>打开：计算机\\HKEY_CURRENT_USER\\Software\\Microsoft\\Command Processor<br> 右键新建可扩充字符串值：value填一个脚本名 &quot;C:\\cmd_alias.bat&quot;</p><p>脚本内容</p><div class="language-cmd line-numbers-mode" data-ext="cmd" data-title="cmd"><pre class="shiki shiki-themes github-light one-dark-pro" style="background-color:#fff;--shiki-dark-bg:#282c34;color:#24292e;--shiki-dark:#abb2bf;" tabindex="0"><code><span class="line"><span style="color:#24292E;--shiki-dark:#ABB2BF;">@echo off</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#ABB2BF;">rem </span><span style="color:#D73A49;--shiki-dark:#ABB2BF;">$*</span><span style="color:#24292E;--shiki-dark:#ABB2BF;"> 表示后面可以有任意数量的命令行参数</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#ABB2BF;">rem doskey 相当于 alias</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#ABB2BF;">doskey </span><span style="color:#24292E;--shiki-dark:#E06C75;">ls</span><span style="color:#D73A49;--shiki-dark:#ABB2BF;">=</span><span style="color:#24292E;--shiki-dark:#E06C75;">dir</span><span style="color:#24292E;--shiki-dark:#ABB2BF;"> /</span><span style="color:#24292E;--shiki-dark:#E06C75;">b</span><span style="color:#D73A49;--shiki-dark:#ABB2BF;"> $*</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#ABB2BF;">doskey </span><span style="color:#24292E;--shiki-dark:#E06C75;">tb</span><span style="color:#D73A49;--shiki-dark:#ABB2BF;">=</span><span style="color:#24292E;--shiki-dark:#E06C75;">tensorboard</span><span style="color:#D73A49;--shiki-dark:#ABB2BF;"> --</span><span style="color:#24292E;--shiki-dark:#E06C75;">logdir</span><span style="color:#D73A49;--shiki-dark:#ABB2BF;"> $*</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#ABB2BF;">doskey </span><span style="color:#24292E;--shiki-dark:#E06C75;">ca</span><span style="color:#D73A49;--shiki-dark:#ABB2BF;">=</span><span style="color:#24292E;--shiki-dark:#E06C75;">conda</span><span style="color:#24292E;--shiki-dark:#ABB2BF;"> activate </span><span style="color:#D73A49;--shiki-dark:#ABB2BF;">$*</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#ABB2BF;">doskey </span><span style="color:#24292E;--shiki-dark:#E06C75;">ns</span><span style="color:#D73A49;--shiki-dark:#ABB2BF;">=</span><span style="color:#24292E;--shiki-dark:#E06C75;">nvidia</span><span style="color:#D73A49;--shiki-dark:#ABB2BF;">-</span><span style="color:#24292E;--shiki-dark:#E06C75;">smi</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8),o=[l];function r(t,d){return a(),n("div",null,o)}const k=s(e,[["render",r],["__file","Windows脚本小知识.html.vue"]]),h=JSON.parse('{"path":"/blog/Windows%E8%84%9A%E6%9C%AC%E5%B0%8F%E7%9F%A5%E8%AF%86.html","title":"Windows脚本小知识","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","isOriginal":true,"date":"2023-06-11T00:00:00.000Z","comment":true,"sticky":false,"star":false,"category":["Blog"],"tag":["windows"],"description":"Windows脚本小知识","head":[["meta",{"property":"og:url","content":"https://1e0nhardt.github.io/blog/Windows%E8%84%9A%E6%9C%AC%E5%B0%8F%E7%9F%A5%E8%AF%86.html"}],["meta",{"property":"og:site_name","content":"宁静致远"}],["meta",{"property":"og:title","content":"Windows脚本小知识"}],["meta",{"property":"og:description","content":"Windows脚本小知识"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-13T14:07:48.000Z"}],["meta",{"property":"article:author","content":"leonhardt"}],["meta",{"property":"article:tag","content":"windows"}],["meta",{"property":"article:published_time","content":"2023-06-11T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-13T14:07:48.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Windows脚本小知识\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-06-11T00:00:00.000Z\\",\\"dateModified\\":\\"2024-04-13T14:07:48.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"leonhardt\\",\\"url\\":\\"/intro.html\\"}]}"]]},"headers":[{"level":2,"title":"注释","slug":"注释","link":"#注释","children":[]},{"level":2,"title":"为Window 命令行添加别名","slug":"为window-命令行添加别名","link":"#为window-命令行添加别名","children":[]}],"git":{"createdTime":1686470142000,"updatedTime":1713017268000,"contributors":[{"name":"1e0nhardt","email":"huwkigane@gmail.com","commits":2}]},"readingTime":{"minutes":0.67,"words":201},"filePathRelative":"blog/Windows脚本小知识.md","localizedDate":"2023年6月11日","excerpt":""}');export{k as comp,h as data};
