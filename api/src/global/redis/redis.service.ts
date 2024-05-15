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

  async setRoutes(routes: string) {
    return await this.client.set(REDIS_ROUTE_PREFIX, routes)
  }

  async getRoutes() {
    return (await this.client.get(REDIS_ROUTE_PREFIX)).split(',')
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
      EX: Number(REDIS_TOKEN_EX)
    })
  }

  async getToken(token: string) {
    return await this.client.get(`${REDIS_TOKEN_PREFIX}${token}`)
  }

  async deleteToken(token: string) {
    return await this.client.del(`${REDIS_TOKEN_PREFIX}${token}`)
  }

  async checkToken(token: string) {
    const redisUserIv = await this.getToken(token)
    if (!redisUserIv) {
      return { errMsg: '登录已过期，请重新登录' }
    }
    const payload = await this.jwtService.verifyAsync<{ id: string }>(token, {
      secret: JWT_SECRET
    })
    const userIv = await this.getUserInfoVersion(payload.id)
    if (userIv !== redisUserIv) {
      return { errMsg: '密码已修改，请重新登录' }
    }
    return { payload, errMsg: '' }
  }

  async setUserInfoVersion(id: string, iv: string) {
    return await this.client.set(`${REDIS_USERID_PREFIX}${id}`, iv)
  }

  async getUserInfoVersion(id: string) {
    return await this.client.get(`${REDIS_USERID_PREFIX}${id}`)
  }

  async setUserPermissions(id: string, permissions: string[]) {
    return await this.client.set(`${REDIS_USER_PERMISSION_PREFIX}${id}`, permissions.join(','))
  }

  async setUsersPermissions(permissions: { id: string; permissions: string[] }[]) {
    const setPerms: [string, string][] = []
    permissions.forEach((item) => {
      setPerms.push([`${REDIS_USER_PERMISSION_PREFIX}${item.id}`, permissions.join(',')])
    })
    return await this.client.mSet(setPerms)
  }

  async getUserPermissions(id: string) {
    return (await this.client.get(`${REDIS_USER_PERMISSION_PREFIX}${id}`)).split(',')
  }

  async deleteUserPermissions(id: string) {
    return await this.client.del(`${REDIS_USER_PERMISSION_PREFIX}${id}`)
  }

  async deleteUsersPermissions(ids: string[]) {
    return await this.client.del(ids.map((id) => `${REDIS_USER_PERMISSION_PREFIX}${id}`))
  }
}
