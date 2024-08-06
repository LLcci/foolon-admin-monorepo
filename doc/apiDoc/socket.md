# socket

socket模块为客户端和服务器之间提供了双向通信通道。

foolon admin 的 socket 模块`/api/src/socket`使用 NestJS 内置的 [WEBSOCKET](https://nest.nodejs.cn/websockets/gateways) 实现。其底层使用了 [Socket.IO](https://socket.nodejs.cn/)。

下面主要介绍 socket 模块的[网关](https://nest.nodejs.cn/websockets/gateways)和[守卫](https://nest.nodejs.cn/websockets/guards)，以及如何获取服务器端实例和已连接的客户端。

## 网关

socket 模块的网关`/api/src/socket/socket.gateway.ts`，实现了 `OnGatewayConnection`，`OnGatewayInit`，`OnGatewayDisconnect`这三个方法。

监听客户端连接、断开连接，以及初始化。并在连接时校验用户是否登录、是否修改密码。

## 守卫

socket 模块的守卫`/api/src/socket/socket.guard.ts`，在用户发送消息时验证用户是否登录、是否修改密码。

## 获取服务器端实例

具体服务器端实例可参考[服务器端API](https://socket.nodejs.cn/docs/v4/server-api/)

```typescript
import { SocketGateway } from '@/socket/socket.gateway'

class demo {
  constructor(private readonly socketGateWay: SocketGateway) {}

  demo() {
    // 服务器端实例
    const server = this.socketGateWay.server
  }
}
```

## 获取已连接的客户端

具体客户端实例可参考[客户端API](https://socket.nodejs.cn/docs/v4/client-api/)

```typescript
import { SocketGateway } from '@/socket/socket.gateway'
import extractTokenFromHeader from '@/common/utils/extractTokenFromHeader'

class demo {
  constructor(private readonly socketGateWay: SocketGateway) {}

  demo() {
    // 已连接的客户端
    const sockets = this.socketGateWay.server.sockets.sockets
    // 获取已连接的客户端信息
    const userTokens: { token: string; address: string; loginDate: string }[] = []
    sockets.forEach((socket) => {
      userTokens.push({
        token: extractTokenFromHeader(socket.handshake.auth.token),
        address: socket.handshake.address,
        loginDate: dayjs(socket.handshake.time).format('YYYY-MM-DD HH:mm:ss')
      })
    })
    // 后续可根据token获取每个连接的用户信息
  }
}
```
