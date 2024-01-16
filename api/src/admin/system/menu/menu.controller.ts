/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { MenuService } from './menu.service';
import { MenuListDto } from './menu.dto';
import { MenuEntity } from './menu.entity';

@ApiTags('菜单管理')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer token',
  example: 'Bearer token',
})
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('list')
  async getMenuList(@Query() menuListDto: MenuListDto) {
    return await this.menuService.getMenuList(menuListDto);
  }

  @Post('save')
  async saveMenu(@Body() menu: MenuEntity) {
    return await this.menuService.saveMenu(menu);
  }

  @Get('id')
  async getMenuById(@Query('id') id: string) {
    return await this.menuService.getMenuById(id);
  }

  @Get('delete')
  deleteMenuById(@Query('id') id: string) {
    return this.menuService.deleteMenuById(id);
  }
}
