/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { MenuListDto } from './menu.dto';
import { MenuEntity } from './menu.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageResultDto } from '@/common/class/response.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuEntity)
    private readonly menuRepository: Repository<MenuEntity>,
  ) {}

  async getMenuList(menuListDto: MenuListDto) {
    const list: MenuEntity[] = await this.menuRepository.find({
      where: menuListDto,
      order: { createTime: 'DESC', sort: 'ASC' },
    });
    return new PageResultDto<MenuEntity>(
      list,
      menuListDto.currentPage,
      menuListDto.pageSize,
    );
  }

  async saveMenu(menu: MenuEntity) {
    return await this.menuRepository.save(menu);
  }

  async getMenuById(id: string) {
    return await this.menuRepository.findOne({ where: { id } });
  }

  async deleteMenuById(id: string) {
    return await this.menuRepository.delete({ id });
  }
}
