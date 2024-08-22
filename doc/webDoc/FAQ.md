# 常见问题

## swager 文档生成 ts 类型

本地运行后端项目后，在`/web`目录下执行`openapi-typescript`

具体可参考[OpenAPI TypeScript](https://openapi-ts.dev/zh/)

```bash
cd web
pnpm run openapi-typescript
```

## 自适应

在 html 中使用 [UnoCSS 断点](https://unocss.nodejs.cn/config/theme#breakpoints) 进行自适应判断。

默认配置在`/web/uno.config.ts`

```ts
export default defineConfig({
  theme: {
    breakpoints: {
      xs: '0px',
      sm: '768px',
      md: '992px',
      lg: '1200px',
      xl: '1920px'
    }
  }
})
```

在 typescript 中，引入`@/stores/useSystem`进行自适应判断。

breakpoints 的值与 UnoCSS 断点一致。

```ts
import { useSystem } from '@/stores/useSystem'

const breakpoints = useSystem().breakpoints
```

## 主题配置

foolon admin 使用 Element Plus 组件库，主题配置可参考[自定义主题](https://element-plus.org/zh-CN/guide/theming.html)自行配置，框架不再进行二次封装。
