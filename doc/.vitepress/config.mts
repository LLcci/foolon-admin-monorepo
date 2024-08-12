import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/foolon-admin-monorepo/',
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
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/foolon-admin-monorepo/favicon.svg' }],
    [
      'meta',
      {
        name: 'Keywords',
        content:
          'foolon,fonlonadmin,foolon admin,foolon-admin,foolon-admin-monorepo,foolon-admin-monorepo-docs,foolon-admin-monorepo-docs-zh,foolon-admin-monorepo-docs-en,foolon-admin-monorepo-docs-cn,foolon-admin-monorepo-docs-docs,foolon-admin-monore'
      }
    ]
  ],
  themeConfig: {
    logo: '/favicon.svg',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '快速上手', link: '/quickStart/introduce' },
      { text: '后端文档', link: '/apiDoc/index' },
      { text: '前端文档', link: '/webDoc/index' }
    ],
    sidebar: {
      '/quickStart/': [
        {
          text: '快速上手',
          items: [
            { text: '介绍', link: '/quickStart/introduce' },
            { text: '项目配置', link: '/quickStart/config' },
            { text: 'NPM脚本', link: '/quickStart/scripts' },
            { text: '本地运行', link: '/quickStart/development' },
            { text: '项目部署', link: '/quickStart/production' },
            { text: '权限配置', link: '/quickStart/permission' }
          ]
        }
      ],
      '/apiDoc/': [
        {
          text: '后端文档',
          items: [
            { text: '介绍', link: '/apiDoc/index' },
            { text: '全局模块', link: '/apiDoc/global' },
            { text: 'admin模块', link: '/apiDoc/admin' },
            { text: 'socket', link: '/apiDoc/socket' },
            { text: '自定义注解', link: '/apiDoc/decorator' },
            { text: '常见问题', link: '/apiDoc/FAQ' }
          ]
        }
      ],
      '/webDoc/': [
        {
          text: '前端文档',
          items: [
            { text: '介绍', link: '/webDoc/index' },
            { text: '路由', link: '/webDoc/route' },
            { text: '自定义组件', link: '/webDoc/component' },
            { text: '自定义指令', link: '/webDoc/directive' },
            { text: '常见问题', link: '/webDoc/FAQ' }
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
