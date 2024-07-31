import { LoggerService } from '@/global/logger/logger.service'
import { RedisService } from './redis.service'
/*
https://docs.nestjs.com/modules
*/

import { DynamicModule, Module } from '@nestjs/common'
import { RedisClientOptions } from 'redis'

// todo 引入RedisOm
@Module({
  imports: [],
  controllers: [],
  providers: []
})
export class RedisModule {
  static forRoot(options: RedisClientOptions): DynamicModule {
    return {
      global: true,
      module: RedisModule,
      imports: [],
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options
        },
        RedisService,
        LoggerService
      ],
      exports: [RedisService]
    }
  }
}
