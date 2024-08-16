import { LoggerService } from '@/global/logger/logger.service'
import { UseGuards } from '@nestjs/common'
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
  WsException
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { SocketGuard } from './socket.guard'
import extractTokenFromHeader from '@/common/utils/extractTokenFromHeader'
import { RedisService } from '@/global/redis/redis.service'
import { JwtService } from '@nestjs/jwt'
import { JWT_SECRET } from '@/common/constants/token.constants'

@UseGuards(SocketGuard)
@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect {
  constructor(
    private readonly redisService: RedisService,
    private readonly logger: LoggerService,
    private readonly jwtService: JwtService
  ) {}

  @WebSocketServer()
  server: Server

  afterInit() {
    this.logger.log('socket.io 初始化成功')
  }

  async disconnectByToken(token: string) {
    const sockets = await this.server.fetchSockets()
    const userSocket = sockets.find((socket) => socket.handshake.auth.token === `Bearer ${token}`)
    userSocket.disconnect(true)
  }

  async handleConnection(socket: Socket) {
    const token = extractTokenFromHeader(socket.handshake.auth.token)
    if (!socket.handshake.auth.token) {
      socket.send(new WsException('未登录，请进行登录'))
      return socket.disconnect(true)
    }
    const { payload, errMsg } = await this.redisService.checkToken(token)
    if (errMsg) {
      socket.send(new WsException(errMsg))
      return socket.disconnect(true)
    }
    socket.handshake.auth['user'] = payload
    this.logger.log(
      `客户端:${socket.id}; 用户id:${payload?.id}; IP:${socket.handshake.address}; 连接成功 `
    )
  }

  async handleDisconnect(socket: Socket) {
    const token = extractTokenFromHeader(socket.handshake.auth.token)
    const payload = await this.jwtService.verifyAsync<{ id: string }>(token, {
      secret: JWT_SECRET
    })
    this.logger.log(
      `客户端:${socket.id}; 用户id:${payload?.id}; IP:${socket.handshake.address}; 断开连接 `
    )
  }

  async sendMessage(socket: Socket, message: string) {
    return socket.send(message)
  }
}
