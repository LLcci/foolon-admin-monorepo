/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common'
import { MenuPageListDto, MenuTree } from './menu.dto'
import { MenuEntity } from './menu.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, In, Like, Repository } from 'typeorm'
import { RoleEntity } from '../role/role.entity'
import { isNotIn } from 'class-validator'

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuEntity)
    private readonly menuRepository: Repository<MenuEntity>,
    private readonly dataSource: DataSource
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
    return await this.menuRepository.findOne({
      select: [
        'id',
        'parentId',
        'name',
        'path',
        'component',
        'icon',
        'menuType',
        'perms',
        'sort',
        'openType',
        'keepalive',
        'status',
        'roles'
      ],
      where: { id }
    })
  }

  async getMenusById(ids: string[]) {
    return await this.menuRepository.find({ where: { id: In(ids) } })
  }

  async deleteMenuById(id: string[]) {
    return await this.dataSource.transaction(async (manager) => {
      const roleIds = await manager.find(RoleEntity, {
        select: ['id'],
        where: { menus: { id: In(id) } }
      })
      if (roleIds.length) {
        const roles = await manager.find(RoleEntity, {
          where: { id: In(roleIds.map((item) => item.id)) },
          relations: { menus: true }
        })
        for (const role of roles) {
          role.menus = role.menus.filter((menu) => isNotIn(menu.id, id))
        }
        await manager.save(RoleEntity, roles)
      }
      const allChildMenuList: MenuEntity[] = []
      for (const item of id) {
        await this.getAllChildMenu(allChildMenuList, item)
      }
      return await manager.delete(MenuEntity, [...id, ...allChildMenuList.map((item) => item.id)])
    })
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
