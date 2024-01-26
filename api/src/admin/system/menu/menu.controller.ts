/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  ParseFilePipe,
  Post,
  Query,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiConsumes,
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
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

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
    return await this.menuService.getMenuPageList(menuPageListDto);
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

  @Post('import')
  @ApiOperation({
    summary: '导入菜单',
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload/menu/',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const filename =
            'menu' + '-' + uniqueSuffix + extname(file.originalname);
          cb(null, filename);
        },
      }),
    }),
  )
  async importMenu(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType:
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet|application/vnd.ms-excel',
          }),
        ],
        fileIsRequired: true,
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log('🚀 ~ MenuController ~ file:', file);
  }
}
