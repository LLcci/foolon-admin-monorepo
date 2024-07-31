import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: 'foolon admin',
  locales: {
    root: {
      label: '中文',
      lang: 'zh-CN',
      link: '/',
      themeConfig: {
        outlineTitle: '本页目录',
        docFooter: {
          prev: '上一页',
          next: '下一页'
        },
        search: {
          provider: 'local',
          options: {
            translations: {
              button: {
                buttonText: '搜索',
                buttonAriaLabel: '搜索'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询结果',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭'
                }
              }
            }
          }
        }
      }
    }
  },
  description: 'nestjs + vue3 + TS 的后台管理系统框架',
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }]],
  themeConfig: {
    logo: '/favicon.svg',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '快速上手', link: '/quickStart/introduce' },
      { text: '后端文档', link: '/markdown-examples' },
      { text: '前端文档', link: '/markdown-examples' }
    ],
    sidebar: {
      '/quickStart/': [
        {
          text: '快速上手',
          items: [
            { text: '介绍', link: '/quickStart/introduce' },
            { text: '项目配置', link: '/quickStart/config' },
            { text: '本地运行', link: '/quickStart/development' },
            { text: '项目部署', link: '/quickStart/production' }
          ]
        }
      ]
    },
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
