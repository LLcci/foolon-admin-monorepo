import { BaseEntity } from '@/common/entity/base.entity'
import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { Column, Entity, ManyToOne } from 'typeorm'
import { DictTypeEntity } from './dict.type.entity'

@Entity('sys_dict_data')
export class DictDataEntity extends BaseEntity {
  @Column({ comment: '字典标签' })
  @ApiProperty({ description: '字典标签', required: true })
  @IsNotEmpty({ message: '字典标签不能为空' })
  @IsString({ message: '字典标签必须为字符串' })
  label: string

  @Column({ comment: '字典值' })
  @ApiProperty({ description: '字典值', required: true })
  @IsNotEmpty({ message: '字典值不能为空' })
  @IsString({ message: '字典值必须为字符串' })
  value: string

  @Column({ comment: '字典描述', nullable: true })
  @ApiProperty({ description: '字典描述' })
  @IsString({ message: '字典描述必须为字符串' })
  @IsOptional()
  description?: string

  @Column({ comment: '排序' })
  @ApiProperty({ description: '排序', required: true })
  @IsNotEmpty({ message: '排序不能为空' })
  @IsNumber({}, { message: '排序必须为数字' })
  sort: number

  @Column({ comment: '是否默认', default: false })
  @ApiProperty({ description: '是否默认', required: true, default: false })
  @IsNotEmpty({ message: '是否默认不能为空' })
  @IsBoolean({ message: '是否默认必须为布尔值' })
  default: boolean

  @ManyToOne(() => DictTypeEntity, (type) => type.data)
  type: DictTypeEntity
}
