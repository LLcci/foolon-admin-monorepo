/* eslint-disable @typescript-eslint/ban-ts-comment */
/*
https://docs.nestjs.com/guards#guards
*/

import { AUTHORIZE } from '@/common/constants/token.constants'
import { RedisService } from '@/global/redis/redis.service'
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import extractTokenFromHeader from '@/common/utils/extractTokenFromHeader'
import { PERMISSION } from '@/common/constants/permission.constants'

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
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
    const { payload, errMsg } = await this.redisService.checkToken(token)
    if (errMsg) {
      throw new UnauthorizedException(errMsg)
    }
    request['user'] = payload
    if (this.reflector.get(PERMISSION, context.getClass())) {
      return true
    }
    if (this.reflector.get(PERMISSION, context.getHandler())) {
      return true
    }
    const checkPermission = await this.redisService.checkUserPermissions(payload.id, request.url)
    if (!checkPermission) {
      throw new ForbiddenException('权限不足')
    }
    return true
  }
}
