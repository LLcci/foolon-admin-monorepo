/* eslint-disable @typescript-eslint/ban-ts-comment */
/*
https://docs.nestjs.com/guards#guards
*/

import { AUTHORIZE } from '@/common/constants';
import { RedisService } from '@/global/redis/redis.service';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (this.reflector.get(AUTHORIZE, context.getClass())) {
      return true;
    }
    if (this.reflector.get(AUTHORIZE, context.getHandler())) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!request.headers.authorization) {
      throw new UnauthorizedException('未登录，请进行登录');
    }
    const redisUserIv = await this.redisService.getToken(token);
    if (!redisUserIv) {
      throw new UnauthorizedException('登录已过期，请重新登录');
    }
    const payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
    //todo 使用socket校验用户信息是否修改
    const userIv = await this.redisService.client.get(
      `${process.env.REDIS_USERID_PREFIX}${payload.id}`,
    );
    if (userIv !== redisUserIv) {
      throw new UnauthorizedException('密码已修改，请重新登录');
    }
    request['user'] = payload;
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
