import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsString } from 'class-validator'

export enum QueryTypeEnum {
  '=' = '=',
  '!=' = '!=',
  '>' = '>',
  '<' = '<',
  '>=' = '>=',
  '<=' = '<=',
  'like' = 'like'
}

export enum ComponentTypeEnum {
  'input' = 'input',
  'input-number' = 'input-number',
  'textarea' = 'textarea',
  'select' = 'select',
  'date' = 'date'
}

export class TableDto {
  @ApiProperty({
    description: '表名'
  })
  name: string

  @ApiProperty({
    description: '列信息',
    type: () => TableColumnDto,
    isArray: true
  })
  columns: TableColumnDto[]
}

export class TableColumnDto {
  @ApiProperty({
    description: '列名'
  })
  name: string

  @ApiProperty({
    description: '列类型'
  })
  type: string

  @ApiProperty({
    description: '列注释'
  })
  comment: string
}

export class GenApiFieldDto {
  @ApiProperty({
    description: '字段名称'
  })
  name: string

  @ApiProperty({
    description: '字段描述'
  })
  description: string

  @ApiProperty({
    description: '字段类型'
  })
  type: string

  @ApiProperty({
    description: '是否保存'
  })
  isSave: boolean

  @ApiProperty({
    description: '是否查询'
  })
  isQuery: boolean

  @ApiProperty({
    description: '是否列表'
  })
  isList: boolean

  @ApiProperty({
    description: '是否必填',
    required: false
  })
  isRequired?: boolean = false

  @ApiProperty({
    description: '查询方式',
    enum: QueryTypeEnum,
    default: QueryTypeEnum['=']
  })
  queryType: QueryTypeEnum = QueryTypeEnum['=']

  @ApiProperty({
    description: '表单组件',
    enum: ComponentTypeEnum,
    default: ComponentTypeEnum.input
  })
  component: ComponentTypeEnum = ComponentTypeEnum.input
}

export class GenApiDto {
  @ApiProperty({
    description: '表名称'
  })
  @IsString()
  @IsNotEmpty()
  tableName: string

  @ApiProperty({
    description: '实体名称'
  })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({
    description: '实体描述'
  })
  @IsString()
  @IsNotEmpty()
  description: string

  @ApiProperty({
    description: '字段信息',
    type: () => GenApiFieldDto,
    isArray: true
  })
  @IsArray()
  @IsNotEmpty()
  fields: GenApiFieldDto[]

  @ApiProperty({
    description: '服务端生成路径'
  })
  @IsString()
  @IsNotEmpty()
  apiGenPath: string

  @ApiProperty({
    description: '前端生成路径'
  })
  @IsString()
  @IsNotEmpty()
  webGenPath: string
}
