/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from '../user/user.entity'
import { Repository } from 'typeorm'
import { UpdateUserInfoDto, UpdateUserPasswordDto } from './permission.dto'
import { RedisService } from '@/global/redis/redis.service'
import { UserService } from '../user/user.service'
import { RoleService } from '../role/role.service'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly redisService: RedisService,
    private readonly userService: UserService,
    private readonly roleService: RoleService
  ) {}

  async getPermission(id: string) {
    const user = await this.userRepository.findOne({
      select: ['id', 'email', 'phone', 'realname', 'roles', 'username', 'avatar'],
      where: { id }
    })
    if (!user) {
      throw '用户不存在'
    }
    if (user.status == '0') {
      throw '用户已被禁用'
    }
    user.roles = await this.roleService.getRolesByUserId(user.id)
    const permission = await this.userService.getUserPermissions(user.roles)
    await this.redisService.setUserPermissions(user.id, permission)
    return user
  }

  async updateUserInfo(id: string, info: UpdateUserInfoDto) {
    return await this.userRepository.update(id, info)
  }

  async updatePassword(id: string, updateUserPasswordDto: UpdateUserPasswordDto) {
    if (updateUserPasswordDto.newPassword !== updateUserPasswordDto.confirmPassword) {
      throw '两次输入密码不一致'
    }
    const user = await this.userRepository.findOneOrFail({ where: { id } })
    const isMatch = await bcrypt.compare(updateUserPasswordDto.oldPassword, user.password)
    if (!isMatch) {
      throw '旧密码错误'
    }
    const salt = await bcrypt.genSalt()
    const encryptedPassword = await bcrypt.hash(updateUserPasswordDto.newPassword, salt)
    const newUser = await this.userRepository.update(id, {
      salt: salt,
      password: encryptedPassword
    })
    await this.redisService.setUserInfoVersion(user.id, salt)
    return newUser
  }
}
