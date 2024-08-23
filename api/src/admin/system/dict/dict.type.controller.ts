/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { ApiHeader, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { DictTypeService } from './dict.type.service'
import { DictTypeImportDto, DictTypePageListDto } from './dict.type.dto'
import { DictTypeEntity } from './dict.type.entity'
import { DeleteResult } from 'typeorm'
import { User } from '@/common/decorator/user.decorator'
import validateArrObj from '@/common/utils/validateArrObj'
import { ApiPaginatedResponse } from '@/common/decorator/pageRequest.decorator'

@ApiTags('字典类型管理')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer token',
  example: 'Bearer token'
})
@Controller('dictType')
export class DictTypeController {
  constructor(private readonly dictTypeService: DictTypeService) {}

  @Post('page')
  @ApiOperation({
    summary: '分页字典类型列表'
  })
  @ApiPaginatedResponse(DictTypeEntity)
  async getDictTypePageList(@Body() dictTypePageListDto: DictTypePageListDto) {
    return await this.dictTypeService.getDictTypePageList(dictTypePageListDto)
  }

  @Post('list')
  @ApiOperation({
    summary: '字典类型列表'
  })
  @ApiOkResponse({
    description: '字典类型列表',
    type: DictTypeEntity,
    isArray: true
  })
  async getDictTypeList(@Body() dictTypePageListDto: DictTypePageListDto) {
    return await this.dictTypeService.getDictTypeList(dictTypePageListDto)
  }

  @Post('save')
  @ApiOperation({
    summary: '保存字典类型'
  })
  @ApiOkResponse({
    description: '保存字典类型',
    type: DictTypeEntity
  })
  async saveDictType(@Body() dictType: DictTypeEntity, @User() user: { id: string }) {
    if (!dictType.id) {
      dictType.createUserId = user.id
    }
    dictType.updateUserId = user.id
    return await this.dictTypeService.saveDictType(dictType)
  }

  @Post('import')
  @ApiOperation({
    summary: '导入字典类型'
  })
  @ApiOkResponse({
    description: '导入字典类型',
    type: DictTypeEntity,
    isArray: true
  })
  async importDictType(@Body() dictType: DictTypeImportDto, @User() user: { id: string }) {
    await validateArrObj(dictType.list, DictTypeEntity)
    for (const item of dictType.list) {
      if (!item.id) {
        item.createUserId = user.id
      }
      item.updateUserId = user.id
    }
    return await this.dictTypeService.importDictType(dictType.list)
  }

  @Get('id')
  @ApiOperation({
    summary: 'id查询字典类型'
  })
  @ApiOkResponse({
    description: 'id查询字典类型',
    type: DictTypeEntity
  })
  async getDictTypeById(@Query('id') id: string) {
    return await this.dictTypeService.getDictTypeById(id)
  }

  @Post('delete')
  @ApiOperation({
    summary: 'id删除字典类型'
  })
  @ApiOkResponse({
    description: 'id删除字典类型',
    type: DeleteResult
  })
  async deleteDictTypeById(@Body('id') id: string[]) {
    return await this.dictTypeService.deleteDictTypeById(id)
  }
}
