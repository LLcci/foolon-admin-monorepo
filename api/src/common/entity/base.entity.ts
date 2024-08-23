import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    required: false,
    description: 'id,新增时不需要传,更新时需要传'
  })
  @IsNotEmpty({ message: 'id不能为空' })
  @IsString({ message: 'id必须是字符串' })
  @IsOptional()
  id: string

  @Column({
    type: 'tinyint',
    default: 1,
    comment: '是否启用:0-停用,1-启用'
  })
  @Index()
  @ApiProperty({
    required: false,
    default: 1,
    description: '是否启用:0-停用,1-启用'
  })
  @IsNotEmpty({ message: '是否启用不能为空' })
  @IsEnum([0, 1], { message: '是否启用必须是为 0 | 1 ' })
  @IsOptional()
  status: 0 | 1

  @Index()
  @CreateDateColumn({ name: 'create_time', comment: '创建时间' })
  @ApiProperty({ required: false, readOnly: true })
  createTime: Date

  @Index()
  @UpdateDateColumn({ name: 'update_time', comment: '更新时间' })
  @ApiProperty({ required: false, readOnly: true })
  updateTime: Date

  @Index()
  @Column({ name: 'create_user_id', comment: '创建用户id' })
  @ApiProperty({ required: false, readOnly: true })
  createUserId: string

  @Index()
  @Column({
    nullable: true,
    name: 'update_user_id',
    comment: '更新用户id'
  })
  @ApiProperty({ required: false, readOnly: true })
  updateUserId: string

  @Index()
  @DeleteDateColumn({ name: 'delete_time', comment: '删除时间', nullable: true })
  @ApiProperty({ required: false, readOnly: true })
  deleteTime: Date
}
