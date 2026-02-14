// docs/.vitepress/config.mjs
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'VP Min',
  description: 'Minimal VitePress with nav + sidebar',

  themeConfig: {
    // 顶部栏
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' }
    ],

    // 侧边栏（按路径分组）
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '快速开始', link: '/guide/' },
            { text: '第二页', link: '/guide/second' }
          ]
        }
      ]
    }
  }
})
