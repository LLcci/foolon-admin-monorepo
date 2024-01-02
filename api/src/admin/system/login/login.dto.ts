import { UserEntity } from '@/admin/system/user/user.entity';
import { PickType } from '@nestjs/swagger';

export class LoginDto extends PickType(UserEntity, ['username', 'password']) {}
