/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common'
import { ApiHeader, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { OnlineService } from './online.service'
import { OnlineUserPageListDto } from './online.dto'

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
  @ApiOkResponse({
    description: '分页在线用户列表'
  })
  async getOnlineUserList(@Body() onlineUserPageListDto: OnlineUserPageListDto) {
    return await this.onlineService.getOnlineUserList(onlineUserPageListDto)
  }
}
