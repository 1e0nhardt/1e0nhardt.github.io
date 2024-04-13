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
    text: "Godot",
    icon: "pen-to-square",
    link: "/godot/"
  },
]);
