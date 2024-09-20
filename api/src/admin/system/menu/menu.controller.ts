/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { ApiHeader, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { MenuService } from './menu.service'
import { MenuPageListDto, MenuSaveDto, MenuTree } from './menu.dto'
import { PageResultDto } from '@/common/class/response.dto'
import { MenuEntity } from './menu.entity'
import { DeleteResult } from 'typeorm'
import { RedisService } from '@/global/redis/redis.service'
import { User } from '@/common/decorator/user.decorator'
import validateArrObj from '@/common/utils/validateArrObj'
import { ApiPaginatedResponse } from '@/common/decorator/pageRequest.decorator'
import { UserEntity } from '../user/user.entity'

@ApiTags('菜单管理')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer token',
  example: 'Bearer token'
})
@Controller('menu')
export class MenuController {
  constructor(
    private readonly menuService: MenuService,
    private readonly redisService: RedisService
  ) {}

  @Post('page')
  @ApiOperation({
    summary: '分页菜单列表'
  })
  @ApiPaginatedResponse(MenuTree)
  async getMenuPageList(@Body() menuPageListDto: MenuPageListDto) {
    const list = await this.menuService.getMenuList(menuPageListDto)
    const menuTree = Array.of<MenuTree>()
    this.menuService.getMenuTree(menuTree, list, null)
    return new PageResultDto<MenuTree>(
      menuTree.slice(
        (menuPageListDto.currentPage - 1) * menuPageListDto.pageSize,
        menuPageListDto.currentPage * menuPageListDto.pageSize
      ),
      menuTree.length,
      menuPageListDto.currentPage,
      menuPageListDto.pageSize
    )
  }

  @Post('list')
  @ApiOperation({
    summary: '菜单列表'
  })
  @ApiOkResponse({
    description: '菜单列表',
    type: MenuEntity,
    isArray: true
  })
  async getMenuList(@Body() menuPageListDto: MenuPageListDto) {
    return await this.menuService.getMenuList(menuPageListDto)
  }

  @Post('save')
  @ApiOperation({
    summary: '保存菜单'
  })
  @ApiOkResponse({
    description: '保存菜单',
    type: MenuEntity
  })
  async saveMenu(@Body() menu: MenuEntity, @User() user: { id: string }) {
    const userEntity = new UserEntity()
    userEntity.id = user.id
    if (!menu.id) {
      menu.createUser = userEntity
    }
    menu.updateUser = userEntity
    return await this.menuService.saveMenu(menu)
  }

  @Post('import')
  @ApiOperation({
    summary: '导入菜单'
  })
  @ApiOkResponse({
    description: '导入菜单',
    type: MenuEntity,
    isArray: true
  })
  async importMenu(@Body() menu: MenuSaveDto, @User() user: { id: string }) {
    await validateArrObj(menu.list, MenuEntity)
    const userEntity = new UserEntity()
    userEntity.id = user.id
    for (const item of menu.list) {
      if (!item.id) {
        item.createUser = userEntity
      }
      item.updateUser = userEntity
    }
    return await this.menuService.importMenu(menu.list)
  }

  @Get('id')
  @ApiOperation({
    summary: 'id查询菜单详情'
  })
  @ApiOkResponse({
    description: 'id查询菜单详情',
    type: MenuEntity
  })
  async getMenuById(@Query('id') id: string) {
    return await this.menuService.getMenuById(id)
  }

  @Post('delete')
  @ApiOperation({
    summary: 'id删除菜单'
  })
  @ApiOkResponse({
    description: 'id删除菜单',
    type: DeleteResult
  })
  async deleteMenuById(@Body('id') id: string[]) {
    return await this.menuService.deleteMenuById(id)
  }

  @Get('routes')
  @ApiOperation({
    summary: '获取路由'
  })
  @ApiOkResponse({
    description: '获取路由',
    type: String,
    isArray: true
  })
  async getRoutes() {
    return await this.redisService.getRoutes()
  }
}
