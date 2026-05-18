# API — NESTJS 后端

## 概述

管理后台的 NestJS 后端 (TypeORM, MySQL, Redis, BullMQ, Elasticsearch, Socket.IO, JWT 认证)。

## 目录结构

```
api/src/
├── app.module.ts          # 根模块: ConfigModule, TypeORM, Redis, Bull, JWT, Socket, AdminModule
├── main.ts                # 启动: 全局管道、拦截器、Swagger、Socket.IO
├── admin/
│   ├── admin.module.ts    # RouterModule — 将 /admin/sys 映射到系统模块
│   ├── admin.guard.ts     # JWT 守卫 + @Permissions() 校验
│   ├── transform.interceptor.ts
│   ├── exception.filter.ts
│   └── system/            # 12 个功能模块
│       ├── system.module.ts
│       ├── codeGen/       # 基于 api/template/ 模板的完整 CRUD 代码生成 (handlebars)
│       ├── dict/          # 2 种字典类型 (控制器、服务、实体、模块)
│       ├── login/         # LocalStrategy、JWT 签发
│       ├── logout/        # Token 失效处理
│       ├── menu/          # RBAC 菜单树
│       ├── online/        # 基于 Redis 的在线用户追踪
│       ├── permission/    # 扁平权限键
│       ├── queues/        # task + email 两种队列类型
│       ├── role/          # 角色-权限映射
│       ├── task/          # 延迟任务作业
│       ├── upload/        # 文件上传 (无实体)
│       └── user/          # 用户 CRUD
├── common/
│   ├── constants/         # 6 个文件: password, permission, queues, redis, result, token
│   ├── class/             # BaseEntity (继承 CommonEntity)
│   ├── decorator/         # @Public, @Roles, @Permissions, @Uuid, @Db, @Api
│   ├── entity/            # CommonEntity (id、时间戳基类)
│   └── utils/             # bcrypt、crypto、excel (XLSX)、tree、validation
├── global/
│   ├── elasticsearch/     # 模块 + 服务 (forRoot() 模式)
│   ├── logger/            # 模块 + 服务 + 拦截器
│   └── redis/             # 模块 + 服务 (forRoot() 模式)
└── socket/                # 网关、模块、RedisIoAdapter
```

## 快速查找

| 需求 | 文件/模块 |
|------|-------------|
| 认证流程 | `admin/system/login/` + `admin.guard.ts` |
| 权限校验 | `@Permissions('system:user:create')` 装饰器 → `admin.guard.ts` |
| 基础实体字段 | `common/entity/` (CommonEntity) → `common/class/` (BaseEntity) |
| 代码生成 | `codeGen/` — 从 `api/template/api/` 读取模板 |
| 文件上传 | `upload/` — 控制器 + 服务，无实体 |
| 队列类型 | `queues/` — task (延迟) + email |
| 在线追踪 | `online/` — 基于 Redis 的连接用户集合 |
| Excel 导出 | `common/utils/excel.service.ts` |
| 树形结构构建 | `common/utils/tree.utils.ts` |
| 装饰器 | `common/decorator/` — 6 个装饰器 |
| Socket.IO | `socket/` — 网关 + RedisIoAdapter |
| E2E 测试 | `api/test/` (jest-e2e.json 配置) |

## 约定规范

- **路由前缀**: 控制器使用 `@Controller('sys/xxx')` — 解析为 `/admin/sys/xxx`
- **CRUD 模式**: create, findAll, findOne, update, delete — RESTful 风格
- **验证**: 在 DTO 上使用 `class-validator` 装饰器
- **Swagger**: 在控制器和 DTO 上使用装饰器生成 API 文档
- **模块模式**: 每个功能模块注册其控制器 + 服务 + 实体
- **Jest 配置**: 内联在 `api/package.json` 中 (无独立 jest.config.ts)
- **模板语法**: 代码生成模板使用类 handlebars 的 `{{variable}}` 语法

## 反模式

- **全局 JwtModule** 在 `app.module.ts` 中 — 未隔离到独立的 AuthModule
- **forRoot() 使用字符串令牌**: RedisModule + ElasticsearchModule 使用 `'CONFIG_OPTIONS'` 注入令牌
- **code-gen.service.ts** 286 行 — 最大的服务文件，建议重构
- **无分页 DTO**: 分页参数作为原始查询参数传递
- **返回普通对象**: 部分控制器跳过了响应 DTO
- **SQL/ 目录**: 手动迁移脚本 (`api/sql/`) — TypeORM `synchronize: true` 处理开发环境 schema
