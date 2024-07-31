/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from '../user/user.entity'
import { Repository } from 'typeorm'
import { UpdateUserInfoDto, UpdateUserPasswordDto } from './permission.dto'
import decrypt from '@/common/utils/decrypt'
import encrypt from '@/common/utils/encrypt'
import { RedisService } from '@/global/redis/redis.service'
import { UserService } from '../user/user.service'

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly redisService: RedisService,
    private readonly userService: UserService
  ) {}

  async getPermission(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['roles', 'roles.menus']
    })
    if (!user) {
      throw '用户不存在'
    }
    if (user.status == 0) {
      throw '用户已被禁用'
    }
    user.roles = user.roles.filter((role) => role.status == 1)
    user.roles.forEach((role) => {
      role.menus = role.menus.filter((menu) => menu.status == 1)
      role.menus = role.menus.sort((a, b) => a.sort - b.sort)
    })
    const permission = await this.userService.getUserPermissions(user.id)
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
    const decryptedUserPassword = await decrypt(user.salt, user.iv, user.password)
    if (updateUserPasswordDto.oldPassword !== decryptedUserPassword) {
      throw '旧密码错误'
    }
    const { iv, salt, encryptedPassword } = await encrypt(updateUserPasswordDto.newPassword)
    const newUser = await this.userRepository.update(id, {
      iv: iv,
      salt: salt,
      password: encryptedPassword
    })
    await this.redisService.setUserInfoVersion(user.id, iv)
    return newUser
  }
}
