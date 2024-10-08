# 常见问题

## 多数据源

请参考 NestJS 的[多数据库](https://nest.nodejs.cn/techniques/database#%E5%A4%9A%E4%B8%AA%E6%95%B0%E6%8D%AE%E5%BA%93)

## 分页

- TypeORM [find 方法分页](https://www.typeorm.org/find-options#%E5%9F%BA%E6%9C%AC%E9%80%89%E9%A1%B9)
- TypeORM [QueryBuilder 分页](https://www.typeorm.org/select-query-builder#%E4%BD%BF%E7%94%A8%E5%88%86%E9%A1%B5)

## 数据库架构同步

开发环境默认同步数据库架构，生产环境不同步数据库架构。

具体参考 TypeORM 的[通用数据源选项](https://www.typeorm.org/data-source-options#%E9%80%9A%E7%94%A8%E6%95%B0%E6%8D%AE%E6%BA%90%E9%80%89%E9%A1%B9)中的`synchronize`选项

foolon admin 中的配置在`/api/src/app.module.ts`

```typescript:line-numbers=35
synchronize: process.env.NODE_ENV == 'production' ? false : true
```

## 逻辑删除(软删除)

foolon admin 中默认使用物理删除(硬删除)，但在`/api/src/common/entity/base.entity.ts`中提供了支持逻辑删除(软删除)的属性`deleteTime`。

该属性使用了 TypeORM 提供的 [DeleteDateColumn](https://www.typeorm.org/entities#%E7%89%B9%E6%AE%8A%E5%88%97) 注解，提供逻辑删除(软删除)的功能。

具体使用可参考 TypeORM 的 [数据仓库 API ](https://www.typeorm.org/repository-api)中`softDelete`、`restore`，以及`softRemove `、`recover`方法
