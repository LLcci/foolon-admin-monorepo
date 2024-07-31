import { BaseEntity } from '@/common/entity/base.entity'
import { ApiProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  ValidateIf,
  isNotEmpty
} from 'class-validator'
import { Column, Entity, Index, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { RoleEntity } from '../role/role.entity'

@Entity('sys_user')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    required: false,
    description: '用户id,新增时不需要传,更新时必传'
  })
  @IsNotEmpty({ message: '用户id不能为空' })
  @IsString({ message: '用户id必须是字符串' })
  id: string

  @Index()
  @Column({ unique: true, comment: '用户账户' })
  @ApiProperty({
    required: false,
    description: '用户账户,查询时非必传,新增更新时必传'
  })
  @IsString({ message: '用户账户必须是字符串' })
  @IsOptional()
  username: string

  @Column({ comment: '密码' })
  @ApiProperty({ required: true, description: '密码' })
  @IsNotEmpty({ message: '密码不能为空' })
  @IsString({ message: '密码必须是字符串' })
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
  password: string

  @Index()
  @Column({ comment: '用户名' })
  @ApiProperty({
    required: false,
    description: '用户名,查询时非必传,新增更新时必传'
  })
  @IsString({ message: '用户名必须是字符串' })
  @IsOptional()
  realname: string

  @Column({ comment: '密码盐' })
  salt: string

  @Column({ comment: '初始向量' })
  iv: string

  @Column({ nullable: true, comment: '头像' })
  @ApiProperty({ required: false, description: '头像' })
  @IsString({ message: '头像地址必须是字符串' })
  @IsOptional()
  avatar: string

  @Index()
  @Column({ nullable: true, comment: '邮箱' })
  @ApiProperty({ required: false, description: '邮箱' })
  @IsEmail({}, { message: '邮箱格式不正确' })
  @ValidateIf((object, value) => isNotEmpty(value))
  @IsOptional()
  email: string

  @Index()
  @Column({ nullable: true, comment: '手机号' })
  @ApiProperty({ required: false, description: '手机号' })
  @IsPhoneNumber('CN', { message: '手机号格式不正确' })
  @ValidateIf((object, value) => isNotEmpty(value))
  @IsOptional()
  phone: string

  @ApiProperty({
    readOnly: true,
    description: '角色列表',
    type: RoleEntity,
    isArray: true
  })
  @ManyToMany(() => RoleEntity, (role) => role.users)
  @JoinTable()
  roles: RoleEntity[]

  @Index()
  @Column({ comment: '状态:0-无效,1-有效', default: 1, type: 'tinyint' })
  @ApiProperty({ required: false, description: '状态:0-无效,1-有效' })
  @IsEnum([0, 1], { message: '状态:0-无效,1-有效' })
  @IsOptional()
  status: 0 | 1
}
