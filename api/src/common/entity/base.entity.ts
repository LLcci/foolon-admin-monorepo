import { ApiProperty } from '@nestjs/swagger'
import { Column, CreateDateColumn, Index, UpdateDateColumn } from 'typeorm'

export class BaseEntity {
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
}
