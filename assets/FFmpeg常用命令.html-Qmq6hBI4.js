import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as p,o as i,c,a as e,b as a,d as o,e as n}from"./app-ygFmrJeo.js";const s={},r=n('<h1 id="ffmpeg常用命令" tabindex="-1"><a class="header-anchor" href="#ffmpeg常用命令"><span>FFmpeg常用命令</span></a></h1><h2 id="基础" tabindex="-1"><a class="header-anchor" href="#基础"><span>基础</span></a></h2><p>简单来说，FFmpeg 命令行程序需要以下参数格式来执行操作： <code>ffmpeg {1} {2} -i {3} {4} {5}</code>，分别是:</p><ol><li>全局参数</li><li>输入文件参数</li><li>输入文件</li><li>输出文件参数</li><li>输出文件</li></ol><p>选项 2、3、4、5 可以可以根据自己的需求进行添加。</p><h2 id="mkv-mp4" tabindex="-1"><a class="header-anchor" href="#mkv-mp4"><span>mkv-&gt;mp4</span></a></h2><p><code>ffmpeg -i input.mkv -vcodec copy -acodec copy out.mp4</code><br><code>ffmpeg -i &quot;%1&quot; -vcodec h264 -acodec aac &quot;%1.mp4&quot;</code></p><h2 id="加软字幕" tabindex="-1"><a class="header-anchor" href="#加软字幕"><span>加软字幕</span></a></h2>',8),d={href:"https://www.jianshu.com/p/f33910818a1c",target:"_blank",rel:"noopener noreferrer"},h=e("br",null,null,-1),m=e("code",null,"ffmpeg -i test.mp4 -i test.srt -c copy output.mkv",-1),u=e("h2",{id:"软字幕转硬字幕",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#软字幕转硬字幕"},[e("span",null,"软字幕转硬字幕")])],-1),f={href:"https://www.jianshu.com/p/f33910818a1c",target:"_blank",rel:"noopener noreferrer"},g=e("br",null,null,-1),_=e("code",null,"ffmpeg -i test.mkv -vf subtitles=test.srt out.mp4",-1),v=n('<h2 id="直接生成硬字幕" tabindex="-1"><a class="header-anchor" href="#直接生成硬字幕"><span>直接生成硬字幕</span></a></h2><p><code>ffmpeg -i &quot;input.mp4&quot; -vcodec h264_nvenc -vf subtitles=test.ass &quot;out.mp4&quot;</code></p><h2 id="提取字幕" tabindex="-1"><a class="header-anchor" href="#提取字幕"><span>提取字幕</span></a></h2><p><code>ffmpeg -i video_file.mp4 -map 0:s:0 subtitle.srt</code></p><h2 id="删除字幕" tabindex="-1"><a class="header-anchor" href="#删除字幕"><span>删除字幕</span></a></h2><p><code>ffmpeg -i video.mkv -vcodec copy -acodec copy -sn video-no-subs.mkv</code></p><h2 id="转换字幕格式" tabindex="-1"><a class="header-anchor" href="#转换字幕格式"><span>转换字幕格式</span></a></h2><p><code>ffmpeg -i subtitle.srt subtitle.ass</code></p><h2 id="提取音频" tabindex="-1"><a class="header-anchor" href="#提取音频"><span>提取音频</span></a></h2><p><code>ffmpeg -i test.mp4 -f mp3 -vn test.mp3</code></p><h2 id="gpu加速" tabindex="-1"><a class="header-anchor" href="#gpu加速"><span>GPU加速</span></a></h2><p><code>ffmpeg -i input -vcodec h264_nvenc output</code></p><h2 id="设置码率" tabindex="-1"><a class="header-anchor" href="#设置码率"><span>设置码率</span></a></h2><p><code>-b 5M</code></p>',14);function b(k,F){const t=p("ExternalLinkIcon");return i(),c("div",null,[r,e("p",null,[e("a",d,[a("https://www.jianshu.com/p/f33910818a1c"),o(t)]),h,m]),u,e("p",null,[e("a",f,[a("https://www.jianshu.com/p/f33910818a1c"),o(t)]),g,_]),v])}const w=l(s,[["render",b],["__file","FFmpeg常用命令.html.vue"]]),B=JSON.parse('{"path":"/blog/FFmpeg%E5%B8%B8%E7%94%A8%E5%91%BD%E4%BB%A4.html","title":"FFmpeg常用命令","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2024-04-30T00:00:00.000Z","sticky":false,"star":false,"comment":true,"category":["Blog"],"tags":["ffmpeg"],"description":"FFmpeg常用命令","head":[["meta",{"property":"og:url","content":"https://1e0nhardt.github.io/blog/FFmpeg%E5%B8%B8%E7%94%A8%E5%91%BD%E4%BB%A4.html"}],["meta",{"property":"og:site_name","content":"宁静致远"}],["meta",{"property":"og:title","content":"FFmpeg常用命令"}],["meta",{"property":"og:description","content":"FFmpeg常用命令"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-05-25T16:58:41.000Z"}],["meta",{"property":"article:author","content":"leonhardt"}],["meta",{"property":"article:tag","content":"ffmpeg"}],["meta",{"property":"article:published_time","content":"2024-04-30T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-05-25T16:58:41.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"FFmpeg常用命令\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-04-30T00:00:00.000Z\\",\\"dateModified\\":\\"2024-05-25T16:58:41.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"leonhardt\\",\\"url\\":\\"/intro.html\\"}]}"]]},"headers":[{"level":2,"title":"基础","slug":"基础","link":"#基础","children":[]},{"level":2,"title":"mkv->mp4","slug":"mkv-mp4","link":"#mkv-mp4","children":[]},{"level":2,"title":"加软字幕","slug":"加软字幕","link":"#加软字幕","children":[]},{"level":2,"title":"软字幕转硬字幕","slug":"软字幕转硬字幕","link":"#软字幕转硬字幕","children":[]},{"level":2,"title":"直接生成硬字幕","slug":"直接生成硬字幕","link":"#直接生成硬字幕","children":[]},{"level":2,"title":"提取字幕","slug":"提取字幕","link":"#提取字幕","children":[]},{"level":2,"title":"删除字幕","slug":"删除字幕","link":"#删除字幕","children":[]},{"level":2,"title":"转换字幕格式","slug":"转换字幕格式","link":"#转换字幕格式","children":[]},{"level":2,"title":"提取音频","slug":"提取音频","link":"#提取音频","children":[]},{"level":2,"title":"GPU加速","slug":"gpu加速","link":"#gpu加速","children":[]},{"level":2,"title":"设置码率","slug":"设置码率","link":"#设置码率","children":[]}],"git":{"createdTime":1716656321000,"updatedTime":1716656321000,"contributors":[{"name":"1e0nhardt","email":"huwkigane@gmail.com","commits":1}]},"readingTime":{"minutes":0.8,"words":241},"filePathRelative":"blog/FFmpeg常用命令.md","localizedDate":"2024年4月30日","excerpt":""}');export{w as comp,B as data};
