/*
https://docs.nestjs.com/providers#services
*/

import { CreateUserDto } from '@/admin/system/user/user.dto';
import { UserEntity } from '@/admin/system/user/user.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import encrypt from '@/common/utils/encrypt';
import { RedisService } from '@/global/redis/redis.service';
import { REDIS_USERID_PREFIX } from '@/common/constants/redis.constants';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly redisService: RedisService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    if (
      await this.userRepository.findOne({
        where: { username: createUserDto.username },
      })
    ) {
      throw '用户名已存在';
    }
    // 加密密码
    const { iv, salt, encryptedPassword } = await encrypt(
      createUserDto.password,
    );
    createUserDto.password = encryptedPassword;
    createUserDto.salt = salt;
    createUserDto.iv = iv;
    const user = await this.userRepository.save(createUserDto);
    await this.redisService.client.set(`${REDIS_USERID_PREFIX}${user.id}`, iv);
    return user;
  }
}
