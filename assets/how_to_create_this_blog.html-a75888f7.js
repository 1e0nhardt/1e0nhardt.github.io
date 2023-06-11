import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{r as n,o as l,c as r,b as e,d as o,e as i,a}from"./app-84045666.js";const c="/assets/images/how_to_create_this_blog_4.png",d="/assets/images/how_to_create_this_blog_1.png",h="/assets/images/how_to_create_this_blog_2.png",p="/assets/images/how_to_create_this_blog_3.png",u={},_=e("h1",{id:"此博客的诞生",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#此博客的诞生","aria-hidden":"true"},"#"),o(" 此博客的诞生")],-1),g=e("h2",{id:"准备环境",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#准备环境","aria-hidden":"true"},"#"),o(" 准备环境")],-1),m={href:"https://theme-hope.vuejs.press/zh/cookbook/tutorial/",target:"_blank",rel:"noopener noreferrer"},b=a('<ol><li>安装node.js (18.16 LTS)</li><li>安装pnpm<sup class="footnote-ref"><a href="#footnote1">[1]</a><a class="footnote-anchor" id="footnote-ref1"></a></sup> (8.6.1) <code> npm install -g pnpm</code></li><li>创建项目 <code>pnpm create vuepress-theme-hope dir_name_you_like</code></li><li>选项 <ol><li>语言：中文</li><li>包管理器：pnpm</li><li>应用名称：随意</li><li>版本号：随意</li><li>应用描述：随意</li><li>协议：MIT</li><li>多语言：n</li><li>GitHub工作流：y</li><li>项目类型：blog</li><li>初始化 Git 仓库: y</li></ol></li><li>进入项目目录，执行项目命令 <ol><li><code>pnpm docs:dev</code> 启动开发服务器</li><li><code>pnpm docs:build</code> 构建项目并输出</li><li><code>pnpm docs:clean-dev</code> 清除缓存并启动开发服务器</li></ol></li><li>处理vue版本问题<code>pnpm dlx vp-update</code><sup class="footnote-ref"><a href="#footnote2">[2]</a><a class="footnote-anchor" id="footnote-ref2"></a></sup></li></ol><h2 id="内容组织" tabindex="-1"><a class="header-anchor" href="#内容组织" aria-hidden="true">#</a> 内容组织</h2>',2),f={href:"https://theme-hope.vuejs.press/zh/cookbook/tutorial/",target:"_blank",rel:"noopener noreferrer"},v=e("h2",{id:"部署到githubpages",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#部署到githubpages","aria-hidden":"true"},"#"),o(" 部署到GithubPages")],-1),k={href:"http://username.github.io",target:"_blank",rel:"noopener noreferrer"},x={href:"https://github.com/username/username.github.io.git",target:"_blank",rel:"noopener noreferrer"},w=e("li",null,"git branch -M main",-1),y=e("li",null,"git push -u origin main",-1),G=a('<h3 id="修改workflow文件" tabindex="-1"><a class="header-anchor" href="#修改workflow文件" aria-hidden="true">#</a> 修改workflow文件</h3><p>按以上步骤上传项目到GitHub后，GitHub Action会自动开始部署。但我遇到了一个错误<br><img src="'+c+`" alt="" loading="lazy">解决方法为在.github/workflows/deploy-docs.yml的第23行后指定version(<code>pnpm -v</code>查看)</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>name: 安装 pnpm
uses: pnpm/action-setup@v2
with:
  version: 8.6.1 # 添加这一行
  run_install: true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="为githubactions设置相应权限" tabindex="-1"><a class="header-anchor" href="#为githubactions设置相应权限" aria-hidden="true">#</a> 为GithubActions设置相应权限</h3><div class="hint-container danger"><p class="hint-container-title">警告</p><p>如果没有设置权限，在GithubActions部署时会报错 /usr/bin/git worktree remove github-pages-deploy-action-temp-deployment-folder --force</p></div><p>打开username.github.io仓库 进入Settings-&gt;Actions-&gt;General后，滑动到底部，然后<br><img src="`+d+'" alt="" loading="lazy">选择以下两个选项，点击保存。<br><img src="'+h+'" alt="" loading="lazy"></p><h3 id="设置github-pages部署时使用的分支" tabindex="-1"><a class="header-anchor" href="#设置github-pages部署时使用的分支" aria-hidden="true">#</a> 设置GitHub Pages部署时使用的分支</h3><p>进入Settings-&gt;Pages, 将部署的分支从main改为gh-pages<br><img src="'+p+'" alt="" loading="lazy"></p><hr class="footnotes-sep"><section class="footnotes"><ol class="footnotes-list"><li id="footnote1" class="footnote-item"><p>使用corepack安装有问题，会一直卡住，无法安装。所以改用npm安装。 <a href="#footnote-ref1" class="footnote-backref">↩︎</a></p></li><li id="footnote2" class="footnote-item"><p>不升级，部署时会遇到Error: usePageHead() is called without provider. <a href="#footnote-ref2" class="footnote-backref">↩︎</a></p></li></ol></section>',10);function z(H,A){const t=n("ExternalLinkIcon");return l(),r("div",null,[_,g,e("p",null,[e("a",m,[o("主题的官方教程"),i(t)])]),b,e("p",null,[o("具体的项目结构以及内容如何组织，内容格式，布局等设置请参考"),e("a",f,[o("主题的官方教程"),i(t)]),o("。")]),v,e("ol",null,[e("li",null,[o("新建一个空的特殊仓库 "),e("a",k,[o("username.github.io"),i(t)])]),e("li",null,[o("将本地内容推送到GitHub "),e("ol",null,[e("li",null,[o("git remote add origin "),e("a",x,[o("https://github.com/username/username.github.io.git"),i(t)])]),w,y])])]),G])}const P=s(u,[["render",z],["__file","how_to_create_this_blog.html.vue"]]);export{P as default};