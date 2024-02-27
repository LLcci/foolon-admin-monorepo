/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './role.entity';
import { In, Like, Repository } from 'typeorm';
import { RolePageListDto } from './role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async getRoleList(menuPageListDto: RolePageListDto) {
    return await this.roleRepository.find({
      where: {
        name: menuPageListDto.name
          ? Like(`%${menuPageListDto.name}%`)
          : undefined,
        status: menuPageListDto.status,
      },
      relations: ['menus'],
      order: { createTime: 'DESC' },
    });
  }

  async saveRole(menu: RoleEntity) {
    return await this.roleRepository.save(menu);
  }

  async importRole(menu: RoleEntity[]) {
    return await this.roleRepository.save(menu);
  }

  async getRoleById(id: string) {
    return await this.roleRepository.findOne({
      where: { id },
      relations: ['menus'],
    });
  }

  async getRolesById(id: string[]) {
    return await this.roleRepository.find({
      where: { id: In(id) },
    });
  }

  async deleteRoleById(id: string[]) {
    return await this.roleRepository.delete(id);
  }
}
