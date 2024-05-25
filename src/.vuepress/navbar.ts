import { navbar } from "vuepress-theme-hope";

// 数组的每一个元素对应一个导航栏上的条目
// 通常设置各个文件夹的路径，对应导航到该文件夹的README
// 也可以就是一个链接
// 可以用对象进行更精确的控制。如果设置了对象的children属性，则会生成下拉列表
export default navbar([
  "/",
  {
    text: "博客",
    icon: "pen-to-square",
    link: "/blog/"
  },
  {
    text: "游戏开发",
    icon: "gamepad",
    link: "/gamedev/"
  },
  {
    text: "游戏引擎",
    icon: "toolbox",
    link: "/gameengine/"
  },
  {
    text: "学习笔记",
    icon: "marker",
    link: "/notes/"
  },
]);
