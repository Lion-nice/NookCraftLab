import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "NookCraftLab",
  description: "在线文档库",
  base: "/NookCraftLab/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '目录', link: '/Document' }
    ],

    sidebar: [
      {
        text: '产品信息目录',
        items: [
          { text: ' HX-40 产品信息', link: '/HX40' },
          { text: '', link: '/' }
        ]
      },
      {
        text: '用户手册目录',
        items: [
          { text: ' HX-40 产品信息', link: '/HX40-2' },
          { text: '', link: '/' }
        ]
      },
      {
        text: '其他',
        items: [
          { text:'固件下载', link: '/download' },
          { text:'软件下载', link: '/download-2' },
          { text:'关于我们', link: '/about' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
