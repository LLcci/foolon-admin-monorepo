import { ApiProperty } from '@nestjs/swagger'
import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

export class BaseEntity {
  @CreateDateColumn({ name: 'create_time', comment: '创建时间' })
  @ApiProperty({ required: false, readOnly: true })
  createTime: Date

  @UpdateDateColumn({ name: 'update_time', comment: '更新时间' })
  @ApiProperty({ required: false, readOnly: true })
  updateTime: Date

  @Column({ name: 'create_user_id', comment: '创建用户id' })
  @ApiProperty({ required: false, readOnly: true })
  createUserId: string

  @Column({
    nullable: true,
    name: 'update_user_id',
    comment: '更新用户id'
  })
  @ApiProperty({ required: false, readOnly: true })
  updateUserId: string
}
