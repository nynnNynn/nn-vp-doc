// docs/.vitepress/config.mjs
import { defineConfig } from "vitepress";

export default defineConfig({
  title: "nn-doc",
  description: "学习文档，笔记，以及杂七杂八",

  themeConfig: {
    // 顶部栏
    nav: [
      { text: "首页", link: "/" },
      {
        text: "求职",
        items: [
          { text: "leetcode", link: "/career/leetcode/" },
          { text: "八股文", link: "/career/bagu/" },
        ],
      },
      {
        text: "学习",
        items: [{ text: "2026 spring", link: "/study/spring2026/" }],
      },
      { text: "指南", link: "/guide/" },
      {
        text: "项目",
        items: [
          { text: "Diarriors", link: "/projects/diarriors/" },
          { text: "Travel AI", link: "/projects/travel-ai/" },
        ],
      },
    ],

    // 侧边栏（按路径分组）
    sidebar: {
      "/guide/": [
        {
          text: "指南",
          items: [
            { text: "快速开始", link: "/guide/" },
            { text: "第二页", link: "/guide/second" },
          ],
        },
      ],
      "/projects/diarriors/": [
        {
          text: "Diarriors",
          items: [
             { text: "介绍", link: "/projects/diarriors/" },
            { text: "阶段性文档2026.2.14", link: "/projects/diarriors/2026.2.14" },
           
          ],
        },
      ],
    },
  },
});
