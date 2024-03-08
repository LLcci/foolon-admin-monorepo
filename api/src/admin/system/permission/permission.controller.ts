/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiHeader, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { PermissionService } from './permission.service'
import { User } from '@/common/decorator/user.decorator'
import { UserEntity } from '../user/user.entity'
import { UpdateUserInfoDto, UpdateUserPasswordDto } from './permission.dto'
import { UpdateResult } from 'typeorm'

@ApiTags('许可管理')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer token',
  example: 'Bearer token'
})
@Controller('permission')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @Get()
  @ApiOperation({
    summary: '获取用户权限'
  })
  @ApiOkResponse({
    description: '用户权限',
    type: UserEntity,
    isArray: false
  })
  async getPermission(@User() user: { id: string }) {
    return await this.permissionService.getPermission(user.id)
  }

  @Post('userInfo')
  @ApiOperation({
    summary: '更新用户信息'
  })
  @ApiOkResponse({
    description: '用户信息',
    type: UpdateResult,
    isArray: false
  })
  async updateUserInfo(@User() user: { id: string }, @Body() info: UpdateUserInfoDto) {
    return await this.permissionService.updateUserInfo(user.id, info)
  }

  @Post('updatePassword')
  @ApiOperation({
    summary: '修改用户密码'
  })
  @ApiOkResponse({
    description: '修改用户密码',
    type: UpdateResult,
    isArray: false
  })
  async updatePassword(
    @User() user: { id: string },
    @Body() updateUserPasswordDto: UpdateUserPasswordDto
  ) {
    return await this.permissionService.updatePassword(user.id, updateUserPasswordDto)
  }
}
