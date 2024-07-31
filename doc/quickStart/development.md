# 开始

下面会从头开始介绍本地运行项目的几种方式

## 前言

::: tip 关于组件
项目虽然二次封装了一些组件，但是可能不能满足大部分的要求。所以，如果组件不满足你的要求，完全可以不用甚至删除代码自己写，不必坚持使用项目自带的组件。
:::

## 环境准备

本地环境需要安装 [pnpm](https://www.pnpm.cn/)、[Node.js](https://nodejs.org/zh-cn) 、 [Git](https://git-scm.com/) 、[MySQL](https://dev.mysql.com/downloads/) 和 [Redis](https://www.redis.net.cn/#google_vignette)。
::: warning 注意

- Node.js 版本要求18.x以上。
- 推荐安装 nvm 来管理 Node.js 版本。
- MySQL 和 Redis 推荐使用 [Docker](https://docker-practice.github.io/zh-cn/) 进行安装。
- 本项目支持 [Docker](https://docker-practice.github.io/zh-cn/) ，若使用 Docker Compose 启动项目，请提前安装 [Docker](https://docker-practice.github.io/zh-cn/) 和 Docker Compose。
- 使用 Docker Compose 启动项目，无需单独安装 MySQL 和 Redis。
  :::

## 安装依赖

### 安装Node.js

如果您电脑未安装Node.js，请安装它。

```sh
# 出现相应npm版本即可
npm -v
# 出现相应node版本即可
node -v
```

#### 使用nvm管理Node.js版本

- linux、mac：https://github.com/nvm-sh/nvm
- windows：https://github.com/coreybutler/nvm-windows

### 安装依赖

#### pnpm安装

```sh
# 全局安装pnpm
npm install -g pnpm
# 验证
pnpm -v # 出现对应版本号即代表安装成功
```

#### 依赖安装

在项目根目录下，打开命令窗口执行

```sh
pnpm install
```

::: warning husky安装失败
请查看你的源码是否从 github 或 gitee 直接下载的，直接下载是没有 .git 文件夹的，而 husky 需要依赖 git 才能安装。此时需使用 git init 初始化项目，再尝试重新安装即可。
:::

## 开发环境运行项目

::: warning MySQL 和 Redis

MySQL 和 Redis 需要提前安装好，并对数据库进行初始化。
:::
开发环境的 MySQL 和 Redis 的连接配置在 `/api/.env.development` 文件中。

数据库的初始化脚本在 `/api/sql/ini.sql` 。

### 前端运行

```sh
cd /web
pnpm run dev
```

### 后端运行

```sh
cd /api
pnpm run start
# 热更新
pnpm run start:dev
```

## Docker Compose 启动项目

::: warning Docker Compose
请确保电脑已安装 Docker 和 Docker Compose。

Docker Compose 启动项目：

- 无需单独安装 MySQL 和 Redis。
- 默认使用生产环境配置。
  :::

#### 前后端一体启动

```yml
# 配置MySQL和Redis的持久化目录
# 根目录下的 docker-compose.yml
version: '3.7'
services:
  ...
   mysql-container:
    ...
    volumes:
      # 修改"D:\foolon-admin-mysql"为你的MySQL持久化目录
      - D:\foolon-admin-mysql:/var/lib/mysql
    ...
   redis-container:
    ...
    volumes:
      # 修改"D:\foolon-admin-redis"为你的MySQL持久化目录
      - D:\foolon-admin-redis:/data
```

```sh

# 根目录
pnpm run docker:compose:deploy
```

#### 前端单独启动

```sh
cd /web
pnpm run docker:compose:deploy
```

#### 后端单独启动

```yml
# 配置MySQL和Redis的持久化目录
# /api/docker-compose.yml
version: '3.7'
services:
  ...
   mysql-container:
    ...
    volumes:
      # 修改"D:\foolon-admin-mysql"为你的MySQL持久化目录
      - D:\foolon-admin-mysql:/var/lib/mysql
    ...
   redis-container:
    ...
    volumes:
      # 修改"D:\foolon-admin-redis"为你的MySQL持久化目录
      - D:\foolon-admin-redis:/data
```

```sh
cd /api
pnpm run docker:compose:deploy
```
