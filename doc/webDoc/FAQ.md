# 常见问题

## 自适应

foolon admin 使用 [postcss-px-conversion](https://github.com/kirklin/postcss-px-conversion) 通过基准的设置将px 转换成 vw 来实现自适应。

具体的配置可在`/web/vite.config.ts`中进行修改。

```ts
import pxtovw from 'postcss-px-conversion'
const loder_pxtovw = pxtovw({
  viewportWidth: 375,
  //@ts-ignore
  viewportUnit: 'vw',
  unitPrecision: 5,
  //@ts-ignore
  fontViewportUnit: 'vw',
  allowMediaQuery: true,
  enableLandscape: true,
  selectorBlacklist: [new RegExp('.el-')],
  //@ts-ignore
  landscapeUnit: 'vw',
  landscapeViewportWidth: 1920
})
```

## swager 文档生成 ts 类型

本地运行后端项目后，在`/web`目录下执行`openapi-typescript`

具体可参考[OpenAPI TypeScript](https://openapi-ts.dev/zh/)

```bash
cd web
pnpm run openapi-typescript
```
