/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TaskEntity } from './task.entity'
import { DataSource, In, Like, Repository } from 'typeorm'
import { TaskPageListDto } from './task.dto'
import { PageResultDto } from '@/common/class/response.dto'
import { QueuesService } from '../queues/queues.service'
import { JobDto } from '../queues/queues.dto'

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
    private readonly dataSource: DataSource,
    private readonly queuesService: QueuesService
  ) {}

  async getTaskPageList(taskPageListDto: TaskPageListDto) {
    const [tasks, total] = await this.taskRepository.findAndCount({
      where: {
        name: taskPageListDto.name ? Like(`%${taskPageListDto.name}%`) : undefined,
        status: taskPageListDto.status
      },
      order: { createTime: 'DESC' },
      skip: taskPageListDto.pageSize * (taskPageListDto.currentPage - 1),
      take: taskPageListDto.pageSize
    })
    return new PageResultDto<TaskEntity>(
      tasks,
      total,
      taskPageListDto.currentPage,
      taskPageListDto.pageSize
    )
  }

  async getTaskList(taskPageListDto: TaskPageListDto) {
    return await this.taskRepository.find({
      where: {
        name: taskPageListDto.name ? Like(`%${taskPageListDto.name}%`) : undefined,
        status: taskPageListDto.status
      },
      order: { createTime: 'DESC' }
    })
  }

  async saveTask(task: TaskEntity) {
    return await this.dataSource.transaction(async (manager) => {
      const taskRes = await manager.save(task)
      if (task.id) {
        await this.queuesService.removeRepeatableByKey(task.id)
      }
      if (taskRes.status == 1) {
        const job = new JobDto()
        job.name = taskRes.name
        job.data = taskRes.data || {}
        job.method = taskRes.method
        job.opts = {
          repeat: {
            pattern: taskRes.cron,
            key: taskRes.id
          }
        }
        await this.queuesService.addJob(job)
      }
    })
  }

  async importTask(task: TaskEntity[]) {
    return await this.dataSource.transaction(async (manager) => {
      const taskRes = await manager.save(TaskEntity, task)
      const jobs: JobDto[] = []
      for (const item of taskRes) {
        if (item.status == 1) {
          const job = new JobDto()
          job.name = item.name
          job.data = item.data || {}
          job.method = item.method
          job.opts = {
            repeat: {
              pattern: item.cron,
              key: item.id
            }
          }
          jobs.push(job)
        }
      }
      await this.queuesService.addJobs(jobs)
    })
  }

  async getTaskById(id: string) {
    return await this.taskRepository.findOne({
      select: ['id', 'cron', 'data', 'description', 'method', 'name', 'status'],
      where: { id }
    })
  }

  async getTasksById(id: string[]) {
    return await this.taskRepository.find({
      where: { id: In(id) }
    })
  }

  async deleteTaskById(id: string[]) {
    return await this.dataSource.transaction(async (manager) => {
      await manager.delete(TaskEntity, id)
      for (const item of id) {
        await this.queuesService.removeRepeatableByKey(item)
      }
    })
  }

  async startTask(id: string) {
    return await this.dataSource.transaction(async (manager) => {
      const task = await manager.findOne(TaskEntity, { where: { id } })
      if (!task) {
        throw '任务不存在'
      }
      task.status = 1
      await manager.save(task)
      const job = new JobDto()
      job.name = task.name
      job.data = task.data || {}
      job.method = task.method
      job.opts = {
        repeat: {
          pattern: task.cron,
          key: task.id
        }
      }
      await this.queuesService.addJob(job)
    })
  }

  async stopTask(id: string) {
    return await this.dataSource.transaction(async (manager) => {
      const task = await manager.findOne(TaskEntity, { where: { id } })
      if (!task) {
        throw '任务不存在'
      }
      task.status = 0
      await manager.save(task)
      await this.queuesService.removeRepeatableByKey(task.id)
    })
  }
}
