/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common'
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger'
import { OnlineService } from './online.service'
import { OnlineUserDto, OnlineUserPageListDto } from './online.dto'
import { ApiPaginatedResponse } from '@/common/decorator/pageRequest.decorator'

@ApiTags('在线用户')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer token',
  example: 'Bearer token'
})
@Controller('online')
export class OnlineController {
  constructor(private readonly onlineService: OnlineService) {}

  @Post('list')
  @ApiOperation({
    summary: '分页在线用户列表'
  })
  @ApiPaginatedResponse(OnlineUserDto)
  async getOnlineUserList(@Body() onlineUserPageListDto: OnlineUserPageListDto) {
    return await this.onlineService.getOnlineUserPage(onlineUserPageListDto)
  }
}
