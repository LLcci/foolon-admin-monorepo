/*
https://docs.nestjs.com/providers#services
*/

import { LoginDto } from '@/admin/system/login/login.dto'
import { UserEntity } from '@/admin/system/user/user.entity'
import decrypt from '@/common/utils/decrypt'
import { RedisService } from '@/global/redis/redis.service'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as svgCaptcha from 'svg-captcha'
import { nanoid } from 'nanoid'
import { REDIS_USERID_PREFIX } from '@/common/constants/redis.constants'
@Injectable()
export class LoginService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly redisService: RedisService
  ) {}

  async login(loginDto: LoginDto) {
    const redisCode = await this.redisService.getCode(loginDto.codeId)
    if (!redisCode) {
      throw '验证码已过期'
    }
    if (loginDto.code != redisCode) {
      throw '验证码错误'
    }
    await this.redisService.deleteCode(loginDto.codeId)
    let user = new UserEntity()
    user = await this.userRepository.findOne({
      where: { username: loginDto.username }
    })
    if (!user) {
      throw '用户未注册'
    }
    const decryptedPassword = await decrypt(user.salt, user.iv, user.password)
    if (loginDto.password != decryptedPassword) {
      throw '密码错误'
    }
    const payload = { id: user.id }
    const token = await this.jwtService.signAsync(payload)
    await this.redisService.setToken(token, user.iv)
    //todo 使用socket校验用户信息是否修改，存储id:token
    await this.redisService.client.set(`${REDIS_USERID_PREFIX}${user.id}`, user.iv)
    return {
      token
    }
  }

  async getCode() {
    const svg = svgCaptcha.create({
      size: 4,
      color: true,
      noise: 4,
      width: 100,
      height: 50,
      charPreset: '1234567890'
    })
    const result = {
      img: `data:image/svg+xml;base64,${Buffer.from(svg.data).toString('base64')}`,
      id: nanoid()
    }
    await this.redisService.setCode(result.id, svg.text)
    return result
  }
}
