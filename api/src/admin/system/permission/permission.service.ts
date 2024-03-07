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

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly redisService: RedisService
  ) {}

  async getPermission(id: string) {
    return await this.userRepository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.username',
        'user.realname',
        'user.avatar',
        'user.email',
        'user.phone',
        'user.status'
      ])
      .leftJoinAndSelect('user.roles', 'roles')
      .leftJoinAndSelect('roles.menus', 'menus')
      .where('user.id = :id', { id: id })
      .andWhere('roles.status = 1')
      .andWhere('menus.status = 1')
      .getOne()
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
