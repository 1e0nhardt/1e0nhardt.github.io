import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { shikiPlugin } from "@vuepress/plugin-shiki";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "宁静致远",
  description: "vuepress-theme-hope 的博客演示描述",

  theme,

  plugins: [
    shikiPlugin({
      // 你的选项
      themes: {
        light: "github-light",
        dark: "one-dark-pro",
      },
    }),
  ],

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
