/*
https://docs.nestjs.com/controllers#controllers
*/

import { LoginDto } from '@/admin/system/login/login.dto'
import { LoginService } from '@/admin/system/login/login.service'
import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Token } from './login.class'
import { Authorize } from '@/common/decorator/authorize.decorator'
import { NoComRes } from '@/common/decorator/noComRes.decorator'

@Authorize()
@ApiTags('登录')
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @ApiOperation({ summary: '登录' })
  @ApiOkResponse({ description: '登录成功', type: Token })
  async login(@Body() loginDto: LoginDto): Promise<Token> {
    return await this.loginService.login(loginDto)
  }

  @NoComRes()
  @Post('/challenge')
  @ApiOperation({ summary: '人机验证' })
  async challenge() {
    return this.loginService.cap.createChallenge()
  }

  @NoComRes()
  @Post('/redeem')
  @ApiOperation({ summary: '人机验证' })
  async redeem(@Body() body: { token: string; solutions: Array<[string, string, number]> }) {
    const { token, solutions } = body
    if (!token || !solutions) {
      return new BadRequestException('人机验证失败')
    }
    return this.loginService.cap.redeemChallenge({ token, solutions })
  }
}
