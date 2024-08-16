/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { QueuesService } from './queues.service'
import { ApiHeader, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { JobDto, JobPageDto } from './queues.dto'
import { PageResultDto } from '@/common/class/response.dto'
import { ApiPaginatedResponse } from '@/common/decorator/pageRequest.decorator'
import { Job } from 'bullmq'

@ApiTags('队列管理')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer token',
  example: 'Bearer token'
})
@Controller('queues')
export class QueuesController {
  constructor(private readonly queuesService: QueuesService) {}

  @Post('add')
  @ApiOperation({
    summary: '添加工作'
  })
  async addJob(@Body() jobDto: JobDto) {
    return await this.queuesService.addJob(jobDto)
  }

  @Post('remove')
  @ApiOperation({
    summary: '移除工作'
  })
  async removeJob(@Body('id') id: string[]) {
    for (const item of id) {
      await this.queuesService.removeJob(item)
    }
    return '删除成功'
  }

  @Post('page')
  @ApiOperation({
    summary: '分页获取工作'
  })
  @ApiPaginatedResponse(Job)
  async getJobPage(@Body() jobPageDto: JobPageDto) {
    let res = await this.queuesService.getJobList()
    res.sort((a, b) => {
      return b.timestamp - a.timestamp
    })
    res = res.filter((item) => {
      if (jobPageDto.name) {
        return item.name.includes(jobPageDto.name)
      }
      return true
    })
    let resFilter = []
    if (jobPageDto.state) {
      for (const item of res) {
        const state = await item.getState()
        if (state == jobPageDto.state) {
          resFilter.push(item)
        }
      }
    } else {
      resFilter = res
    }
    const total = resFilter.length
    resFilter = resFilter.slice(
      (jobPageDto.currentPage - 1) * jobPageDto.pageSize,
      jobPageDto.currentPage * jobPageDto.pageSize
    )
    const resJoson = resFilter.map((item) => item.toJSON())
    return new PageResultDto(resJoson, total, jobPageDto.currentPage, jobPageDto.pageSize)
  }

  @Get('id')
  @ApiOperation({
    summary: '根据ID获取工作'
  })
  @ApiOkResponse({
    type: Job
  })
  async getJobById(@Query('id') id: string) {
    return await this.queuesService.getJobById(id)
  }

  @Get('consumerMethod')
  @ApiOperation({
    summary: '获取消费者方法'
  })
  @ApiOkResponse({
    type: String,
    isArray: true
  })
  async getConsumerMethod() {
    return await this.queuesService.getConsumerMethod()
  }
}
