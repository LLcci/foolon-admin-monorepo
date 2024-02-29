/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './role.entity';
import { In, Like, Repository } from 'typeorm';
import { RolePageListDto } from './role.dto';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
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
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .where('role.id in (:...ids)', { ids: id })
      .getMany();
    if (user.length) {
      throw `${user
        .map((item) => item.username)
        .join(',')}账户已绑定该菜单，无法删除`;
    }
    return await this.roleRepository.delete(id);
  }
}
