import { ApiProperty, IntersectionType, OmitType, PickType } from '@nestjs/swagger'
import { DictDataEntity } from './dict.data.entity'
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { PageRequestDto } from '@/common/class/response.dto'

export class DictDataListDto extends PickType(DictDataEntity, ['status']) {
  @ApiProperty({ description: '字典类型ID', required: true })
  @IsNotEmpty({ message: '字典类型ID不能为空' })
  @IsString({ message: '字典类型ID必须是字符串' })
  typeId: string

  @ApiProperty({ description: '字典标签', required: false })
  @IsString()
  @IsOptional()
  label?: string

  @ApiProperty({ description: '字典值', required: false })
  @IsString()
  @IsOptional()
  value?: string
}

export class DictDataSaveDto extends OmitType(DictDataEntity, ['type']) {
  @ApiProperty({ description: '字典类型ID', required: true })
  @IsNotEmpty({ message: '字典类型ID不能为空' })
  @IsString({ message: '字典类型ID必须是字符串' })
  typeId: string
}

export class DictDataPageListDto extends IntersectionType(PageRequestDto, DictDataListDto) {}

export class DictDataImportDto {
  @ApiProperty({ description: '字典类型ID', required: true })
  @IsNotEmpty({ message: '字典类型ID不能为空' })
  @IsString({ message: '字典类型ID必须是字符串' })
  typeId: string

  @ApiProperty({
    description: '字典类型列表',
    required: true,
    type: DictDataEntity,
    isArray: true
  })
  @IsArray({
    message: '字典类型列表格式不正确'
  })
  @ArrayNotEmpty({ message: '字典类型列表不能为空' })
  list: DictDataEntity[]
}
