import { BaseEntity } from '@/common/entity/base.entity'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator'
import { Column, Entity, Index } from 'typeorm'

@Entity('sys_task')
export class TaskEntity extends BaseEntity {
  @Index()
  @Column({
    comment: '任务名称'
  })
  @ApiProperty({
    required: false,
    description: '查询时非必传,新增更新时需要传'
  })
  @IsString({ message: '任务名称必须是字符串' })
  @IsOptional()
  name?: string

  @Column({
    comment: '任务描述',
    nullable: true
  })
  @ApiProperty({
    required: false,
    description: '任务描述'
  })
  @IsString({ message: '任务描述必须是字符串' })
  @IsOptional()
  description?: string

  @Column({
    comment: 'cron表达式'
  })
  @ApiProperty({
    required: true,
    description: 'cron表达式'
  })
  @IsNotEmpty({ message: 'cron表达式不能为空' })
  @IsString({ message: 'cron表达式必须是字符串' })
  cron: string

  @Column({
    comment: '任务方法'
  })
  @ApiProperty({
    required: true,
    description: '任务方法'
  })
  @IsNotEmpty({ message: '任务方法不能为空' })
  @IsString({ message: '任务方法必须是字符串' })
  method: string

  @Column({
    comment: '传递参数',
    nullable: true,
    type: 'json'
  })
  @ApiProperty({
    required: false,
    description: '传递参数'
  })
  @IsObject({ message: '传递参数必须是对象' })
  @IsOptional()
  data?: object
}
