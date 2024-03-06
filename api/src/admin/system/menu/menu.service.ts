/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common'
import { MenuPageListDto, MenuTree } from './menu.dto'
import { MenuEntity } from './menu.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Like, Repository } from 'typeorm'
import { RoleEntity } from '../role/role.entity'

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuEntity)
    private readonly menuRepository: Repository<MenuEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>
  ) {}

  async getMenuList(menuPageListDto: MenuPageListDto) {
    return await this.menuRepository.find({
      where: {
        name: menuPageListDto.name ? Like(`%${menuPageListDto.name}%`) : undefined,
        status: menuPageListDto.status
      },
      order: { parentId: 'ASC', sort: 'ASC' }
    })
  }

  async saveMenu(menu: MenuEntity) {
    if (!menu.id && menu.path) {
      const exist = await this.menuRepository.find({
        where: { path: menu.path }
      })
      if (exist.length) throw `${menu.path} 菜单路径已存在`
    }
    return await this.menuRepository.save(menu)
  }

  async importMenu(menu: MenuEntity[]) {
    for (const item of menu) {
      if (!item.id && item.path) {
        const exist = await this.menuRepository.find({
          where: { path: item.path }
        })
        if (exist.length) throw `${item.path} 菜单路径已存在`
      }
    }
    return await this.menuRepository.save(menu)
  }

  async getMenuById(id: string) {
    return await this.menuRepository.findOne({ where: { id } })
  }

  async getMenusById(ids: string[]) {
    return await this.menuRepository.find({ where: { id: In(ids) } })
  }

  async deleteMenuById(id: string[]) {
    const roles = await this.roleRepository
      .createQueryBuilder('role')
      .leftJoinAndSelect('role.menus', 'menu')
      .where('menu.id in (:...ids)', { ids: id })
      .getMany()
    if (roles.length) {
      throw `${roles.map((item) => item.name).join(',')}角色已绑定该菜单，无法删除`
    }
    const allChildMenuList: MenuEntity[] = []
    for (const item of id) {
      await this.getAllChildMenu(allChildMenuList, item)
    }
    return await this.menuRepository.delete([...id, ...allChildMenuList.map((item) => item.id)])
  }

  async getMenuTree(menuTree: MenuTree[], list: MenuEntity[], temp: MenuTree) {
    list?.forEach((item) => {
      const tree: MenuTree = { ...item, children: [] }
      const temPid = item.parentId
      if (!temp && !item.parentId) {
        menuTree.push(tree)
        if (list.filter((i) => i.parentId === item.id).length) {
          this.getMenuTree(menuTree, list, tree)
        }
      } else if (temp && item.parentId && temPid == temp.id) {
        temp.children.push(tree)
        if (list.filter((i) => i.parentId === item.id).length) {
          this.getMenuTree(menuTree, list, tree)
        }
      }
    })
  }

  async getAllChildMenu(allChildMenuList: MenuEntity[], id: string) {
    const list = await this.menuRepository.find({ where: { parentId: id } })
    if (list.length) {
      allChildMenuList.push(...list)
      for (const item of list) {
        await this.getAllChildMenu(allChildMenuList, item.id)
      }
    }
  }
}
