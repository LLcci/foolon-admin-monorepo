import { UserEntity } from '@/admin/system/user/user.entity'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Transform } from 'class-transformer'
import dayjs from 'dayjs'

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
    type: 'enum',
    enum: ['0', '1'],
    default: '1',
    comment: '是否启用:0-停用,1-启用'
  })
  @Index()
  @ApiProperty({
    required: false,
    enum: ['0', '1'],
    description: '是否启用:0-停用,1-启用'
  })
  @IsNotEmpty({ message: '是否启用不能为空' })
  @IsEnum(['0', '1'], { message: '是否启用必须是为 0 | 1 ' })
  @IsOptional()
  status: '0' | '1' = '1'

  @Index()
  @CreateDateColumn({ name: 'create_time', comment: '创建时间' })
  @ApiProperty({
    required: false,
    readOnly: true,
    oneOf: [
      { type: 'string', description: '创建时间,格式YYYY-MM-DD HH:mm:ss' },
      { type: 'Date', description: '创建时间,Date' }
    ]
  })
  @Transform(({ value }) => dayjs(value).format('YYYY-MM-DD HH:mm:ss'))
  createTime: Date

  @Index()
  @UpdateDateColumn({ name: 'update_time', comment: '更新时间' })
  @ApiProperty({ required: false, readOnly: true })
  @ApiProperty({
    required: false,
    readOnly: true,
    oneOf: [
      { type: 'string', description: '创建时间,格式YYYY-MM-DD HH:mm:ss' },
      { type: 'Date', description: '创建时间,Date' }
    ]
  })
  @Transform(({ value }) => dayjs(value).format('YYYY-MM-DD HH:mm:ss'))
  updateTime: Date

  @ApiProperty({
    required: false,
    readOnly: true,
    description: '创建用户',
    oneOf: [
      { type: 'string', description: '用户名' },
      {
        type: 'object',
        description: '用户实体'
      }
    ]
  })
  @ManyToOne(() => UserEntity, {
    createForeignKeyConstraints: false
  })
  @Transform(({ value }) => value?.realname)
  createUser: UserEntity | string

  @ApiProperty({
    required: false,
    readOnly: true,
    description: '更新用户',
    oneOf: [
      { type: 'string', description: '用户名' },
      {
        type: 'object',
        description: '用户实体'
      }
    ]
  })
  @ManyToOne(() => UserEntity, {
    createForeignKeyConstraints: false
  })
  @Transform(({ value }) => value?.realname)
  updateUser: UserEntity | string

  @Index()
  @DeleteDateColumn({ name: 'delete_time', comment: '删除时间', nullable: true })
  @ApiProperty({ required: false, readOnly: true })
  deleteTime: Date
}
