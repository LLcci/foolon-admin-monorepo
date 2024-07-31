# 项目配置

下面将分别介绍前端和后端的配置

## 前端配置

开发环境配置在 `/web/.env.development` 文件中。

生产环境配置在 `/web/.env.production` 文件中。

具体可以参考 [Vite 文档](https://vitejs.cn/vite3-cn/guide/env-and-mode.html)

```sh
# 项目标题
VITE_APP_TITLE = '洛阳城市停车'
# 项目名称
VITE_APP_NAME = '运营支撑系统'
# 项目描述
VITE_APP_DESCRIPTION = '欢迎使用运营支撑系统'
# 后端接口地址
VITE_API_URL = 'http://localhost:8080'
# websocket地址
VITE_WS_URL = 'http://localhost:8081'
# 头像地址
VITE_AVATAR_URL = 'http://localhost:8080/avatar'
```

## 后端配置

开发环境配置在 `/api/.env.development` 文件中。

生产环境配置在 `/api/.env.production` 文件中。

具体可以参考 [NestJS 文档](https://nest.nodejs.cn/techniques/configuration)

```sh
# 服务端口
SERVER_PORT=8080
# websocket端口
WS_PORT=8081

# mysql
# 连接地址
DB_HOST=localhost
# 用户名
DB_USERNAME=root
# 密码
DB_PASSWORD=root
# 端口
DB_PORT=3306
# 名称
DB_DATABASE=foolon-admin

# elasticsearch
# 连接地址
ES_HOST=http://localhost:9200
# 用户名
EX_USER=elastic
# 密码
EX_PASSWORD=H9tCSNrpQXSpLYNmJ=EJ
# apikey
ES_APIKEY=MDJWTVpvd0J0eG4yWlZaWHc2Q3o6T1pBdFBFVVpRM21md2ZVN1NzaG9hZw==

# redis
# 连接地址
REDIS_HOST=localhost
# 端口
REDIS_PORT=6379
# 密码
REDIS_PASSWORD=floolon-admin:H9tCSNrpQXSpLYNmJ=EJ
# 数据库
REDIS_DB=1
```
