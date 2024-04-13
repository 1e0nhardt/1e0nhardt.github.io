---
icon: pen-to-square
isOriginal: true
#author: Ms.Hope
date: 2023-06-11
comment: true
# 此页面会在文章列表置顶
sticky: true
# 此页面会出现在文章收藏中
star: true
category:
  - Blog
tag:
  - vuepress
  - git
description: 记录创建此博客用到的命令和遇到的问题
---

# 此博客的诞生

## 准备环境
[主题的官方教程](https://theme-hope.vuejs.press/zh/cookbook/tutorial/)
1. 安装node.js (18.16 LTS)
2. 安装pnpm[^1] (8.6.1) ` npm install -g pnpm`
3. 创建项目 `pnpm create vuepress-theme-hope dir_name_you_like`
4. 选项
	1. 语言：中文
	2. 包管理器：pnpm
	3. 应用名称：随意
	4. 版本号：随意
	5. 应用描述：随意
	6. 协议：MIT
	7. 多语言：n
	8. GitHub工作流：y
	9. 项目类型：blog
	10. 初始化 Git 仓库: y
5. 进入项目目录，执行项目命令
	1. `pnpm docs:dev` 启动开发服务器
	2. `pnpm docs:build` 构建项目并输出
	3. `pnpm docs:clean-dev` 清除缓存并启动开发服务器
6. 处理vue版本问题`pnpm dlx vp-update`[^2]

## 内容组织
具体的项目结构以及内容如何组织，内容格式，布局等设置请参考[主题的官方教程](https://theme-hope.vuejs.press/zh/cookbook/tutorial/)。

## 部署到GithubPages
1. 新建一个空的特殊仓库 username.github.io
2. 将本地内容推送到GitHub
	1. git remote add origin https://github.com/username/username.github.io.git
	2. git branch -M main
	3. git push -u origin main

### 修改workflow文件
按以上步骤上传项目到GitHub后，GitHub Action会自动开始部署。但我遇到了一个错误  
![](/assets/images/how_to_create_this_blog_4.png)解决方法为在.github/workflows/deploy-docs.yml的第23行后指定version(`pnpm -v`查看)  
```
name: 安装 pnpm
uses: pnpm/action-setup@v2
with:
  version: 8.6.1 # 添加这一行
  run_install: true
```

### 为GithubActions设置相应权限
::: danger
如果没有设置权限，在GithubActions部署时会报错
/usr/bin/git worktree remove github-pages-deploy-action-temp-deployment-folder --force
:::

打开username.github.io仓库
进入Settings->Actions->General后，滑动到底部，然后  
![](/assets/images/how_to_create_this_blog_1.png)选择以下两个选项，点击保存。  
![](/assets/images/how_to_create_this_blog_2.png)
### 设置GitHub Pages部署时使用的分支
进入Settings->Pages, 将部署的分支从main改为gh-pages  
![](/assets/images/how_to_create_this_blog_3.png)

[^1]: 使用corepack安装有问题，会一直卡住，无法安装。所以改用npm安装。
[^2]: 不升级，部署时会遇到Error: usePageHead() is called without provider.