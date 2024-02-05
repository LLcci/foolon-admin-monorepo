/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post, Query, Request } from '@nestjs/common';
import {
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { MenuService } from './menu.service';
import { MenuPageListDto, MenuSaveDto, MenuTree } from './menu.dto';
import { PageResultDto } from '@/common/class/response.dto';
import { MenuEntity } from './menu.entity';
import { DeleteResult } from 'typeorm';
import { RedisService } from '@/global/redis/redis.service';

@ApiTags('菜单管理')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer token',
  example: 'Bearer token',
})
@Controller('menu')
export class MenuController {
  constructor(
    private readonly menuService: MenuService,
    private readonly redisService: RedisService,
  ) {}

  @Post('page')
  @ApiOperation({
    summary: '分页菜单列表',
  })
  @ApiOkResponse({
    description: '分页菜单列表',
    type: PageResultDto<MenuEntity>,
  })
  async getMenuPageList(@Body() menuPageListDto: MenuPageListDto) {
    const list = await this.menuService.getMenuList(menuPageListDto);
    const menuTree = Array.of<MenuTree>();
    this.menuService.getMenuTree(menuTree, list, null);
    return new PageResultDto<MenuTree>(
      menuTree,
      menuPageListDto.currentPage,
      menuPageListDto.pageSize,
    );
  }

  @Post('list')
  @ApiOperation({
    summary: '菜单列表',
  })
  @ApiOkResponse({
    description: '菜单列表',
    type: MenuEntity,
    isArray: true,
  })
  async getMenuList(@Body() menuPageListDto: MenuPageListDto) {
    return await this.menuService.getMenuList(menuPageListDto);
  }

  @Post('save')
  @ApiOperation({
    summary: '保存菜单',
  })
  @ApiOkResponse({
    description: '保存菜单',
    type: MenuEntity,
    isArray: true,
  })
  async saveMenu(@Body() menu: MenuSaveDto, @Request() req) {
    menu.list.forEach((item) => {
      if (!item.id) {
        item.createUserId = req.user.id;
      }
      item.updateUserId = req.user.id;
    });
    return await this.menuService.saveMenu(menu.list);
  }

  @Get('id')
  @ApiOperation({
    summary: 'id查询菜单详情',
  })
  @ApiOkResponse({
    description: 'id查询菜单详情',
    type: MenuEntity,
  })
  async getMenuById(@Query('id') id: string) {
    return await this.menuService.getMenuById(id);
  }

  @Post('delete')
  @ApiOperation({
    summary: 'id删除菜单',
  })
  @ApiOkResponse({
    description: 'id删除菜单',
    type: DeleteResult,
  })
  async deleteMenuById(@Body('id') id: string[]) {
    return await this.menuService.deleteMenuById(id);
  }

  @Get('routes')
  @ApiOperation({
    summary: '获取路由',
  })
  @ApiOkResponse({
    description: '获取路由',
    type: String,
    isArray: true,
  })
  async getRoutes() {
    return await this.redisService.getRoutes();
  }
}
