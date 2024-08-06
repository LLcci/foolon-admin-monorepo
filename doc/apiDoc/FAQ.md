# 常见问题

## 多数据源

请参考 NestJS 的[多数据库](https://nest.nodejs.cn/techniques/database#%E5%A4%9A%E4%B8%AA%E6%95%B0%E6%8D%AE%E5%BA%93)

## 分页

- TypeORM [find 方法分页](https://typeorm.biunav.com/zh/find-options.html#%E5%9F%BA%E7%A1%80%E9%80%89%E9%A1%B9)
- TypeORM [QueryBuilder 分页](https://typeorm.biunav.com/zh/select-query-builder.html#%E4%BD%BF%E7%94%A8%E5%88%86%E9%A1%B5)

## 数据库架构同步

开发环境默认同步数据库架构，生产环境不同步数据库架构。

具体参考 TypeORM 的[常用的连接选项](https://typeorm.biunav.com/zh/connection-options.html#%E5%B8%B8%E7%94%A8%E7%9A%84%E8%BF%9E%E6%8E%A5%E9%80%89%E9%A1%B9)中的`synchronize`选项

foolon admin 中的配置在`/api/src/app.module.ts`

```typescript:line-numbers=35
synchronize: process.env.NODE_ENV == 'production' ? false : true
```
