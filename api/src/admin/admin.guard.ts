/* eslint-disable @typescript-eslint/ban-ts-comment */
/*
https://docs.nestjs.com/guards#guards
*/

import { AUTHORIZE, JWT_SECRET } from '@/common/constants/token.constants'
import { REDIS_USERID_PREFIX } from '@/common/constants/redis.constants'
import { RedisService } from '@/global/redis/redis.service'
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import extractTokenFromHeader from '@/common/utils/extractTokenFromHeader'

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (this.reflector.get(AUTHORIZE, context.getClass())) {
      return true
    }
    if (this.reflector.get(AUTHORIZE, context.getHandler())) {
      return true
    }
    const request = context.switchToHttp().getRequest()
    const token = extractTokenFromHeader(request.headers.authorization)
    if (!request.headers.authorization) {
      throw new UnauthorizedException('未登录，请进行登录')
    }
    const redisUserIv = await this.redisService.getToken(token)
    if (!redisUserIv) {
      throw new UnauthorizedException('登录已过期，请重新登录')
    }
    const payload = await this.jwtService.verifyAsync(token, {
      secret: JWT_SECRET
    })
    const userIv = await this.redisService.getUserInfoVersion(`${REDIS_USERID_PREFIX}${payload.id}`)
    if (userIv !== redisUserIv) {
      throw new UnauthorizedException('用户信息已修改，请重新登录')
    }
    request['user'] = payload
    return true
  }
}
