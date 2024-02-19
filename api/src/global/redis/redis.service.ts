/*
https://docs.nestjs.com/providers#services
*/

import {
  REDIS_CODE_EX,
  REDIS_CODE_PREFIX,
  REDIS_ROUTE_PREFIX,
  REDIS_TOKEN_EX,
  REDIS_TOKEN_PREFIX,
} from '@/common/constants/redis.constants';
import { LoggerService } from '@/global/logger/logger.service';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { RedisClientOptions, createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit {
  public client: RedisClientType;

  constructor(
    private logger: LoggerService,
    @Inject('CONFIG_OPTIONS') private options: RedisClientOptions,
  ) {}

  async onModuleInit() {
    this.client = createClient(this.options) as RedisClientType;
    this.client.on('error', (err) => this.logger.error('redis连接失败', err));
    await this.client.connect();
    this.logger.log('redis连接成功');
  }

  async setRoutes(routes: string) {
    return await this.client.set(REDIS_ROUTE_PREFIX, routes);
  }

  async getRoutes() {
    return (await this.client.get(REDIS_ROUTE_PREFIX)).split(',');
  }

  async setCode(codeId: string, text: string) {
    return await this.client.set(`${REDIS_CODE_PREFIX}${codeId}`, text, {
      EX: Number(REDIS_CODE_EX),
    });
  }

  async getCode(codeId: string) {
    return await this.client.get(`${REDIS_CODE_PREFIX}${codeId}`);
  }

  async deleteCode(codeId: string) {
    return await this.client.del(`${REDIS_CODE_PREFIX}${codeId}`);
  }

  async setToken(token: string, userIv: string) {
    return await this.client.set(`${REDIS_TOKEN_PREFIX}${token}`, userIv, {
      EX: Number(REDIS_TOKEN_EX),
    });
  }

  async getToken(token: string) {
    return await this.client.get(`${REDIS_TOKEN_PREFIX}${token}`);
  }
}
