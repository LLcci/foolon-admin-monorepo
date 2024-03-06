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

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, MenuEntity, RoleEntity])],
  controllers: [
    UserController,
    LoginController,
    MenuController,
    RoleController,
    PermissionController,
    LogoutController
  ],
  providers: [LoginService, UserService, MenuService, RoleService, PermissionService, LogoutService]
})
export class SystemModule {}
