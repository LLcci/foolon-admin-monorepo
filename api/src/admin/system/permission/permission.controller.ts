/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get } from '@nestjs/common';
import {
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PermissionService } from './permission.service';
import { User } from '@/common/decorator/user.decorator';
import { UserEntity } from '../user/user.entity';

@ApiTags('许可管理')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer token',
  example: 'Bearer token',
})
@Controller('permission')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @Get()
  @ApiOperation({
    summary: '获取用户权限',
  })
  @ApiOkResponse({
    description: '用户权限',
    type: UserEntity,
    isArray: false,
  })
  async getPermission(@User() user: { id: string; iv: string }) {
    return await this.permissionService.getPermission(user.id);
  }
}
