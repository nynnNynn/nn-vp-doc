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
          { text: "面经", link: "/career/interview/" },
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
      // 面经
      "/career/interview/": [
        {
          text: "面经",
          items: [
             { text: "2024.3.21 蔚来", link: "/career/interview/20240321蔚来" },
             { text: "2024.3.21 momenta", link: "/career/interview/20240321momenta" },
              { text: "2024.3.25 淘天", link: "/career/interview/20240325淘天" },
              { text: "2024.3.26 快手", link: "/career/interview/20240326快手" },
              { text: "2024.3.26 滴滴", link: "/career/interview/20240326滴滴" },
          ],
        },
      ],
      "/projects/diarriors/": [
        {
          text: "Diarriors",
          items: [
             { text: "介绍", link: "/projects/diarriors/" },
            { text: "阶段性文档2026.2.14", link: "/projects/diarriors/2026.2.14" },
            { text: "积累文档自2026.2.14", link: "/projects/diarriors/2026.2.14——" },
           
          ],
        },
      ],
    },
  },
});
