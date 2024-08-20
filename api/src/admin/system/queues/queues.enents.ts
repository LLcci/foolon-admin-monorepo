import { QUEUE_NAME } from '@/common/constants/queues.constants'
import { LoggerService } from '@/global/logger/logger.service'
import { SocketGateway } from '@/socket/socket.gateway'
import { QueueEventsListener, QueueEventsHost, OnQueueEvent } from '@nestjs/bullmq'
import { Socket } from 'socket.io'

@QueueEventsListener(QUEUE_NAME)
export class QueueEvents extends QueueEventsHost {
  constructor(
    private readonly logger: LoggerService,
    private readonly socketGateway: SocketGateway
  ) {
    super()
  }

  @OnQueueEvent('completed')
  onCompleted(job: { jobId: string; returnvalue: any; prev?: string }) {
    this.logger.log(`job:completed: ${job.jobId}`)
    if (job.returnvalue.notifier && job.returnvalue.message) {
      let userSocket: Socket
      this.socketGateway.server.sockets.sockets.forEach((item) => {
        if (item.handshake.auth.user.id == job.returnvalue.notifier) {
          userSocket = item
        }
      })
      if (!userSocket) {
        return this.logger.log(`job:completed:notifier ${job.returnvalue.notifier} is not online`)
      }
      this.socketGateway.sendQuequesMessage(userSocket, job.returnvalue.message)
    }
  }
}
