/*
https://docs.nestjs.com/controllers#controllers
*/

import { LoginDto } from '@/admin/system/login/login.dto';
import { LoginService } from '@/admin/system/login/login.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('登录')
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @ApiOperation({ summary: '登录' })
  async login(@Body() loginDto: LoginDto) {
    return await this.loginService.login(loginDto);
  }
}
