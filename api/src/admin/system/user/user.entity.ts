import { BaseEntity } from '@/common/entity/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sys_user')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: '用户id' })
  @IsNotEmpty({ message: '用户id不能为空' })
  @IsString({ message: '用户id必须是字符串' })
  id: string;

  @Column({ unique: true, comment: '用户名' })
  @ApiProperty({ required: true, description: '用户名' })
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString({ message: '用户名必须是字符串' })
  username: string;

  @Column({ comment: '密码' })
  @ApiProperty({ required: true, description: '密码' })
  @IsNotEmpty({ message: '密码不能为空' })
  @IsString({ message: '密码必须是字符串' })
  password: string;

  @Column({ comment: '姓名' })
  @ApiProperty({ required: true, description: '姓名' })
  @IsNotEmpty({ message: '姓名不能为空' })
  @IsString({ message: '姓名必须是字符串' })
  realname: string;

  @Column({ comment: '密码盐' })
  salt: string;

  @Column({ comment: '初始向量' })
  iv: string;

  @Column({ nullable: true, comment: '头像' })
  @ApiProperty({ required: false, description: '头像' })
  avatar: string;

  @Column({ nullable: true, comment: '邮箱' })
  @ApiProperty({ required: false, description: '邮箱' })
  @IsEmail({}, { message: '邮箱格式不正确' })
  @IsOptional()
  email: string;

  @Column({ nullable: true, comment: '手机号' })
  @ApiProperty({ required: false, description: '手机号' })
  @IsPhoneNumber('CN', { message: '手机号格式不正确' })
  @IsOptional()
  phone: string;

  @Column({ comment: '状态:0-无效,1-有效', default: 1, type: 'tinyint' })
  @ApiProperty({ description: '状态:0-无效,1-有效' })
  status: number;
}
