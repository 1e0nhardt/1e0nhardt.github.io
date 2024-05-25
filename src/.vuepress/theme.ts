import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  hostname: "https://1e0nhardt.github.io",

  author: {
    name: "leonhardt",
    url: "/intro.html",
  },

  iconAssets: "fontawesome-with-brands",

  logo: "https://theme-hope-assets.vuejs.press/logo.svg",

  repo: "vuepress-theme-hope/vuepress-theme-hope",
  repoDisplay: false,

  docsDir: "src",

  // 全局禁用博客不需要的显示在页面末尾的编辑链接，贡献者，贡献时间
  lastUpdated: false,
  editLink: false,
  contributors: false,

  pageInfo: ["Author", "Date", "PageView", "ReadingTime", "Category", "Tag"],

  // 导航栏
  navbar,

  // 侧边栏
  sidebar,

  // 页脚
  footer: "想，都是问题。做，才是答案。",
  displayFooter: true,

  // 博客相关
  blog: {
    avatar: "/assets/bochi.png",
    roundAvatar: true,
    name:"Leonhardt",
    description: "潜龙勿用",
    intro: "/intro.html",
    timeline: "昨日不在",
    articlePerPage: 7,
    articleInfo: ["Author", "Date", "PageView", "ReadingTime", "Category", "Tag"],
    medias: {
      GitHub: "https://github.com/1e0nhardt",
      BiliBili: "https://space.bilibili.com/8351880?spm_id_from=333.1007.0.0",
      Gmail: "mailto:hukigane@gmail.com",
      Zhihu: "https://www.zhihu.com/people/jiang-hua-36-24",
    },
  },

  // 加密配置
  encrypt: {
    config: {
      "/demo/encrypt.html": ["1234"],
    },
  },

  // 多语言配置
  metaLocales: {
    editLink: "在 GitHub 上编辑此页",
  },

  // 如果想要实时查看任何改变，启用它。注: 这对更新性能有很大负面影响
  // hotReload: true,

  // 在这里配置主题提供的插件
  plugins: {
    blog: {
      excerptLength: 0,
    },

    searchPro: true,

    prismjs: false,
    
    comment: {
      comment: true,
      // You should generate and use your own comment service
      provider: "Giscus",
      repo: "1e0nhardt/1e0nhardt.github.io",
      repoId: "R_kgDOJtUI3g",
      category: "Announcements",
      categoryId: "DIC_kwDOJtUI3s4CeqeY"
    },

    components: {
      components: ["Badge", "VPCard", "VidStack", "BiliBili"],
    },

    // 此处开启了很多功能用于演示，你应仅保留用到的功能。
    mdEnhance: {
      align: true,
      attrs: true,
      codetabs: true,
      component: true,
      demo: true,
      figure: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      mark: true,
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      tasklist: true,
      vPre: true,

      // 在启用之前安装 chart.js
      // chart: true,

      // insert component easily

      // 在启用之前安装 echarts
      // echarts: true,

      // 在启用之前安装 flowchart.ts
      flowchart: true,

      // gfm requires mathjax-full to provide tex support
      gfm: true,

      // 在启用之前安装 katex
      katex: true,

      // 在启用之前安装 mathjax-full
      // mathjax: true,

      // 在启用之前安装 mermaid
      mermaid: true,

      // playground: {
      //   presets: ["ts", "vue"],
      // },

      // 在启用之前安装 reveal.js
      revealJs: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
        themes: ["auto", "serif", "black"]
      },

      // 在启用之前安装 @vue/repl
      // vuePlayground: true,

      // install sandpack-vue3 before enabling it
      // sandpack: true,
    },
  },
});
