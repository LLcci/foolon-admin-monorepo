/*
https://docs.nestjs.com/providers#services
*/

import { SocketGateway } from '@/socket/socket.gateway'
import { Injectable } from '@nestjs/common'
import { UserEntity } from '../user/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { OnlineUserDto, OnlineUserListDto, OnlineUserPageListDto } from './online.dto'
import dayjs from 'dayjs'
import { PageResultDto } from '@/common/class/response.dto'

@Injectable()
export class OnlineService {
  constructor(
    private readonly socketGateWay: SocketGateway,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async getOnlineUserList(onlineUserListDto?: OnlineUserListDto) {
    const sockets = this.socketGateWay.server.sockets.sockets
    const userIds: { id: string; address: string; loginDate: string }[] = []
    sockets.forEach((socket) => {
      userIds.push({
        id: socket.handshake.auth.user.id,
        address: socket.handshake.address,
        loginDate: dayjs(socket.handshake.time).format('YYYY-MM-DD HH:mm:ss')
      })
    })
    let onlineUsers: OnlineUserDto[] = []
    for (const item of userIds) {
      const user = await this.userRepository.findOne({
        select: ['id', 'username', 'realname', 'avatar'],
        where: {
          id: item.id
        }
      })
      if (user) {
        onlineUsers.push({
          id: user.id,
          username: user.username,
          realname: user.realname,
          avatar: user.avatar,
          address: item.address,
          loginDate: item.loginDate
        })
      }
    }
    onlineUsers = onlineUsers
      .filter((item) => {
        return onlineUserListDto.username
          ? item.username.includes(onlineUserListDto.username)
          : true
      })
      .filter((item) => {
        return onlineUserListDto.realname
          ? item.realname.includes(onlineUserListDto.realname)
          : true
      })
    return onlineUsers
  }

  async getOnlineUserPage(onlineUserPageListDto: OnlineUserPageListDto) {
    const onlineUsers = await this.getOnlineUserList(onlineUserPageListDto)
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
