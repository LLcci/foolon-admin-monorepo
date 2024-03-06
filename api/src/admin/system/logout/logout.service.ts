/*
https://docs.nestjs.com/providers#services
*/

import { RedisService } from '@/global/redis/redis.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class LogoutService {
  constructor(private readonly redisService: RedisService) {}

  async logout(token: string) {
    return await this.redisService.deleteToken(token)
  }
}
