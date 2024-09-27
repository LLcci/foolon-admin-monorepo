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
    default: 1,
    enum: ['0', '1'],
    description: '是否启用:0-停用,1-启用'
  })
  @IsNotEmpty({ message: '是否启用不能为空' })
  @IsEnum(['0', '1'], { message: '是否启用必须是为 0 | 1 ' })
  @IsOptional()
  status: '0' | '1'

  @Index()
  @CreateDateColumn({ name: 'create_time', comment: '创建时间' })
  @ApiProperty({ required: false, readOnly: true })
  createTime: Date

  @Index()
  @UpdateDateColumn({ name: 'update_time', comment: '更新时间' })
  @ApiProperty({ required: false, readOnly: true })
  updateTime: Date

  @ApiProperty({ required: false, readOnly: true, description: '创建用户', type: () => UserEntity })
  @ManyToOne(() => UserEntity)
  createUser: UserEntity

  @ApiProperty({ required: false, readOnly: true, description: '更新用户', type: () => UserEntity })
  @ManyToOne(() => UserEntity)
  updateUser: UserEntity

  @Index()
  @DeleteDateColumn({ name: 'delete_time', comment: '删除时间', nullable: true })
  @ApiProperty({ required: false, readOnly: true })
  deleteTime: Date
}
