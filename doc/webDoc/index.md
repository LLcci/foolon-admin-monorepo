# 介绍

前端文档将详细介绍前端的目录结构、自定义组件、常用工具等信息。

## 核心技术

[Vue3](https://cn.vuejs.org/) 渐进式 JavaScript 框架，易学易用，性能出色，适用场景丰富的 Web 前端框架。

[Element Plus](https://element-plus.org/zh-CN/) 基于 Vue3，面向设计师和开发者的组件库。

[Vue Router](https://router.vuejs.org/zh/) 是 Vue.js 官方的路由管理器。

[UnoCSS](https://unocss.nodejs.cn/) 即时按需的原子化 CSS 引擎。

[Vite](https://vitejs.cn/vite3-cn/) 是一种新型前端构建工具，能够显著提升前端开发体验。

[Pinia](https://pinia.vuejs.org/zh/) 符合直觉的 Vue.js 状态管理库。

[VueUse](https://vueuse.org/) Vue 的组合工具集。

[Socket.IO](https://socket.nodejs.cn/) 适用于每个平台的双向且低延迟的通信。

## 目录结构

前端的代码在根目录下的`/web`目录下。

```
+-dist            // 打包后的文件
+-node_modules    // 安装的依赖
+-public
\-src
  | App.vue
  | main.ts
  +-assets            // 静态资源
  +-components        // 自定义组件
  +-hooks             // 自定义hooks
  +-router            // 路由
  +-sockets           // socket
  | index.ts
  +-stores             // pinia
  +-types              // 类型定义
  \-views              // 页面
| .env.development        // 开发环境配置
| .env.production         // 生产环境配置
| .eslintrc.cjs           // eslint配置
| .gitignore
| auto-imports.d.ts
| components.d.ts
| docker-compose.yml       // docker-compose 构建配置
| Dockerfile               // Docker 镜像配置
| env.d.ts
| index.html
| LICENSE
| nginx.conf
| package.json
| pnpm-lock.yaml
| README.md
| tsconfig.app.json
| tsconfig.app.tsbuildinfo
| tsconfig.json
| tsconfig.node.json
| tsconfig.node.tsbuildinfo
| uno.config.ts              // unocss 配置
| vite.config.ts             // vite 配置
```
