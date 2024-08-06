# NPM 脚本

下面介绍该项目使用的 NPM 脚本。

## 根目录脚本

`/package.json`

```json
 "scripts": {
    // docker-compose 运行与部署
    "docker:compose:deploy": "cd ./api && pnpm run build && cd ../web && pnpm run build && cd ../ && docker-compose up -d --build",
    // husky 初始化
    "prepare": "husky install",
    // 代码格式化
    "format": "prettier --write \"**/*.{vue,js,ts,jsx,tsx,json,md,html,css,scss}\""
  }
```

## 后端脚本

`/api/package.json`

```json
"scripts": {
    // 打包
    "build": "nest build",
    // 本地运行
    "start": "cross-env NODE_ENV=development nest start",
    // 本地运行并热部署
    "start:dev": "cross-env NODE_ENV=development nest start --watch",
    // 运行调试
    "start:debug": "nest start --debug --watch",
    // 生产环境运行
    "start:prod": "cross-env NODE_ENV=production node dist/main",
    // pm2 运行
    "pm2:prod": "pm2 start ecosystem.config.js",
    // 构建镜像
    "docker:image": "pnpm run build && docker build -t foolon-admin-api .",
    // docker-compose 运行与部署
    "docker:compose:deploy": "pnpm run build && docker-compose up -d --build",
    // eslint
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    // jest 测试
    "test": "jest",
    // jest 测试 监听
    "test:watch": "jest --watch",
    // jest 测试覆盖率
    "test:cov": "jest --coverage",
    // jest 测试 调试
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    // jest 测试 e2e 端到端测试
    "test:e2e": "jest --config ./test/jest-e2e.json"
  }
```

## 前端脚本

`/web/package.json`

```json
"scripts": {
    // 本地运行
    "dev": "vite --host",
    // ts检测并打包
    "build": "run-p type-check \"build-only {@}\" --",
    // 构建docker镜像
    "docker:image": "pnpm run build && docker build -t foolon-admin-web .",
    // docker-compose 运行与部署
    "docker:compose:deploy": "pnpm run build && docker-compose up -d --build",
    // 将后端定义的 swager 文档生成 ts 类型
    "openapi-typescript": "npx openapi-typescript ../api/swagger-spec.json -o ./src/types/Schema.d.ts && cd ../ && pnpm run format",
    // 预览
    "preview": "vite preview",
    // 仅打包
    "build-only": "vite build",
    // ts 检测
    "type-check": "vue-tsc --noEmit --skipLibCheck",
    // eslint 检测
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore"
  }
```

## 文档脚本

`/doc/package.json`

```json
"scripts": {
    // 本地运行
    "docs:dev": "vitepress dev --host",
    // 打包
    "docs:build": "vitepress build",
    // 预览
    "docs:preview": "vitepress preview"
  },
```
