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

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController, LoginController],
  providers: [LoginService, UserService],
})
export class SystemModule {}
