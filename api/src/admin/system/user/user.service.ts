/*
https://docs.nestjs.com/providers#services
*/

import { UserPageListDto, UserCreateDto } from '@/admin/system/user/user.dto'
import { UserEntity } from '@/admin/system/user/user.entity'
import { Injectable } from '@nestjs/common'
import { Like, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import encrypt from '@/common/utils/encrypt'
import { RedisService } from '@/global/redis/redis.service'
import { RoleService } from '../role/role.service'
import { omit } from 'lodash'

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
      select: ['id', 'username', 'realname', 'avatar', 'email', 'phone', 'status', 'roles'],
      where: {
        username: userPageListDto.username ? Like(`%${userPageListDto.username}%`) : undefined,
        realname: userPageListDto.realname ? Like(`%${userPageListDto.realname}%`) : undefined,
        status: userPageListDto.status
      },
      relations: ['roles'],
      order: {
        createTime: 'DESC'
      }
    })
  }

  async saveUser(userEntity: UserEntity) {
    const user = await this.userRepository.save(userEntity)
    return user
  }

  async importUser(userEntities: UserEntity[]) {
    return await this.userRepository.save(userEntities)
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findOne({
      select: ['id', 'username', 'realname', 'avatar', 'email', 'phone', 'status', 'roles'],
      where: { id },
      relations: ['roles']
    })
    return user
  }

  async deleteUserById(id: string[]) {
    await this.userRepository.delete(id)
  }

  /**
   * 将UserCreateDto转为UserEntity
   * @param UserCreateDto UserCreateDto
   * @returns UserEntity
   */
  async userSaveDto2Entity(userCreateDto: UserCreateDto) {
    const oldUser = await this.userRepository.findOne({
      where: { username: userCreateDto.username }
    })
    if (oldUser) {
      throw `${userCreateDto.username} 用户账户已存在`
    }
    // 加密密码
    const { iv, salt, encryptedPassword } = await encrypt(userCreateDto.password)
    userCreateDto.password = encryptedPassword
    const userEntity = new UserEntity()
    Object.assign(userEntity, omit(userCreateDto, ['roleIds']))
    userEntity.salt = salt
    userEntity.iv = iv
    userEntity.roles = []
    if (userCreateDto.roleIds?.length > 0) {
      userEntity.roles = await this.roleService.getRolesById(userCreateDto.roleIds)
    }
    return userEntity
  }
}
