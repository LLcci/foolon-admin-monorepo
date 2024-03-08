/*
https://docs.nestjs.com/guards#guards
*/

import extractTokenFromHeader from '@/common/utils/extractTokenFromHeader'
import { RedisService } from '@/global/redis/redis.service'
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { WsException } from '@nestjs/websockets'
import { Socket } from 'socket.io'

@Injectable()
export class SocketGuard implements CanActivate {
  constructor(private readonly redisService: RedisService) {}

  async canActivate(context: ExecutionContext) {
    const client = context.switchToWs().getClient<Socket>()
    const token = extractTokenFromHeader(client.handshake.auth.token)
    if (!client.handshake.auth.token) {
      client.send(new WsException('未登录，请进行登录'))
      client.disconnect(true)
      return false
    }
    const { payload, errMsg } = await this.redisService.checkToken(token)
    if (errMsg) {
      client.send(new WsException(errMsg))
      client.disconnect(true)
      return false
    }
    client.handshake.auth['user'] = payload
    return true
  }
}
