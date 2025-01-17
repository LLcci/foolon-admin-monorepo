/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RoleEntity } from './role.entity'
import { In, Like, Repository } from 'typeorm'
import { RolePageListDto } from './role.dto'
import { PageResultDto } from '@/common/class/response.dto'

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>
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
    return await this.roleRepository.delete(id)
  }

  async getRolesByUserId(id: string) {
    return await this.roleRepository.find({
      where: { users: { id }, status: '1', menus: { status: '1' } },
      relations: { menus: true },
      order: { menus: { sort: 'ASC' } }
    })
  }
}
