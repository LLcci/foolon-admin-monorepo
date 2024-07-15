/*
https://docs.nestjs.com/providers#services
*/

import { JWT_SECRET } from '@/common/constants/token.constants'
import { SocketGateway } from '@/socket/socket.gateway'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserEntity } from '../user/user.entity'
import extractTokenFromHeader from '@/common/utils/extractTokenFromHeader'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { OnlineUserDto, OnlineUserPageListDto } from './online.dto'
import dayjs from 'dayjs'
import { PageResultDto } from '@/common/class/response.dto'

@Injectable()
export class OnlineService {
  constructor(
    private readonly socketGateWay: SocketGateway,
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async getOnlineUserList(onlineUserPageListDto: OnlineUserPageListDto) {
    const sockets = this.socketGateWay.server.sockets.sockets
    const userTokens: { token: string; address: string; loginDate: string }[] = []
    sockets.forEach((socket) => {
      userTokens.push({
        token: extractTokenFromHeader(socket.handshake.auth.token),
        address: socket.handshake.address,
        loginDate: dayjs(socket.handshake.time).format('YYYY-MM-DD HH:mm:ss')
      })
    })
    let onlineUsers: OnlineUserDto[] = []
    for (const token of userTokens) {
      const payload = await this.jwtService.verifyAsync<{ id: string }>(token.token, {
        secret: JWT_SECRET
      })
      const user = await this.userRepository.findOne({
        select: ['id', 'username', 'realname', 'avatar'],
        where: {
          id: payload?.id
        }
      })
      if (user) {
        onlineUsers.push({
          id: user.id,
          username: user.username,
          realname: user.realname,
          avatar: user.avatar,
          address: token.address,
          loginDate: token.loginDate
        })
      }
    }
    onlineUsers = onlineUsers
      .filter((item) => {
        return onlineUserPageListDto.username
          ? item.username.includes(onlineUserPageListDto.username)
          : true
      })
      .filter((item) => {
        return onlineUserPageListDto.realname
          ? item.realname.includes(onlineUserPageListDto.realname)
          : true
      })
    const total = onlineUsers.length
    onlineUsers.slice(
      (onlineUserPageListDto.currentPage - 1) * onlineUserPageListDto.pageSize,
      onlineUserPageListDto.currentPage * onlineUserPageListDto.pageSize
    )
    return new PageResultDto<OnlineUserDto>(
      onlineUsers,
      total,
      onlineUserPageListDto.currentPage,
      onlineUserPageListDto.pageSize
    )
  }
}
