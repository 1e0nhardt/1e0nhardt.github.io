import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,a as t}from"./app-203a49eb.js";const p={},e=t(`<h1 id="rich-终端输出美化库" tabindex="-1"><a class="header-anchor" href="#rich-终端输出美化库" aria-hidden="true">#</a> rich 终端输出美化库</h1><h2 id="进度条" tabindex="-1"><a class="header-anchor" href="#进度条" aria-hidden="true">#</a> 进度条</h2><h3 id="自定义进度条" tabindex="-1"><a class="header-anchor" href="#自定义进度条" aria-hidden="true">#</a> 自定义进度条</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>improt time
<span class="token keyword">from</span> rich<span class="token punctuation">.</span>progress <span class="token keyword">import</span> Progress

<span class="token comment"># 1.创建管理进度条的对象</span>
progress <span class="token operator">=</span> Progress<span class="token punctuation">(</span><span class="token punctuation">)</span>
progress<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 2.添加一个task到progress对象</span>
<span class="token comment"># 累积的advance除以total为当前进度条百分比。</span>
<span class="token comment"># 一个task对应在终端中显示的一个进度条</span>
task <span class="token operator">=</span> progress<span class="token punctuation">.</span>add_task<span class="token punctuation">(</span><span class="token string">&#39;[blue]Training&#39;</span><span class="token punctuation">,</span> total<span class="token operator">=</span><span class="token number">1000</span><span class="token punctuation">)</span>

<span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
	<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
	loss <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">-</span> i <span class="token operator">/</span> <span class="token number">1000</span>
	<span class="token keyword">if</span> i <span class="token operator">%</span> <span class="token number">50</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">:</span>
		advance <span class="token operator">=</span> <span class="token number">50</span> <span class="token keyword">if</span> i <span class="token operator">!=</span> <span class="token number">0</span> <span class="token keyword">else</span> <span class="token number">0</span>
		<span class="token comment"># 3.手动更新进度条</span>
		progress<span class="token punctuation">.</span>update<span class="token punctuation">(</span>task<span class="token punctuation">,</span> advance<span class="token operator">=</span>advance<span class="token punctuation">,</span> description<span class="token operator">=</span><span class="token string-interpolation"><span class="token string">f&quot;[blue]loss=</span><span class="token interpolation"><span class="token punctuation">{</span>loss<span class="token punctuation">:</span><span class="token format-spec">.4f</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
progress<span class="token punctuation">.</span>update<span class="token punctuation">(</span>task<span class="token punctuation">,</span> advance<span class="token operator">=</span>advance<span class="token punctuation">,</span> description<span class="token operator">=</span><span class="token string-interpolation"><span class="token string">f&quot;[green]Complete! loss=</span><span class="token interpolation"><span class="token punctuation">{</span>loss<span class="token punctuation">:</span><span class="token format-spec">.4f</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>

<span class="token comment"># 4.终止进度条</span>
progress<span class="token punctuation">.</span>stop<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="状态动画" tabindex="-1"><a class="header-anchor" href="#状态动画" aria-hidden="true">#</a> 状态动画</h2><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> time <span class="token keyword">import</span> sleep
    tasks <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">]</span>
    <span class="token keyword">with</span> console<span class="token punctuation">.</span>status<span class="token punctuation">(</span><span class="token string">&quot;[bold green]Working on tasks...&quot;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> status<span class="token punctuation">:</span>
        <span class="token keyword">while</span> tasks<span class="token punctuation">:</span>
            task <span class="token operator">=</span> tasks<span class="token punctuation">.</span>pop<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
            sleep<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
            console<span class="token punctuation">.</span>log<span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;</span><span class="token interpolation"><span class="token punctuation">{</span>task<span class="token punctuation">}</span></span><span class="token string"> complete&quot;</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),o=[e];function c(i,l){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","rich 终端输出美化库.html.vue"]]);export{k as default};
