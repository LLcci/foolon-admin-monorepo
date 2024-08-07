# 自定义注解

## 不校验token

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

## 不校验权限

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

## swagger分页响应

在返回分页列表的接口上添加`@ApiPaginatedResponse()`注解`/api/src/common/decorator/pageRequest.decorator`。

具体参考 NestJS OPENAPI 内的 [高级：泛型 `ApiResponse`](https://nest.nodejs.cn/openapi/operations#%E9%AB%98%E7%BA%A7%EF%BC%9A%E6%B3%9B%E5%9E%8B-apiresponse)

```typescript

import { ApiPaginatedResponse } from '@/common/decorator/pageRequest.decorator'

@Post('page')
@ApiOperation({
  summary: '分页列表'
})
@ApiPaginatedResponse(DemoEntity)
async getDemoPageList(@Body() menuPageListDto: MenuPageListDto) {
  const list = []
  return new PageResultDto<DemoEntity>(
    list,
    total,
    userPageListDto.currentPage,
    userPageListDto.pageSize
  )
}
```

## 通过token获取用户id

在需要获取用户id的接口的参数内添加`@User()`注解`/api/src/common/decorator/user.decorator.ts`。

::: warning 注意
未传入token时，无法获取用户id。
:::

```typescript
import { User } from '@/common/decorator/user.decorator'

@Post('demo')
async demo(@User() user: { id: string }) {
  return user.id
}
```
