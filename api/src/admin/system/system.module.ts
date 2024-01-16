/*
https://docs.nestjs.com/modules
*/

import { LoginController } from '@/admin/system/login/login.controller';
import { LoginService } from '@/admin/system/login/login.service';
import { UserController } from '@/admin/system/user/user.controller';
import { UserEntity } from '@/admin/system/user/user.entity';
import { UserService } from '@/admin/system/user/user.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuEntity } from './menu/menu.entity';
import { MenuController } from './menu/menu.controller';
import { MenuService } from './menu/menu.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, MenuEntity])],
  controllers: [UserController, LoginController, MenuController],
  providers: [LoginService, UserService, MenuService],
})
export class SystemModule {}
