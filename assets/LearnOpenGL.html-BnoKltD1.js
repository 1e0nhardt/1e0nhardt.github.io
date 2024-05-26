import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as n,o as r,c as o,a as e,b as l,d as i,e as p}from"./app-jYPNnZCE.js";const s={},c=e("h1",{id:"learnopengl",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#learnopengl"},[e("span",null,"LearnOpenGL")])],-1),h=e("h2",{id:"hello三角形",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#hello三角形"},[e("span",null,"Hello三角形")])],-1),d={href:"https://learnopengl-cn.github.io/01%20Getting%20started/04%20Hello%20Triangle/",target:"_blank",rel:"noopener noreferrer"},m=p('<h3 id="图形渲染管线" tabindex="-1"><a class="header-anchor" href="#图形渲染管线"><span>图形渲染管线</span></a></h3><p>在OpenGL中，任何事物都在3D空间中，而屏幕和窗口却是2D像素数组，这导致OpenGL的大部分工作都是关于把3D坐标转变为适应你屏幕的2D像素。</p><p>图形渲染管线可以被划分为两个主要部分：第一部分把你的3D坐标转换为2D坐标，第二部分是把2D坐标转变为实际的有颜色的像素。</p><h3 id="shader" tabindex="-1"><a class="header-anchor" href="#shader"><span>Shader</span></a></h3><p>图形渲染管线接受一组3D坐标，然后把它们转变为你屏幕上的有色2D像素输出。图形渲染管线可以被划分为几个阶段，每个阶段将会把前一个阶段的输出作为输入。所有这些阶段都是高度专门化的（它们都有一个特定的函数），并且很容易并行执行。正是由于它们具有并行执行的特性，当今大多数显卡都有成千上万的小处理核心，它们在GPU上为每一个（渲染管线）阶段运行各自的小程序，从而在图形渲染管线中快速处理你的数据。这些小程序叫做着色器(Shader)。</p><h3 id="图元" tabindex="-1"><a class="header-anchor" href="#图元"><span>图元</span></a></h3><p>为了让OpenGL知道我们的坐标和颜色值构成的到底是什么，OpenGL需要你去指定这些数据所表示的渲染类型。我们是希望把这些数据渲染成一系列的点？一系列的三角形？还是仅仅是一个长长的线？做出的这些提示叫做图元(Primitive)，任何一个绘制指令的调用都将把图元传递给OpenGL。这是其中的几个：GL_POINTS、GL_TRIANGLES、GL_LINE_STRIP。</p>',7);function g(L,_){const t=n("ExternalLinkIcon");return r(),o("div",null,[c,h,e("p",null,[e("a",d,[l("https://learnopengl-cn.github.io/01 Getting started/04 Hello Triangle/"),i(t)])]),m])}const f=a(s,[["render",g],["__file","LearnOpenGL.html.vue"]]),O=JSON.parse('{"path":"/gamedev/LearnOpenGL.html","title":"LearnOpenGL","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2024-04-30T00:00:00.000Z","sticky":false,"star":false,"comment":true,"category":["Blog"],"tags":["vuepress"],"description":"LearnOpenGL","head":[["meta",{"property":"og:url","content":"https://1e0nhardt.github.io/gamedev/LearnOpenGL.html"}],["meta",{"property":"og:site_name","content":"宁静致远"}],["meta",{"property":"og:title","content":"LearnOpenGL"}],["meta",{"property":"og:description","content":"LearnOpenGL"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-05-25T16:58:41.000Z"}],["meta",{"property":"article:author","content":"leonhardt"}],["meta",{"property":"article:tag","content":"vuepress"}],["meta",{"property":"article:published_time","content":"2024-04-30T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-05-25T16:58:41.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"LearnOpenGL\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-04-30T00:00:00.000Z\\",\\"dateModified\\":\\"2024-05-25T16:58:41.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"leonhardt\\",\\"url\\":\\"/intro.html\\"}]}"]]},"headers":[{"level":2,"title":"Hello三角形","slug":"hello三角形","link":"#hello三角形","children":[{"level":3,"title":"图形渲染管线","slug":"图形渲染管线","link":"#图形渲染管线","children":[]},{"level":3,"title":"Shader","slug":"shader","link":"#shader","children":[]},{"level":3,"title":"图元","slug":"图元","link":"#图元","children":[]}]}],"git":{"createdTime":1716656321000,"updatedTime":1716656321000,"contributors":[{"name":"1e0nhardt","email":"huwkigane@gmail.com","commits":1}]},"readingTime":{"minutes":1.53,"words":460},"filePathRelative":"gamedev/LearnOpenGL.md","localizedDate":"2024年4月30日","excerpt":""}');export{f as comp,O as data};