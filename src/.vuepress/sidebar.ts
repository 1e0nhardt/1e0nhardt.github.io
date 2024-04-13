import { sidebar } from "vuepress-theme-hope";
// 配置什么路径下的侧边栏显示那些东西
// "structure"会自动将路径对应的文件夹下的所有文件名填入
// 文件夹路径要以/结尾
// ""对应README文件
// 默认的标题不是文件名而是md中的一级标题
export default sidebar({
  "/blog/": "structure",
  "/godot/": "structure",
});
