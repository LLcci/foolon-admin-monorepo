import { UserEntity } from '@/admin/system/user/user.entity';
import { PickType } from '@nestjs/swagger';

export class CreateUserDto extends PickType(UserEntity, [
  'username',
  'password',
  'realname',
  'email',
  'phone',
  'createUserId',
  'salt',
  'iv',
  'avatar',
]) {}
