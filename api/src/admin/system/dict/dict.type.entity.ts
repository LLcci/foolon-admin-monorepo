import { BaseEntity } from '@/common/entity/base.entity'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { Column, Entity, Index, OneToMany } from 'typeorm'
import { DictDataEntity } from './dict.data.entity'

@Entity('sys_dict_type')
export class DictTypeEntity extends BaseEntity {
  @Index({ unique: true })
  @Column({ comment: '字典类型名称' })
  @ApiProperty({
    required: true,
    description: '字典类型名称'
  })
  @IsNotEmpty({ message: '字典类型名称不能为空' })
  @IsString({ message: '字典类型名称必须是字符串' })
  name: string

  @Index({ unique: true })
  @Column({ comment: '字典类型编码' })
  @ApiProperty({
    required: true,
    description: '字典类型编码'
  })
  @IsNotEmpty({ message: '字典类型编码不能为空' })
  @IsString({ message: '字典类型编码必须是字符串' })
  code: string

  @Column({ comment: '字典类型描述', nullable: true })
  @ApiProperty({
    required: false,
    description: '字典类型描述'
  })
  @IsString({ message: '字典类型描述必须是字符串' })
  @IsOptional()
  description?: string

  @ApiProperty({ description: '字典数据', readOnly: true, type: DictDataEntity, isArray: true })
  @OneToMany(() => DictDataEntity, (data) => data.type)
  data: DictDataEntity[]
}
