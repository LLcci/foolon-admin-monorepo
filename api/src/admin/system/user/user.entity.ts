import { BaseEntity } from '@/common/entity/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleEntity } from '../role/role.entity';

@Entity('sys_user')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    required: false,
    description: '用户id,新增时不需要传,更新时必传',
  })
  @IsNotEmpty({ message: '用户id不能为空' })
  @IsString({ message: '用户id必须是字符串' })
  @IsOptional()
  id: string;

  @Column({ unique: true, comment: '用户账户' })
  @ApiProperty({
    required: false,
    description: '用户账户,查询时非必传,新增更新时必传',
  })
  @IsNotEmpty({ message: '用户账户不能为空' })
  @IsString({ message: '用户账户必须是字符串' })
  @IsOptional()
  username: string;

  @Column({ comment: '密码' })
  @ApiProperty({ required: true, description: '密码' })
  @IsNotEmpty({ message: '密码不能为空' })
  @IsString({ message: '密码必须是字符串' })
  password: string;

  @Column({ comment: '用户名' })
  @ApiProperty({
    required: false,
    description: '用户名,查询时非必传,新增更新时必传',
  })
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString({ message: '用户名必须是字符串' })
  @IsOptional()
  realname: string;

  @Column({ comment: '密码盐' })
  salt: string;

  @Column({ comment: '初始向量' })
  iv: string;

  @Column({ nullable: true, comment: '头像' })
  @ApiProperty({ required: false, description: '头像' })
  @IsString({ message: '头像地址必须是字符串' })
  @IsOptional()
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

  @ManyToMany(() => RoleEntity, (role) => role.users)
  @JoinTable()
  roles: RoleEntity[];

  @Column({ comment: '状态:0-无效,1-有效', default: 1, type: 'tinyint' })
  @ApiProperty({ required: false, description: '状态:0-无效,1-有效' })
  @IsEnum([0, 1], { message: '状态:0-无效,1-有效' })
  @IsOptional()
  status: 0 | 1;
}
