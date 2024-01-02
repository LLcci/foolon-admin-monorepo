/*
https://docs.nestjs.com/modules
*/

import { LoggerInterceptor } from '@/global/logger/logger.interceptor';
import { LoggerService } from '@/global/logger/logger.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [LoggerService, LoggerInterceptor],
  exports: [LoggerService],
})
export class LoggerModule {}
