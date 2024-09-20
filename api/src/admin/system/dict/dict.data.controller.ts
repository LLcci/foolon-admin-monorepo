/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { ApiHeader, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { DictDataService } from './dict.data.service'
import { DictDataImportDto, DictDataPageListDto, DictDataSaveDto } from './dict.data.dto'
import { DictDataEntity } from './dict.data.entity'
import { DeleteResult } from 'typeorm'
import { User } from '@/common/decorator/user.decorator'
import validateArrObj from '@/common/utils/validateArrObj'
import { ApiPaginatedResponse } from '@/common/decorator/pageRequest.decorator'
import { omit } from 'lodash'
import { DictTypeService } from './dict.type.service'
import { UserEntity } from '../user/user.entity'

@ApiTags('字典数据管理')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer token',
  example: 'Bearer token'
})
@Controller('dictData')
export class DictDataController {
  constructor(
    private readonly dictDataService: DictDataService,
    private readonly dictTypeService: DictTypeService
  ) {}

  @Post('page')
  @ApiOperation({
    summary: '分页字典数据列表'
  })
  @ApiPaginatedResponse(DictDataEntity)
  async getDictDataPageList(@Body() dictDataPageListDto: DictDataPageListDto) {
    return await this.dictDataService.getDictDataPageList(dictDataPageListDto)
  }

  @Post('list')
  @ApiOperation({
    summary: '字典数据列表'
  })
  @ApiOkResponse({
    description: '字典数据列表',
    type: DictDataEntity,
    isArray: true
  })
  async getDictDataList(@Body() dictDataPageListDto: DictDataPageListDto) {
    return await this.dictDataService.getDictDataList(dictDataPageListDto)
  }

  @Post('save')
  @ApiOperation({
    summary: '保存字典数据'
  })
  @ApiOkResponse({
    description: '保存字典数据',
    type: DictDataEntity
  })
  async saveDictData(@Body() dictData: DictDataSaveDto, @User() user: { id: string }) {
    const dictDataEntity = new DictDataEntity()
    dictDataEntity.type = await this.dictTypeService.getDictTypeById(dictData.typeId)
    const userEntity = new UserEntity()
    userEntity.id = user.id
    if (!dictData.id) {
      dictData.createUser = userEntity
    }
    dictData.updateUser = userEntity
    Object.assign(dictDataEntity, omit(dictData, 'typeId'))
    return await this.dictDataService.saveDictData(dictDataEntity)
  }

  @Post('import')
  @ApiOperation({
    summary: '导入字典数据'
  })
  @ApiOkResponse({
    description: '导入字典数据',
    type: DictDataEntity,
    isArray: true
  })
  async importDictData(@Body() dictData: DictDataImportDto, @User() user: { id: string }) {
    await validateArrObj(dictData.list, DictDataEntity)
    const dictType = await this.dictTypeService.getDictTypeById(dictData.typeId)
    const userEntity = new UserEntity()
    userEntity.id = user.id
    for (const item of dictData.list) {
      item.type = dictType
      if (!item.id) {
        item.createUser = userEntity
      }
      item.updateUser = userEntity
    }
    return await this.dictDataService.importDictData(dictData.list)
  }

  @Get('id')
  @ApiOperation({
    summary: 'id查询字典数据'
  })
  @ApiOkResponse({
    description: 'id查询字典数据',
    type: DictDataEntity
  })
  async getDictDataById(@Query('id') id: string) {
    return await this.dictDataService.getDictDataById(id)
  }

  @Post('delete')
  @ApiOperation({
    summary: 'id删除字典数据'
  })
  @ApiOkResponse({
    description: 'id删除字典数据',
    type: DeleteResult
  })
  async deleteDictDataById(@Body('id') id: string[]) {
    return await this.dictDataService.deleteDictDataById(id)
  }
}
