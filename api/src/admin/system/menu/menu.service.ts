/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { MenuPageListDto } from './menu.dto';
import { MenuEntity } from './menu.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { PageResultDto } from '@/common/class/response.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuEntity)
    private readonly menuRepository: Repository<MenuEntity>,
  ) {}

  async getMenuPageList(menuPageListDto: MenuPageListDto) {
    const list: MenuEntity[] = await this.menuRepository.find({
      where: {
        name: menuPageListDto.name
          ? Like(`%${menuPageListDto.name}%`)
          : undefined,
        status: menuPageListDto.status,
      },
      order: { createTime: 'DESC', sort: 'ASC' },
    });
    return new PageResultDto<MenuEntity>(
      list,
      menuPageListDto.currentPage,
      menuPageListDto.pageSize,
    );
  }

  async getMenuList(menuPageListDto: MenuPageListDto) {
    return await this.menuRepository.find({
      where: {
        name: menuPageListDto.name
          ? Like(`%${menuPageListDto.name}%`)
          : undefined,
        status: menuPageListDto.status,
      },
      order: { createTime: 'DESC', sort: 'ASC' },
    });
  }

  async saveMenu(menu: MenuEntity[]) {
    return await this.menuRepository.save(menu);
  }

  async getMenuById(id: string) {
    return await this.menuRepository.findOne({ where: { id } });
  }

  async deleteMenuById(id: string[]) {
    return await this.menuRepository.delete(id);
  }
}
