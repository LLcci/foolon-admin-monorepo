# WEB — VUE3 前端

Vue3 SPA (Vite, Pinia, Element Plus, UnoCSS, Socket.IO 客户端, hash 路由)。

## 目录结构

```
web/src/
├── main.ts                   # 启动: createApp、Pinia、路由、指令、图标、sockets
├── router/index.ts           # Hash 历史模式: /login、/ (布局 → 子路由)
├── stores/                   # Pinia 状态管理
│   ├── useUser.ts            # Token、权限、用户信息 (212 行)
│   ├── useDict.ts            # 字典缓存
│   └── useSystem.ts          # 系统配置
├── hooks/                    # 组合式函数
│   ├── useFetch.ts           # Axios 封装、拦截器
│   ├── useDict.ts            # 字典辅助函数
│   ├── useDirectives.ts      # v-permissions 指令
│   └── useVite.ts            # Vite 环境变量辅助
├── components/               # 可复用组件
│   ├── cronInput/            # Cron 表达式构建器 (860 行)
│   ├── dictSelect/           # 字典驱动下拉选择
│   ├── layout/               # MainLayout.vue (530 行: 侧边栏、顶栏、标签页)
│   ├── schemaForm/           # Schema 驱动表单
│   ├── schemaTable/          # Schema 驱动表格
│   ├── schemaTableForm/      # 表格+表单组合 CRUD (526 行)
│   └── ...                   # avatarUpload、formTree、iconSelect、userMenuTree
├── views/
│   ├── home/IndexHome.vue    # 仪表盘首页
│   ├── login/IndexLogin.vue  # 登录页
│   ├── sys/                  # 8 个管理页面
│   │   ├── SysUser.vue、SysMenu.vue、SysDict.vue (314-533 行)
│   │   ├── SysRole.vue、SysTask.vue、SysQueues.vue、SysCodeGen.vue、SysOnline.vue
│   │   ├── api/              # 同目录 API 模块
│   │   └── hooks/            # 页面级组合式函数
│   ├── iframe/               # Iframe 包装器
│   └── demo/                 # 演示页面
├── types/                    # TS 类型声明
│   ├── Schema.d.ts           # 自动生成的 2221 行 schema 类型
│   ├── env.d.ts、shim.d.ts、vue.d.ts
├── sockets/                  # Socket.IO 客户端 (自动连接)
└── assets/                   # 静态资源
```

## 快速查找

| 任务                             | 位置                                         |
| -------------------------------- | -------------------------------------------- |
| 应用入口、Pinia $reset polyfill  | `src/main.ts`                                |
| 路由 (hash)、鉴权守卫            | `src/router/index.ts`                        |
| 认证状态、token、权限            | `src/stores/useUser.ts`                      |
| API 层 (Axios、错误处理)         | `src/hooks/useFetch.ts`                      |
| 按钮级权限                       | `src/hooks/useDirectives.ts` (v-permissions) |
| 自动生成的 schema 类型 (2221 行) | `src/types/Schema.d.ts` (请勿编辑)           |
| 基于 JSON schema 的通用 CRUD     | `src/components/schemaTableForm/`            |
| Cron 表达式 UI (860 行)          | `src/components/cronInput/`                  |
| 布局 (侧边栏、顶栏、标签页)      | `src/components/layout/`                     |
| 字典缓存                         | `src/stores/useDict.ts`                      |
| 8 个管理功能页面                 | `src/views/sys/`                             |
| Socket.IO                        | `src/sockets/` (自动连接)                    |

## 约定规范

- **组件命名**: PascalCase .vue 文件
- **Store/Hook 命名**: `useXxx.ts` (Pinia / 组合式函数约定)
- **脚本**: 所有组件使用 `<script setup lang="ts">`
- **API 模块**: 位于 `views/<feature>/api/` 目录下
- **路由**: 使用 `() => import(...)` 懒加载
- **样式**: 模板中使用 UnoCSS 工具类内联样式
- **Element Plus 图标**: 在 main.ts 中全局注册
- **Pinia $reset**: 在 main.ts 中 polyfill (Vue2 选项 API 风格)

## 反模式

- **无测试**: 零测试配置。新代码应添加 vitest。
- **大组件**: SysUser (533)、MainLayout (530)、schemaTableForm (526)、cronInput (860)
- **自动生成的 Schema.d.ts**: 2221 行手动提交。同步流程不清晰。
- **@ts-ignore**: router/index.ts (NProgress 导入)、schema 类型
- **Hash 路由**: 不支持 SSR，管理后台 SPA 场景可接受
- **全局图标注册**: Element Plus 图标全局注册，污染组件命名空间
- **单例 Store 访问**: 在 router beforeEach 守卫中直接访问 `useUser().token`
