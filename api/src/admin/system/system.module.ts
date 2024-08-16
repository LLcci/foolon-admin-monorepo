/*
https://docs.nestjs.com/modules
*/

import { LoginController } from '@/admin/system/login/login.controller'
import { LoginService } from '@/admin/system/login/login.service'
import { UserController } from '@/admin/system/user/user.controller'
import { UserEntity } from '@/admin/system/user/user.entity'
import { UserService } from '@/admin/system/user/user.service'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MenuEntity } from './menu/menu.entity'
import { MenuController } from './menu/menu.controller'
import { MenuService } from './menu/menu.service'
import { RoleEntity } from './role/role.entity'
import { RoleController } from './role/role.controller'
import { RoleService } from './role/role.service'
import { PermissionController } from './permission/permission.controller'
import { PermissionService } from './permission/permission.service'
import { LogoutController } from './logout/logout.controller'
import { LogoutService } from './logout/logout.service'
import { OnlineController } from './online/online.controller'
import { OnlineService } from './online/online.service'
import { UploadController } from './upload/upload.controller'
import { QueuesService } from './queues/queues.service'
import { QueuesController } from './queues/queues.controller'
import { BullModule } from '@nestjs/bullmq'
import { QUEUE_NAME } from '@/common/constants/queues.constants'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { QuquesConsumer } from './queues/quques.consumer'
import { QueueEvents } from './queues/queues.enents'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, MenuEntity, RoleEntity]),
    BullModule.registerQueueAsync({
      name: QUEUE_NAME,
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.get<string>('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT'),
          password: configService.get<string>('REDIS_PASSWORD'),
          db: configService.get<number>('REDIS_DB')
        }
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [
    UserController,
    LoginController,
    MenuController,
    RoleController,
    PermissionController,
    LogoutController,
    OnlineController,
    UploadController,
    QueuesController
  ],
  providers: [
    LoginService,
    UserService,
    MenuService,
    RoleService,
    PermissionService,
    LogoutService,
    OnlineService,
    QueuesService,
    QuquesConsumer,
    QueueEvents,
    {
      provide: 'QuquesConsumer',
      useExisting: QuquesConsumer
    }
  ]
})
export class SystemModule {}
