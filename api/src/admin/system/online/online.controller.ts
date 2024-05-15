/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller } from '@nestjs/common'
import { ApiHeader, ApiTags } from '@nestjs/swagger'

@ApiTags('在线用户')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer token',
  example: 'Bearer token'
})
@Controller()
export class OnlineController {}
