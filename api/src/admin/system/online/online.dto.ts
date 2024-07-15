import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger'
import { UserEntity } from '../user/user.entity'
import { PageRequestDto } from '@/common/class/response.dto'

export class OnlineUserDto extends PickType(UserEntity, ['id', 'username', 'avatar', 'realname']) {
  @ApiProperty({
    description: '登录时间'
  })
  loginDate: string
  @ApiProperty({
    description: 'ip地址'
  })
  address: string
}

export class OnlineUserPageListDto extends IntersectionType(
  PageRequestDto,
  PickType(OnlineUserDto, ['username', 'realname'])
) {}
