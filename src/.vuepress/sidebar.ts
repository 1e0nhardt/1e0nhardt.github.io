import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  // 配置什么路径下的侧边栏显示那些东西
  // "structure"会自动将路径对应的文件夹下的所有文件名填入
  // 文件夹路径要以/结尾
  // ""对应README文件
  "/": [
    "", // 主页
    {
      text: "如何使用",
      icon: "laptop-code",
      prefix: "demo/",
      link: "demo/",
      children: "structure",
    },
    {
      text: "文章",
      icon: "book",
      prefix: "posts/",
      children: "structure",
    },
    "intro",
    "slides",
  ],
  "/demo/": "structure",
  "/posts/": "structure"
});
