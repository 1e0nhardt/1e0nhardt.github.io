import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as e,c as n,e as a}from"./app-ygFmrJeo.js";const r={},i=a('<h1 id="博弈论00" tabindex="-1"><a class="header-anchor" href="#博弈论00"><span>博弈论00</span></a></h1><h2 id="游戏0-囚徒困境-prisioner-s-dilemma" tabindex="-1"><a class="header-anchor" href="#游戏0-囚徒困境-prisioner-s-dilemma"><span>游戏0--囚徒困境(Prisioner&#39;s Dilemma)</span></a></h2><p>我从策略a,b中选择一个，对手也从策略a，b中选择一个。彼此都不知道对方做出的选择。策略对应的收益情况在下表中列出我的收益在逗号前，对手的收益在逗号后。</p><table><thead><tr><th style="text-align:center;"></th><th style="text-align:center;">a</th><th style="text-align:center;">b</th></tr></thead><tbody><tr><td style="text-align:center;">a</td><td style="text-align:center;">0, 0</td><td style="text-align:center;">3, -1</td></tr><tr><td style="text-align:center;">b</td><td style="text-align:center;">-1, 3</td><td style="text-align:center;">1, 1</td></tr></tbody></table><h2 id="优势策略-dominate-strategy" tabindex="-1"><a class="header-anchor" href="#优势策略-dominate-strategy"><span>优势策略(dominate strategy)</span></a></h2><p>定义：如果无论对手怎么选，我选a的收益(payoff)严格优于b，那么a相对于b是严格优势策略。</p><p>例如：游戏0中的a策略。如果对手选择a策略，我选a=&gt;0比b=&gt;-1要好。如果对手选择b策略，我选a=&gt;3比b=&gt;1要好。因此对于我而言，a相对于b是严格优势策略。</p><p>结论1：不要选择严格劣势策略。=&gt; 角色: <mark>Evil gits</mark>--只关心自己收益的人<br> 结论2：理性的选择导致次优的结果。(遵循结论1，则结果必然是a,a。而非b,b)</p><p>游戏0即囚徒困境。</p><p>协商难以达成目的的原因不是缺少沟通，而是没有强制力。<br> 通过条约，规章制度改变最终收益才能真正影响策略选择。</p><p>单次博弈改为多次博弈，则大家的策略选择会趋向于b。</p><h2 id="游戏1-协和谬误-cordination-problem" tabindex="-1"><a class="header-anchor" href="#游戏1-协和谬误-cordination-problem"><span>游戏1--协和谬误(Cordination Problem)</span></a></h2><table><thead><tr><th style="text-align:center;"></th><th style="text-align:center;">a</th><th style="text-align:center;">b</th></tr></thead><tbody><tr><td style="text-align:center;">a</td><td style="text-align:center;">0, 0</td><td style="text-align:center;">-1, -3</td></tr><tr><td style="text-align:center;">b</td><td style="text-align:center;">-3, -1</td><td style="text-align:center;">1, 1</td></tr></tbody></table><p>角色: <mark>Indignant Angel</mark> 愤怒天使 -- 在自己比对手好时，会有负罪感，收益-4。在自己比对手差时，收益-2。<br> 在这种情形下，你想要得到更高的收益，就需要知道对手的策略，并选择和对手相同的策略。</p><p>结论3：汝欲求之，必先知之。</p><h2 id="游戏2-3-evil-gits-v-s-indignant-angel" tabindex="-1"><a class="header-anchor" href="#游戏2-3-evil-gits-v-s-indignant-angel"><span>游戏2,3-- Evil gits v.s Indignant Angel</span></a></h2><p>行：Evil gits v.s 列：Indignant Angel</p><table><thead><tr><th style="text-align:center;"></th><th style="text-align:center;">a</th><th style="text-align:center;">b</th></tr></thead><tbody><tr><td style="text-align:center;">a</td><td style="text-align:center;">0, 0</td><td style="text-align:center;">3, -3</td></tr><tr><td style="text-align:center;">b</td><td style="text-align:center;">-1, -1</td><td style="text-align:center;">1, 1</td></tr></tbody></table><p>行：Indignant Angel v.s 列：Evil gits</p><table><thead><tr><th style="text-align:center;"></th><th style="text-align:center;">a</th><th style="text-align:center;">b</th></tr></thead><tbody><tr><td style="text-align:center;">a</td><td style="text-align:center;">0, 0</td><td style="text-align:center;">-1, -1</td></tr><tr><td style="text-align:center;">b</td><td style="text-align:center;">-3, 3</td><td style="text-align:center;">1, 1</td></tr></tbody></table><p>这种情形下，对Indignant Angel来说，没有优势策略。而对Evil gits来说，a是优势策略，所以Indignant Angel应该选a以避免更大损失。</p><p>结论4：学会换位思考，分析别人的收益。(Put yourself in other&#39;s shoes and try to figure out what they will do.)<br> 永远选择优势策略，选择非劣势策略，损失小，如果对手有优势策略则应以此作为选择策略的指导。</p>',22),l=[i];function d(s,o){return e(),n("div",null,l)}const h=t(r,[["render",d],["__file","博弈论00.html.vue"]]),p=JSON.parse(`{"path":"/notes/%E5%8D%9A%E5%BC%88%E8%AE%BA/%E5%8D%9A%E5%BC%88%E8%AE%BA00.html","title":"博弈论00","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2023-12-10T00:00:00.000Z","sticky":false,"star":false,"comment":true,"category":["Note"],"tags":["vuepress"],"description":"博弈论","head":[["meta",{"property":"og:url","content":"https://1e0nhardt.github.io/notes/%E5%8D%9A%E5%BC%88%E8%AE%BA/%E5%8D%9A%E5%BC%88%E8%AE%BA00.html"}],["meta",{"property":"og:site_name","content":"宁静致远"}],["meta",{"property":"og:title","content":"博弈论00"}],["meta",{"property":"og:description","content":"博弈论"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-13T14:07:48.000Z"}],["meta",{"property":"article:author","content":"leonhardt"}],["meta",{"property":"article:tag","content":"vuepress"}],["meta",{"property":"article:published_time","content":"2023-12-10T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-13T14:07:48.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"博弈论00\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-12-10T00:00:00.000Z\\",\\"dateModified\\":\\"2024-04-13T14:07:48.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"leonhardt\\",\\"url\\":\\"/intro.html\\"}]}"]]},"headers":[{"level":2,"title":"游戏0--囚徒困境(Prisioner's Dilemma)","slug":"游戏0-囚徒困境-prisioner-s-dilemma","link":"#游戏0-囚徒困境-prisioner-s-dilemma","children":[]},{"level":2,"title":"优势策略(dominate strategy)","slug":"优势策略-dominate-strategy","link":"#优势策略-dominate-strategy","children":[]},{"level":2,"title":"游戏1--协和谬误(Cordination Problem)","slug":"游戏1-协和谬误-cordination-problem","link":"#游戏1-协和谬误-cordination-problem","children":[]},{"level":2,"title":"游戏2,3-- Evil gits v.s Indignant Angel","slug":"游戏2-3-evil-gits-v-s-indignant-angel","link":"#游戏2-3-evil-gits-v-s-indignant-angel","children":[]}],"git":{"createdTime":1713017268000,"updatedTime":1713017268000,"contributors":[{"name":"1e0nhardt","email":"huwkigane@gmail.com","commits":1}]},"readingTime":{"minutes":2.09,"words":627},"filePathRelative":"notes/博弈论/博弈论00.md","localizedDate":"2023年12月10日","excerpt":""}`);export{h as comp,p as data};
