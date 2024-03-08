/*
https://docs.nestjs.com/providers#services
*/

import { RedisService } from '@/global/redis/redis.service'
import { SocketGateway } from '@/socket/socket.gateway'
import { Injectable } from '@nestjs/common'

@Injectable()
export class LogoutService {
  constructor(
    private readonly redisService: RedisService,
    private readonly socketGateway: SocketGateway
  ) {}

  async logout(token: string) {
    this.socketGateway.disconnectByToken(token)
    return await this.redisService.deleteToken(token)
  }
}
