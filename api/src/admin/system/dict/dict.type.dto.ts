import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger'
import { DictTypeEntity } from './dict.type.entity'
import { PageRequestDto } from '@/common/class/response.dto'
import { ArrayNotEmpty, IsArray, IsOptional, IsString } from 'class-validator'

export class DictTypeListDto extends PickType(DictTypeEntity, ['status']) {
  @ApiProperty({ description: '字典类型名称', required: false })
  @IsString({ message: '字典类型名称必须是字符串' })
  @IsOptional()
  name?: string

  @ApiProperty({ description: '字典类型编码', required: false })
  @IsString({ message: '字典类型编码必须是字符串' })
  @IsOptional()
  code?: string
}

export class DictTypePageListDto extends IntersectionType(PageRequestDto, DictTypeListDto) {}

export class DictTypeImportDto {
  @ApiProperty({
    description: '字典类型列表',
    required: true,
    type: DictTypeEntity,
    isArray: true
  })
  @IsArray({
    message: '字典类型列表格式不正确'
  })
  @ArrayNotEmpty({ message: '字典类型列表不能为空' })
  list: DictTypeEntity[]
}
