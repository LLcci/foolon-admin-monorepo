# 介绍

## 简介

[foolon admin](https://github.com/LLcci/foolon-admin-monorepo) 是一个基于 [NestJS](https://nest.nodejs.cn/)、[Vue3](https://cn.vuejs.org/)、[TypeScript](https://www.tslang.cn/index.html)、[MySQL](https://dev.mysql.com/downloads/)、[Redis](https://www.redis.net.cn/#google_vignette) 编写的一款简单高效的权限管理后台。包括二次封装组件、utils、hooks、动态菜单、权限校验、按钮级别权限控制等功能。可以作为项目的启动模版，快速搭建企业级中后台产品原型。也可以作为一个示例，用于学习 vue3、ts、NestJS 等主流技术。该项目会持续跟进最新技术，并将其应用在项目中。希望这个项目在全栈的路上能够帮助到你。

::: tip
foolon admin 是一个 monorepo 项目，使用 pnpm 的 [Workspace](https://www.pnpm.cn/workspaces) 对多个项目管理。

- `/api`目录下是后端代码
- `/web`目录下是前端代码
- `/doc`目录下是文档代码

:::

## 基础知识

本项目需要一定前、后端基础知识，请确保掌握 Vue、NestJS 的基础知识，以便能处理一些常见的问题。建议在开发前先学一下以下内容，提前了解和学习这些知识，会对项目理解非常有帮助:

- [Vue3](https://cn.vuejs.org/)
- [NestJS](https://nest.nodejs.cn/)
- [MySQL](https://dev.mysql.com/downloads/)
- [Redis](https://www.redis.net.cn/#google_vignette)
- [TypeScript](https://www.tslang.cn/index.html)
- [TypeORM](https://www.typeorm.org/)
- [UnoCSS](https://unocss.dev/)
- [Socket.IO](https://socket.nodejs.cn/)

## 代码获取

### GitHub

```sh
git clone https://github.com/LLcci/foolon-admin-monorepo.git
```

### Gitee

```sh
git clone https://gitee.com/shangchehanyu_admin/foolon-admin-monorepo.git
```

## 浏览器支持

本地开发推荐使用 Chrome 最新版浏览器，不支持Chrome 80以下版本。
::: danger
生产环境支持现代浏览器，不支持 IE。
:::

## 后续更新计划

- [x] 支持队列管理
- [x] 支持定时任务
- [x] 支持逻辑删除
- [x] 支持主题配置
- [ ] 增加字典管理
- [ ] 增加组织结构管理
- [ ] 增加数据权限
- [ ] 增加矩阵管理
- [ ] 增加流程引擎
- [ ] 增加表单设计器
- [ ] 。。。
