/*
https://docs.nestjs.com/modules
*/

import { ElasticsearchService } from '@/global/elasticsearch/elasticsearch.service'
import { LoggerService } from '@/global/logger/logger.service'
import { DynamicModule, Module } from '@nestjs/common'

@Module({})
export class ElasticsearchModule {
  static forRoot(options: { node: string; apiKey: string }): DynamicModule {
    return {
      global: true,
      module: ElasticsearchModule,
      imports: [],
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options
        },
        ElasticsearchService,
        LoggerService
      ],
      exports: [ElasticsearchService]
    }
  }
}
