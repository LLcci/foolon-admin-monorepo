import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'foolon admin',
  description: 'nestjs + vue3 + TS 的后台管理系统框架',
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }]],
  themeConfig: {
    logo: '/favicon.svg',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '快速上手', link: '/' },
      { text: '后端文档', link: '/markdown-examples' },
      { text: '前端文档', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/LLcci/foolon-admin-monorepo' }],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present LLcci'
    },
    search: {
      provider: 'local'
    }
  }
})
