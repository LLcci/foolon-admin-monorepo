import { ApiProperty, PickType } from '@nestjs/swagger'
import { UserEntity } from '../user/user.entity'
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator'

export class UpdateUserInfoDto extends PickType(UserEntity, [
  'realname',
  'avatar',
  'email',
  'phone'
]) {}

export class UpdateUserPasswordDto {
  @ApiProperty({
    required: true,
    description: '原密码'
  })
  @IsNotEmpty({ message: '原密码不能为空' })
  @IsString({ message: '原密码必须是字符串' })
  oldPassword: string

  @ApiProperty({
    required: true,
    description: '新密码'
  })
  @IsNotEmpty({ message: '新密码不能为空' })
  @IsString({ message: '新密码必须是字符串' })
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
  newPassword: string

  @ApiProperty({
    required: true,
    description: '确认新密码'
  })
  @IsNotEmpty({ message: '确认密码不能为空' })
  @IsString({ message: '确认密码必须是字符串' })
  confirmPassword: string
}
