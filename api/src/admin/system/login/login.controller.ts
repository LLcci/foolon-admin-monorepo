/*
https://docs.nestjs.com/controllers#controllers
*/

import { LoginDto } from '@/admin/system/login/login.dto'
import { LoginService } from '@/admin/system/login/login.service'
import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Code, Token } from './login.class'
import { Authorize } from '@/common/decorator/authorize.decorator'

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

  @Get('/code')
  @ApiOperation({ summary: '获取验证码' })
  @ApiOkResponse({ description: '获取验证码成功', type: Code })
  async getCode() {
    return await this.loginService.getCode()
  }
}
