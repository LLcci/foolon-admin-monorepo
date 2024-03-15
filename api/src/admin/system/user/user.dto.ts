import { UserEntity } from '@/admin/system/user/user.entity'
import { PageRequestDto } from '@/common/class/response.dto'
import { ApiProperty, IntersectionType, OmitType, PickType } from '@nestjs/swagger'
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword
} from 'class-validator'

export class UserListDto extends PickType(UserEntity, ['username', 'realname', 'status']) {}

export class UserPageListDto extends IntersectionType(PageRequestDto, UserListDto) {}

export class UserCreateDto extends OmitType(UserEntity, ['id', 'salt', 'iv', 'roles']) {
  @ApiProperty({
    required: false,
    description: '角色ids',
    type: String,
    isArray: true
  })
  @IsArray({ message: '角色ids必须为数组' })
  @IsOptional()
  roleIds?: string[]
}

export class UserUpdateDto extends OmitType(UserEntity, [
  'salt',
  'iv',
  'roles',
  'password',
  'username'
]) {
  @ApiProperty({
    required: false,
    description: '角色ids',
    type: String,
    isArray: true
  })
  @IsArray({ message: '角色ids必须为数组' })
  @IsOptional()
  roleIds?: string[]
}

export class UpdatePasswordDto {
  @ApiProperty({
    required: true,
    description: '用户id'
  })
  @IsNotEmpty({ message: '用户id不能为空' })
  @IsString({ message: '用户id必须是字符串' })
  id: string

  @ApiProperty({
    required: true,
    description: '密码'
  })
  @IsNotEmpty({ message: '密码不能为空' })
  @IsString({ message: '密码必须是字符串' })
  @IsStrongPassword(
    {},
    {
      message({ value }) {
        if (value.length < 8) {
          return '密码不能少于8位'
        }
        if (value.length > 16) {
          return '密码不能超过16位'
        }
        if (!/\d/.test(value)) {
          return '密码必须包含数字'
        }
        if (!/[A-Z]/.test(value)) {
          return '密码必须包含大写字母'
        }
        if (!/[a-z]/.test(value)) {
          return '密码必须包含小写字母'
        }
        if (!/[!@#$%^&*()\\/`~\-_=\\[+{};:,<.>_|'"?]/.test(value)) {
          return '密码必须包含特殊字符'
        }
      }
    }
  )
  password: string

  @ApiProperty({
    required: true,
    description: '确认密码'
  })
  @IsNotEmpty({ message: '确认密码不能为空' })
  @IsString({ message: '确认密码必须是字符串' })
  confirmPassword: string
}

export class UserImportDto {
  @ApiProperty({
    description: '用户列表',
    required: true,
    type: UserCreateDto,
    isArray: true
  })
  @IsArray({
    message: '用户列表格式不正确'
  })
  @ArrayNotEmpty({ message: '用户列表不能为空' })
  list: UserCreateDto[]
}

export class UserSelectDto extends OmitType(UserEntity, ['password', 'salt', 'iv', 'roles']) {
  @ApiProperty({
    required: false,
    description: '角色ids',
    type: String,
    isArray: true
  })
  @IsArray({ message: '角色ids必须为数组' })
  @IsOptional()
  roleIds?: string[]
}
