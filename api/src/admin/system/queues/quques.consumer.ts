import { Processor, WorkerHost } from '@nestjs/bullmq'
import { QUEUE_NAME } from '@/common/constants/queues.constants'
import { Job } from 'bullmq'
import { LoggerService } from '@/global/logger/logger.service'
import { isEmpty } from 'class-validator'

@Processor(QUEUE_NAME)
export class QuquesConsumer extends WorkerHost {
  constructor(private readonly logger: LoggerService) {
    super()
  }
  async process(job: Job) {
    this.logger.log(JSON.stringify(job))
    if (isEmpty(job.data.method)) {
      throw new Error('method is empty')
    }
    if (!(job.data.method in this)) {
      throw new Error('method is not exist')
    }
    const data = await this[job.data.method](job)
    await job.updateProgress(100)
    return data
  }

  async demo(job: Job) {
    return { notifier: job.data.notifier, message: `${job.name}工作已完成` }
  }
}
