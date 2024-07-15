/*
https://docs.nestjs.com/providers#services
*/

import { Inject, Injectable, forwardRef } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RoleEntity } from './role.entity'
import { In, Like, Repository } from 'typeorm'
import { RolePageListDto } from './role.dto'
import { UserEntity } from '../user/user.entity'
import { UserService } from '../user/user.service'
import { RedisService } from '@/global/redis/redis.service'
import { PageResultDto } from '@/common/class/response.dto'

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly redisService: RedisService
  ) {}

  async getRolePageList(rolePageListDto: RolePageListDto) {
    const [roles, total] = await this.roleRepository.findAndCount({
      where: {
        name: rolePageListDto.name ? Like(`%${rolePageListDto.name}%`) : undefined,
        status: rolePageListDto.status
      },
      relations: ['menus'],
      order: { createTime: 'DESC' },
      skip: rolePageListDto.pageSize * (rolePageListDto.currentPage - 1),
      take: rolePageListDto.pageSize
    })
    return new PageResultDto<RoleEntity>(
      roles,
      total,
      rolePageListDto.currentPage,
      rolePageListDto.pageSize
    )
  }

  async getRoleList(rolePageListDto: RolePageListDto) {
    return await this.roleRepository.find({
      where: {
        name: rolePageListDto.name ? Like(`%${rolePageListDto.name}%`) : undefined,
        status: rolePageListDto.status
      },
      relations: ['menus'],
      order: { createTime: 'DESC' }
    })
  }

  async saveRole(role: RoleEntity) {
    const roleSave = await this.roleRepository.save(role)
    const roleUser = await this.roleRepository.findOne({
      where: {
        id: roleSave.id
      },
      relations: ['users']
    })
    if (roleUser.users.length) {
      const permissions = await this.userService.getUsersPermissions(
        roleUser.users.map((item) => item.id)
      )
      await this.redisService.setUsersPermissions(permissions)
    }
    return roleSave
  }

  async importRole(role: RoleEntity[]) {
    const roles = await this.roleRepository.save(role)
    const roleUsers = await this.roleRepository.find({
      where: { id: In(roles.map((item) => item.id)) },
      relations: ['users']
    })
    if (roleUsers.length) {
      const users: UserEntity[] = []
      roleUsers.forEach((role) => {
        users.push(...role.users)
      })
      const permissions = await this.userService.getUsersPermissions(users.map((item) => item.id))
      await this.redisService.setUsersPermissions(permissions)
    }
    return roles
  }

  async getRoleById(id: string) {
    return await this.roleRepository.findOne({
      select: ['id', 'name', 'description', 'status'],
      where: { id },
      relations: ['menus']
    })
  }

  async getRolesById(id: string[]) {
    return await this.roleRepository.find({
      where: { id: In(id) }
    })
  }

  async deleteRoleById(id: string[]) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .where('role.id in (:...ids)', { ids: id })
      .getMany()
    if (user.length) {
      throw `${user.map((item) => item.username).join(',')}账户已绑定该角色，无法删除`
    }
    return await this.roleRepository.delete(id)
  }
}
