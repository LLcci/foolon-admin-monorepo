import { UserEntity } from '@/admin/system/user/user.entity';
import { PageRequestDto } from '@/common/class/response.dto';
import {
  ApiProperty,
  IntersectionType,
  OmitType,
  PickType,
} from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsOptional } from 'class-validator';

export class UserListDto extends PickType(UserEntity, [
  'username',
  'realname',
  'status',
]) {}

export class UserPageListDto extends IntersectionType(
  PageRequestDto,
  UserListDto,
) {}

export class UserSaveDto extends OmitType(UserEntity, ['salt', 'iv', 'roles']) {
  @ApiProperty({
    required: false,
    description: '角色ids',
    type: String,
    isArray: true,
  })
  @IsArray({ message: '角色ids必须为数组' })
  @IsOptional()
  roleIds?: string[];
}

export class UserImportDto {
  @ApiProperty({
    description: '用户列表',
    required: true,
    type: UserSaveDto,
    isArray: true,
  })
  @IsArray({
    message: '用户列表格式不正确',
  })
  @ArrayNotEmpty({ message: '用户列表不能为空' })
  list: UserSaveDto[];
}
