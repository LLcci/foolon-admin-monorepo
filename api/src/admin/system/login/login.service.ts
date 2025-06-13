/*
https://docs.nestjs.com/providers#services
*/

import { LoginDto } from '@/admin/system/login/login.dto'
import { UserEntity } from '@/admin/system/user/user.entity'
import { RedisService } from '@/global/redis/redis.service'
import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcryptjs'
import Cap from '@cap.js/server'
@Injectable()
export class LoginService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly redisService: RedisService
  ) {}

  cap: Cap = new Cap({ tokens_store_path: '.data/tokensList.json' })

  async login(loginDto: LoginDto) {
    const result = await this.cap.validateToken(loginDto.code)
    if (!result.success) {
      throw new BadRequestException('人机验证失败')
    }
    let user = new UserEntity()
    user = await this.userRepository.findOne({
      select: ['id', 'password', 'salt'],
      where: { username: loginDto.username }
    })
    if (!user) {
      throw new BadRequestException('用户未注册')
    }
    const isMatch = await bcrypt.compare(loginDto.password, user.password)
    if (!isMatch) {
      throw new BadRequestException('密码错误')
    }
    if (user.status != '1') {
      throw new BadRequestException('用户已禁用')
    }
    const payload = { id: user.id }
    const token = await this.jwtService.signAsync(payload)
    await this.redisService.setToken(token, user.salt)
    await this.redisService.setUserInfoVersion(user.id, user.salt)
    return {
      token
    }
  }
}
