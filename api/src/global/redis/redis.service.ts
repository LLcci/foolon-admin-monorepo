/*
https://docs.nestjs.com/providers#services
*/

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
}
