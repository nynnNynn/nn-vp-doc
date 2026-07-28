// docs/.vitepress/config.mjs
import { defineConfig } from "vitepress";
import { withPwa } from "@vite-pwa/vitepress";

export default withPwa(
  defineConfig({
    title: "宁宁爱学习",
    description: "学习文档，笔记，以及杂七杂八",

    themeConfig: {
      // 顶部栏
      nav: [
        { text: "首页", link: "/" },
        {
          text: "读书笔记",
          items: [
            { text: "概览", link: "/读书笔记/" },
            { text: "历史", link: "/读书笔记/历史/匈奴列传" },
            { text: "小说", link: "/读书笔记/小说/酒吧长谈" },
            { text: "专业", link: "/读书笔记/专业/人月神话" },
          ],
        },
        {
          text: "求职",
          items: [
            { text: "leetcode", link: "/career/leetcode/" },
            { text: "八股文", link: "/career/bagu/" },
            { text: "面经", link: "/career/interview/" },
          ],
        },
        {
          text: "学期",
          items: [{ text: "2026 spring", link: "/study/spring2026/" }],
        },
        { text: "指南", link: "/guide/" },
      ],

      // 侧边栏（按路径分组）
      sidebar: {
        "/读书笔记/": [
          {
            text: "读书笔记",
            items: [{ text: "概览", link: "/读书笔记/" }],
          },
          {
            text: "历史",
            items: [
              { text: "匈奴列传", link: "/读书笔记/历史/匈奴列传" },
              { text: "资治通鉴笔记", link: "/读书笔记/历史/资治通鉴笔记" },
            ],
          },
          {
            text: "小说",
            items: [
              { text: "酒吧长谈", link: "/读书笔记/小说/酒吧长谈" },
              { text: "围城", link: "/读书笔记/小说/围城" },
            ],
          },
          {
            text: "专业",
            items: [
              { text: "人月神话", link: "/读书笔记/专业/人月神话" },
              { text: "设计模式", link: "/读书笔记/专业/设计模式" },
            ],
          },
        ],
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
              {
                text: "2024.3.21 momenta",
                link: "/career/interview/20240321momenta",
              },
              { text: "2024.3.25 淘天", link: "/career/interview/20240325淘天" },
              { text: "2024.3.26 快手", link: "/career/interview/20240326快手" },
              { text: "2024.3.26 滴滴", link: "/career/interview/20240326滴滴" },
            ],
          },
        ],
        "/career/bagu/": [
          {
            text: "前端八股文",
            items: [{ text: "html", link: "/career/bagu/html" }],
          },
        ],
        "/career/leetcode/": [
          {
            text: "leetcode",
            items: [
              { text: "完成列表", link: "/career/leetcode/" },
              { text: "计划文档", link: "/career/leetcode/plan" },
            ],
          },
        ],
        "/study/spring2026/": [
          {
            text: "2026 spring学期",
            items: [
              { text: "4278", link: "/study/spring2026/cs4278/" },
              { text: "微分方程", link: "/study/spring2026/ode/" },
              {
                text: "4278midterm速查",
                link: "/study/spring2026/cs4278midterm/",
              },
              { text: "4278模板", link: "/study/spring2026/cs4278template/" },
              { text: "4278Final", link: "/study/spring2026/CS4278FInal/" },
              { text: "4.12考试周", link: "/study/spring2026/4.12/" },
            ],
          },
        ],
      },
    },

    // PWA：首次在线访问后，整站静态资源可离线阅读
    pwa: {
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "favicon.svg"],
      manifest: {
        name: "宁宁爱学习",
        short_name: "宁宁爱学习",
        description: "学习文档，笔记，以及杂七杂八",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        lang: "zh-CN",
        start_url: "/",
      },
      workbox: {
        // 预缓存构建产物里的页面与静态资源
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2,json,webmanifest}"],
        // 文档站体积可能偏大，适当提高上限
        maximumFileSizeToCacheInBytes: 8 * 1024 * 1024,
      },
      experimental: {
        includeAllowlist: true,
      },
      devOptions: {
        enabled: false,
      },
    },
  }),
);
