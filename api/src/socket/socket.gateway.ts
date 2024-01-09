import { LoggerService } from '@/global/logger/logger.service';
import {
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ namespace: 'ws' })
export class SocketGateway implements OnGatewayInit {
  constructor(private readonly logger: LoggerService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string): string {
    this.logger.log(data);
    return data;
  }

  afterInit() {
    this.logger.log(
      `ws服务已启动,请访问：http://127.0.0.1:${process.env.WS_PORT}`,
    );
  }
}
