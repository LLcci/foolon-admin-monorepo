/*
https://docs.nestjs.com/providers#services
*/
import {
  REDIS_CODE_EX,
  REDIS_CODE_PREFIX,
  REDIS_ROUTE_PREFIX,
  REDIS_TOKEN_EX,
  REDIS_TOKEN_PREFIX,
  REDIS_USERID_PREFIX,
  REDIS_USER_PERMISSION_PREFIX
} from '@/common/constants/redis.constants'
import { JWT_SECRET } from '@/common/constants/token.constants'
import { LoggerService } from '@/global/logger/logger.service'
import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { RedisClientOptions, createClient, RedisClientType } from 'redis'

@Injectable()
export class RedisService implements OnModuleInit {
  public client: RedisClientType

  constructor(
    private logger: LoggerService,
    @Inject('CONFIG_OPTIONS') private options: RedisClientOptions,
    private readonly jwtService: JwtService
  ) {}

  async onModuleInit() {
    this.client = createClient(this.options) as RedisClientType
    this.client.on('error', (err) => this.logger.error('redis连接失败', err))
    await this.client.connect()
    this.logger.log('redis连接成功')
  }

  async setRoutes(routes: string[]) {
    await this.client.del(REDIS_ROUTE_PREFIX)
    return await this.client.sAdd(REDIS_ROUTE_PREFIX, routes)
  }

  async getRoutes() {
    return await this.client.sMembers(REDIS_ROUTE_PREFIX)
  }

  async setCode(codeId: string, text: string) {
    return await this.client.set(`${REDIS_CODE_PREFIX}${codeId}`, text, {
      EX: Number(REDIS_CODE_EX)
    })
  }

  async getCode(codeId: string) {
    return await this.client.get(`${REDIS_CODE_PREFIX}${codeId}`)
  }

  async deleteCode(codeId: string) {
    return await this.client.del(`${REDIS_CODE_PREFIX}${codeId}`)
  }

  async setToken(token: string, userIv: string) {
    return await this.client.set(`${REDIS_TOKEN_PREFIX}${token}`, userIv, {
      EX: REDIS_TOKEN_EX ?? undefined
    })
  }

  async getToken(token: string) {
    return await this.client.get(`${REDIS_TOKEN_PREFIX}${token}`)
  }

  async deleteToken(token: string) {
    return await this.client.del(`${REDIS_TOKEN_PREFIX}${token}`)
  }

  async checkToken(token: string) {
    const redisUserSalt = await this.getToken(token)
    if (!redisUserSalt) {
      return { errMsg: '登录已过期，请重新登录' }
    }
    const payload = await this.jwtService.verifyAsync<{ id: string }>(token, {
      secret: JWT_SECRET
    })
    const userSalt = await this.getUserInfoVersion(payload.id)
    if (userSalt !== redisUserSalt) {
      return { errMsg: '密码已修改，请重新登录' }
    }
    return { payload, errMsg: '' }
  }

  async setUserInfoVersion(id: string, salt: string) {
    return await this.client.set(`${REDIS_USERID_PREFIX}${id}`, salt)
  }

  async getUserInfoVersion(id: string) {
    return await this.client.get(`${REDIS_USERID_PREFIX}${id}`)
  }

  async setUserPermissions(id: string, permissions: string[]) {
    await this.client.del(`${REDIS_USER_PERMISSION_PREFIX}${id}`)
    await this.client.sAdd(`${REDIS_USER_PERMISSION_PREFIX}${id}`, permissions)
    if (REDIS_TOKEN_EX) {
      await this.client.expire(`${REDIS_USER_PERMISSION_PREFIX}${id}`, REDIS_TOKEN_EX)
    }
  }

  async checkUserPermissions(id: string, permission: string) {
    const userPermissions = await this.getUserPermissions(id)
    return userPermissions.includes(permission)
  }

  async getUserPermissions(id: string) {
    return await this.client.sMembers(`${REDIS_USER_PERMISSION_PREFIX}${id}`)
  }

  async deleteUserPermissions(id: string) {
    return await this.client.del(`${REDIS_USER_PERMISSION_PREFIX}${id}`)
  }
}
