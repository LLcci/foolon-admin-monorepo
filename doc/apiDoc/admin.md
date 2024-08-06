# admin 模块

admin 模块`/api/src/admin`是 [foolon admin](https://llcci.github.io/foolon-admin-monorepo/) 的核心模块，提供了用户、角色、菜单、权限等管理功能。

下面主要介绍该模块的[守卫](https://nest.nodejs.cn/guards)、[异常过滤器](https://nest.nodejs.cn/exception-filters)和[拦截器](https://nest.nodejs.cn/interceptors)，用户、角色、菜单、权限等管理功能不再赘述。

## 守卫

[守卫](https://nest.nodejs.cn/guards)`/api/src/admin/admin.guard.ts`主要实现了token和权限的校验功能。

### token 校验

默认对`admin`模块的所有接口都进行token校验。

- 判断用户是否登录
- 是否修改过密码

无需进行token校验的接口，可在`Controller`的类名或方法名上添加`@Authorize()`注解`/api/src/common/decorator/authorize.decorator.ts`。

在类名上添加`@Authorize()`注解，表示该类内所有接口无需进行token校验。

在方法名上添加`@Authorize()`注解，表示该方法无需进行token校验。

::: warning 注意
使用`@Authorize()`注解后，也不会再对接口权限进行校验。
:::

```typescript
import { Authorize } from '@/common/decorator/authorize.decorator'

@Authorize()
@Controller('demo')
export class DemoController {
  @Authorize()
  @Get()
  get() {
    return 'demo'
  }
}
```

### 权限校验

默认对`admin`模块的所有接口都进行权限校验。

无需进行权限校验的接口，可在`Controller`的类名或方法名上添加`@Permission()`注解`/api/src/common/decorator/permission.decorator.ts`。

```typescript
import { Permission } from '@/common/decorator/permission.decorator'

@Permission()
@Controller('demo')
export class DemoController {
  @Permission()
  @Get()
  get() {
    return 'demo'
  }
}
```

## 异常过滤器

[异常过滤器](https://nest.nodejs.cn/exception-filters)`/api/src/admin/exception.filter.ts`对返回的异常进行统一处理。

异常过滤器使用`/api/src/common/class/response.dto.ts`的`ResponseDto`的`fail`方法对异常进行统一格式化。

可以使用`throw`直接抛出错误信息，也可以使用NestJS的[内置 HTTP 异常](https://nest.nodejs.cn/exception-filters#%E5%86%85%E7%BD%AE-http-%E5%BC%82%E5%B8%B8)抛出错误。

```typescript
// 抛出错误信息
throw '错误信息'

// 抛出内置HTTP异常
throw new BadRequestException('错误信息', {
  cause: new Error(),
  description: '错误描述'
})
```

## 拦截器

[拦截器](https://nest.nodejs.cn/interceptors)`/api/src/admin/transform.interceptor.ts`对返回的响应数据进行统一处理。

拦截器使用`/api/src/common/class/response.dto.ts`的`ResponseDto`的`success`方法对响应数据进行统一格式化。

`Controller`内直接使用`return`返回响应数据即可。
