/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  UserImportDto,
  UserPageListDto,
  UserCreateDto,
  UserSelectDto,
  UserUpdateDto,
  UpdatePasswordDto
} from '@/admin/system/user/user.dto'
import { UserService } from '@/admin/system/user/user.service'
import { User } from '@/common/decorator/user.decorator'
import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { ApiHeader, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { UserEntity } from './user.entity'
import validateArrObj from '@/common/utils/validateArrObj'
import { omit } from 'lodash'
import { DeleteResult } from 'typeorm'
import { RoleService } from '../role/role.service'
import encrypt from '@/common/utils/encrypt'
import { ApiPaginatedResponse } from '@/common/decorator/pageRequest.decorator'

@ApiTags('用户管理')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer token',
  example: 'Bearer token'
})
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService
  ) {}

  @Post('page')
  @ApiOperation({
    summary: '分页用户列表'
  })
  @ApiPaginatedResponse(UserEntity)
  async getUserPageList(@Body() userPageListDto: UserPageListDto) {
    return await this.userService.getUserPageList(userPageListDto)
  }

  @Post('list')
  @ApiOperation({
    summary: '用户列表'
  })
  @ApiOkResponse({
    description: '用户列表',
    type: UserEntity,
    isArray: true
  })
  async getUserList(@Body() userPageListDto: UserPageListDto) {
    return await this.userService.getUserList(userPageListDto)
  }

  @Post('create')
  @ApiOperation({
    summary: '创建用户'
  })
  async createUser(@Body() userCreateDto: UserCreateDto, @User() user: { id: string }) {
    const userEnt = new UserEntity()
    userEnt.id = user.id
    userCreateDto.createUser = userEnt
    userCreateDto.updateUser = userEnt
    const userEntity = await this.userService.userSaveDto2Entity(userCreateDto)
    await this.userService.saveUser(userEntity)
    return '创建用户成功'
  }

  @Post('update')
  @ApiOperation({
    summary: '更新用户'
  })
  async updateUser(@Body() userUpdateDto: UserUpdateDto, @User() user: { id: string }) {
    const userEnt = new UserEntity()
    userEnt.id = user.id
    userUpdateDto.updateUser = userEnt
    const userEntity = new UserEntity()
    Object.assign(userEntity, omit(userUpdateDto, ['roleIds']))
    userEntity.roles = []
    if (userUpdateDto.roleIds?.length > 0) {
      userEntity.roles = await this.roleService.getRolesById(userUpdateDto.roleIds)
    }
    await this.userService.saveUser(userEntity)
    return '更新用户成功'
  }

  @Post('password')
  @ApiOperation({
    summary: '更新用户密码'
  })
  async updatePassword(@Body() updatePasswordDto: UpdatePasswordDto, @User() user: { id: string }) {
    if (updatePasswordDto.password !== updatePasswordDto.confirmPassword) {
      throw '两次密码不一致'
    }
    const userEnt = new UserEntity()
    userEnt.id = user.id
    const userEntity = new UserEntity()
    userEntity.id = updatePasswordDto.id
    userEntity.updateUser = userEnt
    const { iv, salt, encryptedPassword } = await encrypt(updatePasswordDto.password)
    userEntity.salt = salt
    userEntity.iv = iv
    userEntity.password = encryptedPassword
    await this.userService.saveUser(userEntity)
    return '更新用户密码成功'
  }

  @Post('import')
  @ApiOperation({
    summary: '导入用户'
  })
  async importUser(@Body() userImportDto: UserImportDto, @User() user: { id: string }) {
    await validateArrObj(userImportDto.list, UserCreateDto)
    const userEntities: UserEntity[] = []
    const userEnt = new UserEntity()
    userEnt.id = user.id
    for (const item of userImportDto.list) {
      item.createUser = userEnt
      item.updateUser = userEnt
      const userEntity = await this.userService.userSaveDto2Entity(item)
      userEntities.push(userEntity)
    }
    await this.userService.importUser(userEntities)
    return '导入用户成功'
  }

  @Get('id')
  @ApiOperation({
    summary: 'id查询用户详情'
  })
  @ApiOkResponse({
    description: 'id查询用户详情',
    type: UserSelectDto
  })
  async getUserById(@Query('id') id: string) {
    const user = await this.userService.getUserById(id)
    const userSelect = new UserSelectDto()
    if (user.roles.length) {
      userSelect.roleIds = user.roles.map((item) => item.id)
    }
    Object.assign(userSelect, omit(user, ['roles']))
    return userSelect
  }

  @Post('delete')
  @ApiOperation({
    summary: 'id删除用户'
  })
  @ApiOkResponse({
    description: 'id删除用户',
    type: DeleteResult
  })
  async deleteUserById(@Body('id') id: string[]) {
    return await this.userService.deleteUserById(id)
  }
}
