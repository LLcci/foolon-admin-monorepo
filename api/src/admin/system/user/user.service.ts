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
import { omit, uniq } from 'lodash'
import { PageResultDto } from '@/common/class/response.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly redisService: RedisService,
    private readonly roleService: RoleService
  ) {}

  async getUserPageList(userPageListDto: UserPageListDto) {
    const [users, total] = await this.userRepository.findAndCount({
      select: [
        'id',
        'username',
        'realname',
        'avatar',
        'email',
        'phone',
        'status',
        'createTime',
        'roles'
      ],
      where: {
        username: userPageListDto.username ? Like(`%${userPageListDto.username}%`) : undefined,
        realname: userPageListDto.realname ? Like(`%${userPageListDto.realname}%`) : undefined,
        status: userPageListDto.status
      },
      relations: ['roles'],
      order: {
        createTime: 'DESC'
      },
      skip: userPageListDto.pageSize * (userPageListDto.currentPage - 1),
      take: userPageListDto.pageSize
    })
    return new PageResultDto<UserEntity>(
      users,
      total,
      userPageListDto.currentPage,
      userPageListDto.pageSize
    )
  }

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
    await this.redisService.setUserInfoVersion(user.id, user.iv)
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
    return '删除成功'
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

  /**
   * 根据用户id获取用户权限
   * @param id 用户id
   * @returns 用户权限数组
   */
  async getUserPermissions(id: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .select(['user.id'])
      .leftJoinAndSelect('user.roles', 'roles')
      .leftJoinAndSelect('roles.menus', 'menus')
      .where('user.id = :id', { id: id })
      .andWhere('user.status = 1')
      .andWhere('roles.status = 1')
      .andWhere('menus.status = 1')
      .andWhere('menus.menuType = 2')
      .getOne()
    let permission: string[] = []
    if (user) {
      user.roles.forEach((role) => {
        role.menus.forEach((menu) => {
          permission.push(...menu.perms)
        })
      })
      permission = uniq(permission)
    }
    return permission
  }

  /**
   * 根据多个用户id获取用户权限
   * @param ids 用户id数组
   * @returns 用户权限数组
   */
  async getUsersPermissions(ids: string[]) {
    const users = await this.userRepository
      .createQueryBuilder('user')
      .select(['user.id'])
      .leftJoinAndSelect('user.roles', 'roles')
      .leftJoinAndSelect('roles.menus', 'menus')
      .where('user.id IN (:...ids)', { ids })
      .andWhere('user.status = 1')
      .andWhere('roles.status = 1')
      .andWhere('menus.status = 1')
      .andWhere('menus.menuType = 2')
      .getMany()
    const permissions: { id: string; permissions: string[] }[] = []
    if (users.length) {
      users.forEach((user) => {
        let perms: string[] = []
        user.roles.forEach((role) => {
          role.menus.forEach((menu) => {
            perms.push(...menu.perms)
          })
        })
        perms = uniq(perms)
        permissions.push({ id: user.id, permissions: perms })
      })
    }
    return permissions
  }
}
