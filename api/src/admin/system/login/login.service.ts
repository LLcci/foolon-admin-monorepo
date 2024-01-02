/*
https://docs.nestjs.com/providers#services
*/

import { LoginDto } from '@/admin/system/login/login.dto';
import { UserEntity } from '@/admin/system/user/user.entity';
import decrypt from '@/common/utils/decrypt';
import { RedisService } from '@/global/redis/redis.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LoginService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly redisService: RedisService,
  ) {}

  async login(loginDto: LoginDto) {
    let user = new UserEntity();
    user = await this.userRepository.findOne({
      where: { username: loginDto.username },
    });
    if (!user) {
      throw '用户未注册';
    }
    const decryptedPassword = await decrypt(user.salt, user.iv, user.password);
    if (loginDto.password != decryptedPassword) {
      throw '密码错误';
    }
    const payload = { id: user.id };
    const token = await this.jwtService.signAsync(payload);
    await this.redisService.client.set(
      `${process.env.REDIS_TOKEN_PREFIX}${token}`,
      user.iv,
      {
        EX: Number(process.env.REDIS_TOKEN_EX),
      },
    );
    await this.redisService.client.set(
      `${process.env.REDIS_PREFIX}${user.id}`,
      user.iv,
    );
    return {
      token,
    };
  }
}
