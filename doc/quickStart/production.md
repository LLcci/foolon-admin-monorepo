# 开始

下面会从头开始介绍部署项目的几种方式
::: warning 注意
部署前根据实际情况，对[项目配置](./config.md)进行修改
:::

## 传统应用部署

### 环境准备

生产环境需要安装 [Node.js](https://nodejs.org/zh-cn) 、 [pnpm](https://www.pnpm.cn/) 和 [Nginx](https://nginx.org/en/download.html) ，[MySQL](https://dev.mysql.com/downloads/) 和 [Redis](https://www.redis.net.cn/#google_vignette) 可安装在应用服务器上，也可单独安装。

### 安装依赖

```sh
# 项目根目录
pnpm install
```

### 前端打包

```sh
cd /web
pnpm run build
```

### 后端打包

```sh
cd /api
pnpm run build
```

### 修改nginx配置

::: warning 注意
下面的nginx配置仅供参考，请按照项目实际需要修改/web/nginx.conf配置
:::

```sh
# nginx 配置文件
# nginx 启动用户
user nginx;
worker_processes 1;

error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;

events {
  worker_connections  1024;
}

upstream wsbackend{
  server 127.0.0.1:8081;
  keepalive 1000;
}

http {
  map $http_upgrade $connection_upgrade {
    default upgrade;
    '' close;
  }
  include /etc/nginx/mime.types;
  default_type  application/octet-stream;
  log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
  access_log  /var/log/nginx/access.log  main;
  sendfile        on;
  keepalive_timeout  65;
  server {
    listen       80;
    charset utf-8;
    # 域名
    server_name  localhost;
    # 前端配置
    location / {
      # 前端打包后的静态资源目录
      root   /usr/share/nginx/html;
      index  index.html index.htm;
      try_files $uri $uri/ /index.html;
    }
    # 后端配置
    location  /api/ {
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header REMOTE-HOST $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
			add_header Access-Control-Allow-Methods *;
			add_header Access-Control-Allow-Origin $http_origin;
      proxy_pass http://127.0.0.1:8080/;
    }
  }
  # websocket 配置
  server {
    listen 8081;
    location /{
      proxy_http_version 1.1;
      proxy_pass http://wsbackend;
      proxy_redirect off;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_read_timeout 3600s;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection $connection_upgrade;
    }
  }
}
```

```sh
# 重启nginx
# nginx的bin文件目录下
./nginx -s reload
```

### 前端部署

上传`/web/dist`目录下的文件到服务器
::: warning 注意
服务器上的目录，需与nginx配置中的静态资源目录目录保持一致
:::

### 后端部署

上传`/api/dist`文件夹、`/api/.env.production`、`/api/package.json`和`/api/pnpm-lock.yaml`到服务器同一目录下

```sh
# 后端项目根目录
# 安装依赖
pnpm install
# 安装pm2
pnpm install pm2 -g
# 启动项目
pnpm run pm2:prod
```

## Docker 容器化部署

### 环境准备

生产环境需要安装 [Node.js](https://nodejs.org/zh-cn) 、 [pnpm](https://www.pnpm.cn/) 、 [Git](https://git-scm.com/) 、 [Docker](https://docker-practice.github.io/zh-cn/) 和 Docker Compose 。
::: tip 提示
若生产环境使用k8s部署，请参考前端镜像生成、后端镜像生成。
:::

### 克隆项目

#### GitHub

```sh
git clone https://github.com/LLcci/foolon-admin-monorepo.git
```

#### Gitee

```sh
git clone https://gitee.com/shangchehanyu_admin/foolon-admin-monorepo.git
```

### 安装依赖

```sh
# 项目根目录
pnpm install
```

### 前后端一体启动

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

### 前端单独启动

```sh
cd /web
pnpm run docker:compose:deploy
```

### 后端单独启动

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
