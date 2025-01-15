import { UserEntity } from '@/admin/system/user/user.entity'
import { ApiProperty, PickType } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class LoginDto extends PickType(UserEntity, ['username']) {
  @ApiProperty({ description: '密码' })
  @IsString()
  @IsNotEmpty()
  password: string

  @ApiProperty({ description: '验证码' })
  @IsString()
  @IsNotEmpty()
  code: string

  @ApiProperty({ description: '验证码id' })
  @IsString()
  @IsNotEmpty()
  codeId: string
}
