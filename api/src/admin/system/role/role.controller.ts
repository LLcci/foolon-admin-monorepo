/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { ApiHeader, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { RoleService } from './role.service'
import { PageResultDto } from '@/common/class/response.dto'
import { RoleEntity } from './role.entity'
import { RoleImportDto, RolePageListDto, RoleSaveDto } from './role.dto'
import { User } from '@/common/decorator/user.decorator'
import { DeleteResult } from 'typeorm'
import { MenuService } from '../menu/menu.service'
import { omit } from 'lodash'
import validateArrObj from '@/common/utils/validateArrObj'

@ApiTags('角色管理')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer token',
  example: 'Bearer token'
})
@Controller('role')
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private readonly menuService: MenuService
  ) {}

  @Post('page')
  @ApiOperation({
    summary: '分页角色列表'
  })
  @ApiOkResponse({
    description: '分页角色列表',
    type: PageResultDto<RoleEntity>
  })
  async getRolePageList(@Body() rolePageListDto: RolePageListDto) {
    const list = await this.roleService.getRoleList(rolePageListDto)
    return new PageResultDto<RoleEntity>(
      list,
      rolePageListDto.currentPage,
      rolePageListDto.pageSize
    )
  }

  @Post('list')
  @ApiOperation({
    summary: '角色列表'
  })
  @ApiOkResponse({
    description: '角色列表',
    type: RoleEntity,
    isArray: true
  })
  async getRoleList(@Body() rolePageListDto: RolePageListDto) {
    return await this.roleService.getRoleList(rolePageListDto)
  }

  @Post('save')
  @ApiOperation({
    summary: '保存角色'
  })
  @ApiOkResponse({
    description: '保存角色',
    type: RoleEntity
  })
  async saveRole(@Body() role: RoleSaveDto, @User() user: { id: string }) {
    const roleEntity = new RoleEntity()
    const menus = await this.menuService.getMenusById(role.menuIds)
    if (!role.id) {
      role.createUserId = user.id
    }
    role.updateUserId = user.id
    Object.assign(roleEntity, omit(role, 'menuIds'))
    roleEntity.menus = menus
    return await this.roleService.saveRole(roleEntity)
  }

  @Post('import')
  @ApiOperation({
    summary: '导入角色'
  })
  @ApiOkResponse({
    description: '导入角色',
    type: RoleEntity,
    isArray: true
  })
  async importRole(@Body() role: RoleImportDto, @User() user: { id: string }) {
    const roleList: RoleEntity[] = []
    await validateArrObj(role.list, RoleSaveDto)
    for (const item of role.list) {
      const menus = await this.menuService.getMenusById(item.menuIds)
      const roleItem = new RoleEntity()
      if (!item.id) {
        item.createUserId = user.id
      }
      item.updateUserId = user.id
      Object.assign(roleItem, omit(item, 'menuIds'))
      roleItem.menus = menus
      roleList.push(roleItem)
    }
    return await this.roleService.importRole(roleList)
  }

  @Get('id')
  @ApiOperation({
    summary: 'id查询角色详情'
  })
  @ApiOkResponse({
    description: 'id查询角色详情',
    type: RoleSaveDto
  })
  async getRoleById(@Query('id') id: string) {
    const role = await this.roleService.getRoleById(id)
    const roleSave = new RoleSaveDto()
    if (role.menus.length) {
      roleSave.menuIds = role.menus.map((item) => item.id)
    }
    Object.assign(roleSave, omit(role, ['menus']))
    return roleSave
  }

  @Post('delete')
  @ApiOperation({
    summary: 'id删除角色'
  })
  @ApiOkResponse({
    description: 'id删除角色',
    type: DeleteResult
  })
  async deleteRoleById(@Body('id') id: string[]) {
    return await this.roleService.deleteRoleById(id)
  }
}
