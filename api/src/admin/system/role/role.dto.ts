import { ApiProperty, IntersectionType, OmitType, PickType } from '@nestjs/swagger'
import { RoleEntity } from './role.entity'
import { PageRequestDto } from '@/common/class/response.dto'
import { ArrayNotEmpty, IsArray, IsOptional } from 'class-validator'

export class RoleListDto extends PickType(RoleEntity, ['name', 'status']) {}

export class RolePageListDto extends IntersectionType(PageRequestDto, RoleListDto) {}

export class RoleSaveDto extends OmitType(RoleEntity, ['menus']) {
  @ApiProperty({
    description: '菜单ID列表',
    type: String,
    isArray: true,
    required: false
  })
  @IsArray({
    message: '菜单ids必须是数组'
  })
  @IsOptional()
  menuIds: string[]
}

export class RoleImportDto {
  @ApiProperty({
    description: '角色列表',
    required: true,
    type: RoleSaveDto,
    isArray: true
  })
  @IsArray({
    message: '角色列表格式不正确'
  })
  @ArrayNotEmpty({ message: '角色列表不能为空' })
  list: RoleSaveDto[]
}
