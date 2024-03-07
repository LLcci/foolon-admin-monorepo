/*
https://docs.nestjs.com/providers#services
*/

import { UserImportDto, UserPageListDto, UserSaveDto } from '@/admin/system/user/user.dto'
import { UserEntity } from '@/admin/system/user/user.entity'
import { Injectable } from '@nestjs/common'
import { Like, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import encrypt from '@/common/utils/encrypt'
import { RedisService } from '@/global/redis/redis.service'
import { RoleService } from '../role/role.service'
import { omit } from 'lodash'
import decrypt from '@/common/utils/decrypt'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly redisService: RedisService,
    private readonly roleService: RoleService
  ) {}

  async getUserList(userPageListDto: UserPageListDto) {
    return await this.userRepository.find({
      where: {
        username: userPageListDto.username ? Like(`%${userPageListDto.username}%`) : undefined,
        realname: userPageListDto.realname ? Like(`%${userPageListDto.realname}%`) : undefined,
        status: userPageListDto.status
      },
      relations: ['roles']
    })
  }

  async saveUser(userSaveDto: UserSaveDto) {
    const userEntity = await this.userSaveDto2Entity(userSaveDto)
    const user = await this.userRepository.save(userEntity)
    await this.redisService.setUserInfoVersion(user.id, user.iv)
    return user
  }

  async importUser(userImportDto: UserImportDto) {
    const userEntities: UserEntity[] = []
    for (const item of userImportDto.list) {
      const userEntity = await this.userSaveDto2Entity(item)
      userEntities.push(userEntity)
    }
    const users = await this.userRepository.save(userEntities)
    for (const item of users) {
      await this.redisService.setUserInfoVersion(item.id, item.iv)
    }
    return users
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['roles']
    })
    user.password = await decrypt(user.salt, user.iv, user.password)
    return user
  }

  async deleteUserById(id: string[]) {
    await this.userRepository.delete(id)
  }

  /**
   * 将userSaveDto转为UserEntity
   * @param userSaveDto UserSaveDto
   * @returns UserEntity
   */
  async userSaveDto2Entity(userSaveDto: UserSaveDto) {
    if (
      !userSaveDto.id &&
      (await this.userRepository.findOne({
        where: { username: userSaveDto.username }
      }))
    ) {
      throw `${userSaveDto.username} 用户账户已存在`
    }
    // 加密密码
    const { iv, salt, encryptedPassword } = await encrypt(userSaveDto.password)
    userSaveDto.password = encryptedPassword
    const userEntity = new UserEntity()
    Object.assign(userEntity, omit(userSaveDto, ['roleIds']))
    userEntity.salt = salt
    userEntity.iv = iv
    userEntity.roles = []
    if (userSaveDto.roleIds?.length > 0) {
      userEntity.roles = await this.roleService.getRolesById(userSaveDto.roleIds)
    }
    return userEntity
  }
}
