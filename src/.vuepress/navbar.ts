import { navbar } from "vuepress-theme-hope";

export default navbar([
  // 数组的每一个元素对应一个导航栏上的条目
  // 通常设置各个文件夹的路径，对应导航到该文件夹的README
  // 也可以就是一个链接
  // 可以用对象进行更精确的控制。如果设置了对象的children属性，则会生成下拉列表
  "/", // /README.md
  "/demo/", // /demo/README.md title为navbar显示的名称
  "/posts/",
  { // 下拉列表的navbar，直接导航到link的md
    text: "博文",
    icon: "pen-to-square",
    prefix: "/posts/",
    children: [
      {
        text: "苹果", // 导航栏显示的标题,可以和文章标题不同
        icon: "pen-to-square", // navbar icon
        prefix: "apple/",
        children: [
          { text: "苹果1", icon: "pen-to-square", link: "1" }, // /posts/apple/1.md
          { text: "苹果2", icon: "pen-to-square", link: "2" },
          "3",
          "4",
        ],
      },
      {
        text: "香蕉",
        icon: "pen-to-square",
        prefix: "banana/",
        children: [
          {
            text: "香蕉 1",
            icon: "pen-to-square",
            link: "1",
          },
          {
            text: "香蕉 2",
            icon: "pen-to-square",
            link: "2",
          },
          "3",
          "4",
        ],
      },
      { text: "樱桃", icon: "pen-to-square", link: "cherry" },
      { text: "火龙果", icon: "pen-to-square", link: "dragonfruit" },
      "tomato",
      "strawberry",
    ],
  },
  // { // navbar链接
  //   text: "V2 文档",
  //   icon: "book",
  //   link: "https://theme-hope.vuejs.press/zh/",
  // },
]);
