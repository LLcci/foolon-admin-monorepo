/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { ApiHeader, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { TaskService } from './task.service'
import { ApiPaginatedResponse } from '@/common/decorator/pageRequest.decorator'
import { TaskEntity } from './task.entity'
import { TaskImportDto, TaskPageListDto } from './task.dto'
import { User } from '@/common/decorator/user.decorator'
import validateArrObj from '@/common/utils/validateArrObj'
import { DeleteResult } from 'typeorm'
import { UserEntity } from '../user/user.entity'

@ApiTags('定时任务管理')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer token',
  example: 'Bearer token'
})
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('page')
  @ApiOperation({
    summary: '分页定时任务列表'
  })
  @ApiPaginatedResponse(TaskEntity)
  async getTaskPageList(@Body() taskPageListDto: TaskPageListDto) {
    return await this.taskService.getTaskPageList(taskPageListDto)
  }

  @Post('list')
  @ApiOperation({
    summary: '定时任务列表'
  })
  @ApiOkResponse({
    description: '定时任务列表',
    type: TaskEntity,
    isArray: true
  })
  async getTaskList(@Body() taskPageListDto: TaskPageListDto) {
    return await this.taskService.getTaskList(taskPageListDto)
  }

  @Post('save')
  @ApiOperation({
    summary: '保存定时任务'
  })
  @ApiOkResponse({
    description: '保存定时任务',
    type: TaskEntity
  })
  async saveTask(@Body() task: TaskEntity, @User() user: { id: string }) {
    const userEntity = new UserEntity()
    userEntity.id = user.id
    if (!task.id) {
      task.createUser = userEntity
    }
    task.updateUser = userEntity
    return await this.taskService.saveTask(task)
  }

  @Post('import')
  @ApiOperation({
    summary: '导入定时任务'
  })
  @ApiOkResponse({
    description: '导入定时任务',
    type: TaskEntity,
    isArray: true
  })
  async importTask(@Body() task: TaskImportDto, @User() user: { id: string }) {
    await validateArrObj(task.list, TaskEntity)
    const userEntity = new UserEntity()
    userEntity.id = user.id
    for (const item of task.list) {
      if (!item.id) {
        item.createUser = userEntity
      }
      item.updateUser = userEntity
    }
    return await this.taskService.importTask(task.list)
  }

  @Get('id')
  @ApiOperation({
    summary: 'id查询定时任务详情'
  })
  @ApiOkResponse({
    description: 'id查询定时任务详情',
    type: TaskEntity
  })
  async getTaskById(@Query('id') id: string) {
    return await this.taskService.getTaskById(id)
  }

  @Post('delete')
  @ApiOperation({
    summary: 'id删除定时任务'
  })
  @ApiOkResponse({
    description: 'id删除定时任务',
    type: DeleteResult
  })
  async deleteTaskById(@Body('id') id: string[]) {
    return await this.taskService.deleteTaskById(id)
  }

  @Get('start')
  @ApiOperation({
    summary: '启动定时任务'
  })
  @ApiOkResponse({
    description: '启动定时任务',
    type: TaskEntity
  })
  async startTask(@Query('id') id: string) {
    return await this.taskService.startTask(id)
  }

  @Get('stop')
  @ApiOperation({
    summary: '停止定时任务'
  })
  @ApiOkResponse({
    description: '停止定时任务',
    type: TaskEntity
  })
  async stopTask(@Query('id') id: string) {
    return await this.taskService.stopTask(id)
  }
}
