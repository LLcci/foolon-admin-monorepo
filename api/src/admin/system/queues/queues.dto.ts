import { PageRequestDto } from '@/common/class/response.dto'
import { ApiProperty } from '@nestjs/swagger'
import { JobState, JobsOptions } from 'bullmq'
import { IsEnum, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator'

export class JobDto {
  @ApiProperty({
    description: '工作名称',
    required: true
  })
  @IsString({ message: '名称必须是字符串' })
  name: string

  @ApiProperty({
    description: '消费者方法',
    required: true
  })
  @IsString({ message: '方法必须是字符串' })
  method: string

  @ApiProperty({
    description: '通知用户',
    required: false
  })
  @IsString({ message: '通知用户必须是字符串' })
  @IsOptional()
  notifier?: string

  @ApiProperty({
    description: '传递参数',
    required: true
  })
  @IsObject({ message: '参数必须是对象' })
  @IsNotEmpty()
  data: any

  @ApiProperty({
    description: '工作配置',
    required: false
  })
  @IsObject({ message: '配置必须是对象' })
  @IsOptional()
  opts?: JobsOptions
}

export class JobPageDto extends PageRequestDto {
  @ApiProperty({
    description: '工作名称',
    required: false
  })
  @IsString()
  @IsOptional()
  name?: string

  @ApiProperty({
    description: '工作类型',
    required: false
  })
  @IsEnum([
    'active',
    'delayed',
    'prioritized',
    'waiting',
    'waiting-children',
    'completed',
    'failed'
  ])
  @IsOptional()
  state?: JobState
}
