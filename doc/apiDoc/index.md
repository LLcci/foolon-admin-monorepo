# 介绍

后端文档将详细介绍后端的目录结构、模块、自定义注解、常用工具等信息。

## 核心技术

[NestJS](https://nest.nodejs.cn/) 是一个用于构建高效、可扩展的 Node.js 服务器端应用的框架。它使用渐进式 JavaScript，构建并完全支持 TypeScript（但仍然允许开发者使用纯 JavaScript 进行编码）并结合了 OOP（面向对象编程）、FP（函数式编程）和 FRP（函数式反应式编程）的元素。

[TypeORM](https://typeorm.biunav.com/) 是一个 ORM 框架，它可以运行在 NodeJS、Browser、Cordova、PhoneGap、Ionic、React Native、Expo 和 Electron 平台上，可以与 TypeScript 和 JavaScript (ES5,ES6,ES7,ES8)一起使用。 它的目标是始终支持最新的 JavaScript 特性并提供额外的特性以帮助你开发任何使用数据库的（不管是只有几张表的小型应用还是拥有多数据库的大型企业应用）应用程序。

## 目录结构

后端的代码在根目录下的`/api`目录下。

```
+-dist              // 打包后的文件
+-logs              // 本地运行的日志
+-node_modules      // 安装的依赖
+-sql               // 初始化的sql
+-src
| | app.module.ts         // 根模块
| | main.ts               // 入口文件
| +-admin                 // 后台管理模块
| +-common
| | +-class                       // 公共类
| | +-constants                   // 全局常量
| | +-decorator                   // 全局装饰器
| | +-entity                      // 实体类
| | +-utils                       // 工具类
| +-global           // 全局模块
| +-socket           // socket模块
+-test               // 单元测试
+-upload             // 上传文件
| .env.development   // 开发环境配置
| .env.production    // 生产环境配置
| .eslintrc.js       // eslint配置
| .gitignore
| docker-compose.yml // docker-compose 构建配置
| Dockerfile         // Docker 镜像配置
| ecosystem.config.js // pm2启动配置
| LICENSE
| nest-cli.json      // nest-cli 全局配置
| package.json
| pnpm-lock.yaml
| README.md
| swagger-spec.json  // swager json
| tsconfig.build.json
| tsconfig.json
```