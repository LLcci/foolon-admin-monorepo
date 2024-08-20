import { PageRequestDto } from '@/common/class/response.dto'
import { TaskEntity } from './task.entity'
import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger'
import { ArrayNotEmpty, IsArray } from 'class-validator'

export class TaskListDto extends PickType(TaskEntity, ['name', 'status']) {}

export class TaskPageListDto extends IntersectionType(PageRequestDto, TaskListDto) {}

export class TaskImportDto {
  @ApiProperty({
    description: '定时任务列表',
    required: true,
    type: TaskEntity,
    isArray: true
  })
  @IsArray({
    message: '定时任务列表格式不正确'
  })
  @ArrayNotEmpty({ message: '定时任务列表不能为空' })
  list: TaskEntity[]
}
