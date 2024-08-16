/*
https://docs.nestjs.com/providers#services
*/

import { QUEUE_NAME } from '@/common/constants/queues.constants'
import { InjectQueue } from '@nestjs/bullmq'
import { Injectable } from '@nestjs/common'
import { JobType, Queue } from 'bullmq'
import { JobDto } from './queues.dto'
import { ModuleRef } from '@nestjs/core'

@Injectable()
export class QueuesService {
  constructor(
    @InjectQueue(QUEUE_NAME) private queue: Queue,
    private readonly moduleRef: ModuleRef
  ) {}

  async getQueue() {
    return this.queue
  }

  async addJob(jobDto: JobDto) {
    Object.assign(jobDto.data, { method: jobDto.method, notifier: jobDto.notifier || undefined })
    return await this.queue.add(jobDto.name, jobDto.data, jobDto.opts)
  }

  async editJob(jobDto: JobDto) {
    await this.queue.remove(jobDto.opts.jobId)
    return await this.addJob(jobDto)
  }

  async getJobList(types?: JobType | JobType[], start?: number, end?: number, asc?: boolean) {
    return await this.queue.getJobs(types, start, end, asc)
  }

  async removeJob(jobId: string) {
    await this.getJobById(jobId)
    return await this.queue.remove(jobId)
  }

  async getJobById(jobId: string) {
    const job = await this.queue.getJob(jobId)
    if (!job) throw '工作未找到'
    return job
  }

  async getConsumerMethod() {
    const service = await this.moduleRef.get('QuquesConsumer', { strict: false })
    return Object.getOwnPropertyNames(service.__proto__).filter(
      (item) => !['constructor', 'process', 'onCompleted'].includes(item)
    )
  }
}
