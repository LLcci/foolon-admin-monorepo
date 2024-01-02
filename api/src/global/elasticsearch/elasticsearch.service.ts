/*
https://docs.nestjs.com/providers#services
*/

import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';
import { LoggerService } from '@/global/logger/logger.service';

@Injectable()
export class ElasticsearchService implements OnModuleInit {
  constructor(
    private readonly logger: LoggerService,
    @Inject('CONFIG_OPTIONS') private options: { node: string; apiKey: string },
  ) {}
  public client: Client;
  public connected: boolean;
  async onModuleInit() {
    try {
      this.client = new Client({
        node: this.options.node,
        auth: {
          apiKey: this.options.apiKey,
        },
      });
      await this.client.info();
      this.connected = true;
      this.logger.log('elaticsearch连接成功');
    } catch (error) {
      this.connected = false;
      this.logger.error('elaticsearch连接失败', error);
    }
  }
}
