/*
https://docs.nestjs.com/providers#services
*/
import { DictTypeEntity } from '@/admin/system/dict/dict.type.entity'
import {
  REDIS_DICT_ALL_CODE,
  REDIS_DICT_PREFIX,
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
    await this.client.set(`${REDIS_USER_PERMISSION_PREFIX}${id}`, JSON.stringify(permissions))
    if (REDIS_TOKEN_EX) {
      await this.client.expire(`${REDIS_USER_PERMISSION_PREFIX}${id}`, REDIS_TOKEN_EX)
    }
  }

  async checkUserPermissions(id: string, permission: string) {
    const userPermissions = await this.getUserPermissions(id)
    return userPermissions.includes(permission)
  }

  async getUserPermissions(id: string) {
    return await this.client.get(`${REDIS_USER_PERMISSION_PREFIX}${id}`)
  }

  async deleteUserPermissions(id: string) {
    return await this.client.del(`${REDIS_USER_PERMISSION_PREFIX}${id}`)
  }

  async initDictList(dictList: DictTypeEntity[]) {
    const map: Record<string, string> = {}
    dictList.forEach((dictType) => {
      map[`${REDIS_DICT_PREFIX}${dictType.code}`] = JSON.stringify(dictType)
    })
    map[REDIS_DICT_ALL_CODE] = dictList.map((dictType) => dictType.code).join(',')
    return await this.client.mSet(map)
  }

  async setDictAllCode(code: string[]) {
    return await this.client.set(REDIS_DICT_ALL_CODE, code.join(','))
  }

  async getAllDict() {
    const dictCodes = await this.client.get(REDIS_DICT_ALL_CODE)
    if (!dictCodes) {
      return []
    }
    const dictTypeList = await this.client.mGet(
      dictCodes.split(',').map((code) => `${REDIS_DICT_PREFIX}${code}`)
    )
    return dictTypeList.map((dictType) => JSON.parse(dictType)) as DictTypeEntity[]
  }

  async getDictByCode(code: string) {
    const dictType = await this.client.get(`${REDIS_DICT_PREFIX}${code}`)
    return dictType ? JSON.parse(dictType) : null
  }

  async deleteDictByCode(code: string) {
    return await this.client.del(`${REDIS_DICT_PREFIX}${code}`)
  }

  async mDeleteDictByCode(code: string[]) {
    const keys = code.map((item) => `${REDIS_DICT_PREFIX}${item}`)
    return await this.client.del(keys)
  }

  async setDictByCode(dictType: DictTypeEntity) {
    return await this.client.set(`${REDIS_DICT_PREFIX}${dictType.code}`, JSON.stringify(dictType))
  }

  async mSetDictByCode(dictType: DictTypeEntity[]) {
    const map: Record<string, string> = {}
    dictType.forEach((dict) => {
      map[`${REDIS_DICT_PREFIX}${dict.code}`] = JSON.stringify(dict)
    })
    return await this.client.mSet(map)
  }
}
