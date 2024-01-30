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
import { MenuPageListDto, MenuSaveDto } from './menu.dto';
import { PageResultDto } from '@/common/class/response.dto';
import { MenuEntity } from './menu.entity';
import { DeleteResult } from 'typeorm';

@ApiTags('菜单管理')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer token',
  example: 'Bearer token',
})
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

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
    return new PageResultDto<MenuEntity>(
      list,
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
  deleteMenuById(@Body('id') id: string[]) {
    return this.menuService.deleteMenuById(id);
  }
}
