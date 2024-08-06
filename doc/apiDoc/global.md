# 全局模块

[全局模块](https://nest.nodejs.cn/modules#%E5%85%A8%E5%B1%80%E6%A8%A1%E5%9D%97)由根模块注册，仅需注册一次，即可在所有子模块中使用，无需在子模块中注册。

## 日志模块

日志模块`/api/src/global/logger`为整个项目提供了全局日志记录功能。

foolon admin 使用 [winston](https://github.com/winstonjs/winston) 作为日志记录器。

### 用例

```typescript
import { LoggerService } from '@/global/logger/logger.service'

class Demo {
  constructor(private readonly logger: LoggerService) {}

  demo() {
    this.logger.log('hello world')
    this.logger.info('hello world')
    this.logger.debug('hello world')
    this.logger.warn('hello world')
    this.logger.error('hello world')
  }
}
```

### 拦截器

foolon admin 默认提供了一个全局拦截器`/api/src/global/logger/logger.interceptor.ts`，拦截所有请求，并打印请求信息和响应信息的日志。

若不需要该拦截器，在`/api/src/main.ts`注释下方代码即可。

```typescript:line-numbers=20
app.useGlobalInterceptors(new LoggerInterceptor(logger))
```

### 配置

日志的相关配置在`/api/src/global/logger/logger.service.ts`中。具体可参考[winston](https://github.com/winstonjs/winston)的配置。

## redis 模块

redis 模块`/api/src/global/redis`为整个项目提供了全局redis操作功能。

配置相关[参考](https://redis.io/docs/latest/develop/connect/clients/nodejs/)。

::: warning 注意
redis 无法连接，则系统无法启动
:::

### 用例

::: tip 建议
建议将redis操作方法，统一封装在`redis.service.ts`中。

redis 相关方法[参考](https://redis.io/docs/latest/commands/)。
:::

```typescript
import { RedisService } from '@/global/redis/redis.service'

class Demo {
  constructor(private readonly redisService: RedisService) {}

  demo() {
    // 获取redis实例
    const redisClient = this.redisService.client
    // 使用redis的封装方法
    const redisCode = await this.redisService.getCode(loginDto.codeId)
  }
}
```

## elasticsearch 模块

elasticsearch 模块`/api/src/global/elasticsearch`为整个项目提供了全局elasticsearch操作功能。

配置相关[参考](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html)。

### 用例

::: tip 建议
建议将elasticsearch操作方法，统一封装在`elasticsearch.service.ts`中。

elasticsearch 相关方法[参考](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html)。
:::

```typescript
import { ElasticsearchService } from '@/global/elasticsearch/elasticsearch.service'

class Demo {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  demo() {
    // 获取elasticsearch实例
    const elasticsearchClient = this.elasticsearchService.client
  }
}
```
