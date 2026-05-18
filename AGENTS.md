# 项目知识库

**生成时间:** 2026-05-18
**提交:** 1f4d4de
**分支:** master

## 概述

foolon-admin-monorepo — 全栈管理后台脚手架。NestJS 后端 + Vue3 前端 + VitePress 文档，采用 pnpm monorepo 管理。包含认证(JWT)、RBAC 权限、队列(BullMQ)、实时通信(Socket.IO)、代码生成、字典管理等功能。

## 目录结构

```
./
├── api/         # NestJS 后端 (TypeORM / MySQL / Redis / Elasticsearch)
├── web/         # Vue3 前端 (Vite / Pinia / Element Plus / UnoCSS)
├── doc/         # VitePress 文档 (zh-CN)
├── .husky/      # pre-commit (lint-staged) + commit-msg (commitlint)
└── .github/     # 部署文档到 GitHub Pages
```

## 快速查找

| 任务 | 位置 | 说明 |
|------|----------|-------|
| API 入口 | `api/src/main.ts` | NestFactory、全局管道/拦截器、Swagger、Socket.IO |
| 根 NestJS 模块 | `api/src/app.module.ts` | ConfigModule、TypeORM、Redis、Bull、JWT、AdminModule、SocketModule |
| 管理系统模块 | `api/src/admin/system/*/` | 12 个功能模块 (用户、角色、菜单、字典、任务、队列等) |
| 认证与守卫 | `api/src/admin/admin.guard.ts` | JWT 守卫、路由级权限校验 |
| 通用工具 | `api/src/common/` | 常量、装饰器、基础实体、工具函数 |
| Web 入口 | `web/src/main.ts` | Vue 应用启动、Pinia、路由、指令 |
| Vue 路由 | `web/src/router/index.ts` | Hash 历史模式、路由鉴权 (beforeEach) |
| Pinia 状态管理 | `web/src/stores/` | useUser、useDict、useSystem |
| 可复用组件 | `web/src/components/` | SchemaForm、SchemaTable、cronInput、布局 |
| 页面视图 | `web/src/views/sys/` | 8 个管理页面、5 个 API 模块 |
| 自定义组合式函数 | `web/src/hooks/` | useFetch、useDict、useDirectives、useVite |
| Socket.IO | `api/src/socket/` + `web/src/sockets/` | Redis 驱动的 WebSocket 适配器 |
| 文档 | `doc/` | VitePress，3 个部分：apiDoc/ webDoc/ quickStart/ |

## 约定规范

- **Lint-staged**: 对 `web/**/*.{vue,js,ts,jsx,tsx}` 和 `api/**/*.ts` 执行 ESLint 修复 → 然后对所有文件执行 Prettier
- **提交规范**: 遵循 Conventional commits (`@commitlint/config-conventional`)
- **Prettier**: 无分号、单引号、printWidth 100、无尾逗号
- **Husky**: pre-commit → `npx lint-staged`; commit-msg → `npx commitlint`
- **API 路径**: 通过 NestJS RouterModule 添加 `admin/sys` 前缀
- **测试**: Jest 配置内联在 api/package.json 中 (`.spec.ts`)。**前端无测试。**
- **环境变量**: `process.env.NODE_ENV` 控制 TypeORM 同步和 Swagger 可见性

## 反模式 (本项目)

- **`@ts-ignore` / `@ts-nocheck`**: 出现在 `web/src/router/index.ts` (NProgress 导入) 和 schema 类型中。避免新增。
- **无前端测试**: web/ 完全没有测试配置。新代码应添加 vitest。
- **内联 Jest 配置**: Jest 配置在 `api/package.json` 中。建议使用独立的 jest.config.ts。
- **全局 JwtModule**: JWT 在 app.module.ts 中配置，而非独立的 auth 模块。
- **`as any` 类型断言**: 出现在 schema 相关代码中。尽量避免。

## 独特风格

- **`forRoot()` 模式 on Redis/Elasticsearch**: 全局模块使用静态 `forRoot()` 工厂模式，配合字符串注入令牌 `'CONFIG_OPTIONS'`
- **cronInput 组件**: 860 行的自定义 cron 表达式 UI — 前端最复杂的组件
- **Schema 驱动表单**: SchemaForm / SchemaTable / SchemaTableForm 模式，用于通用 CRUD UI（类型定义在 `web/src/types/Schema.d.ts`，2221 行自动生成）
- **RouterModule 嵌套**: 通过 NestJS RouterModule 实现 `admin/sys` 路由前缀，而非全局前缀

## 命令

```bash
# 安装所有依赖
pnpm install

# API 开发
cd api && pnpm run start:dev

# Web 开发
cd web && pnpm run dev

# 文档开发
cd doc && pnpm run docs:dev

# 格式化所有文件
pnpm run format

# API 测试
cd api && pnpm run test
```

## 注意事项

- 非生产环境下 TypeORM `synchronize: true` — schema 变更自动应用。生产部署时需谨慎。
- Swagger 自动生成于 `<host>/swagger-api` (仅开发环境)
- Web 使用 hash 历史模式 (`createWebHashHistory`) — 无需服务端路由支持
- Redis 同时用于 BullMQ 队列和 Socket.IO 适配器
- 文档通过 Gitee → GitHub 镜像部署到 GitHub Pages (origin 为 Gitee)
