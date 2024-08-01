/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { LogoutService } from './logout.service'
import { Token } from '@/common/decorator/token.decorator'
import { Permission } from '@/common/decorator/permission.decorator'

@ApiTags('登录')
@Controller('logout')
export class LogoutController {
  constructor(private readonly logoutService: LogoutService) {}

  @Permission()
  @Get()
  @ApiOperation({ summary: '登出' })
  @ApiOkResponse({ description: '登出' })
  logout(@Token() token: string) {
    return this.logoutService.logout(token)
  }
}
