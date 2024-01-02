/*
https://docs.nestjs.com/modules
*/

import { AdminGuard } from '@/admin/admin.guard';
import { TransformInterceptor } from '@/admin/transform.interceptor';
import { SystemModule } from '@/admin/system/system.module';
import { Module } from '@nestjs/common';
import {
  APP_FILTER,
  APP_GUARD,
  APP_INTERCEPTOR,
  RouterModule,
} from '@nestjs/core';
import { ExceptionsFilter } from '@/admin/exception.filter';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'admin',
        module: AdminModule,
        children: [
          {
            path: 'sys',
            module: SystemModule,
          },
        ],
      },
    ]),
    SystemModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_GUARD, useClass: AdminGuard },
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
    { provide: APP_FILTER, useClass: ExceptionsFilter },
  ],
})
export class AdminModule {}
