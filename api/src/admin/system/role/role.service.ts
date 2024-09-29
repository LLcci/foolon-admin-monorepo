/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RoleEntity } from './role.entity'
import { DataSource, In, Like, Repository } from 'typeorm'
import { RolePageListDto } from './role.dto'
import { UserEntity } from '../user/user.entity'
import { PageResultDto } from '@/common/class/response.dto'
import { isNotIn } from 'class-validator'

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly dataSource: DataSource
  ) {}

  async getRolePageList(rolePageListDto: RolePageListDto) {
    const [roles, total] = await this.roleRepository.findAndCount({
      where: {
        name: rolePageListDto.name ? Like(`%${rolePageListDto.name}%`) : undefined,
        code: rolePageListDto.code ? Like(`%${rolePageListDto.code}%`) : undefined,
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
        code: rolePageListDto.code ? Like(`%${rolePageListDto.code}%`) : undefined,
        status: rolePageListDto.status
      },
      relations: ['menus'],
      order: { createTime: 'DESC' }
    })
  }

  async saveRole(role: RoleEntity) {
    return await this.roleRepository.save(role)
  }

  async importRole(role: RoleEntity[]) {
    return await this.roleRepository.save(role)
  }

  async getRoleById(id: string) {
    return await this.roleRepository.findOne({
      select: ['id', 'name', 'code', 'description', 'status'],
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
    return await this.dataSource.transaction(async (manager) => {
      const userIds = await manager.find(UserEntity, {
        select: ['id'],
        where: { roles: { id: In(id) } }
      })
      if (userIds.length) {
        const users = await manager.find(UserEntity, {
          where: { id: In(userIds.map((item) => item.id)) },
          relations: { roles: true }
        })
        for (const user of users) {
          user.roles = user.roles.filter((role) => isNotIn(role.id, id))
        }
        await manager.save(UserEntity, users)
      }
      return await manager.delete(RoleEntity, id)
    })
  }

  async getRolesByUserId(id: string) {
    return await this.roleRepository.find({
      where: { users: { id }, status: '1', menus: { status: '1' } },
      relations: { menus: true }
    })
  }
}
