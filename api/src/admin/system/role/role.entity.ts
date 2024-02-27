import { BaseEntity } from '@/common/entity/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MenuEntity } from '../menu/menu.entity';
import { UserEntity } from '../user/user.entity';

@Entity('sys_role')
export class RoleEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    required: false,
    description: '角色id,新增时不需要传,更新时需要传',
  })
  @IsNotEmpty({ message: '角色id不能为空' })
  @IsString({ message: '角色id必须是字符串' })
  @IsOptional()
  id: string;

  @Column({ comment: '角色名称' })
  @ApiProperty({
    description: '角色名称,查询时非必传,新增更新时必传',
    required: false,
  })
  @IsNotEmpty({ message: '角色名称不能为空' })
  @IsString({ message: '角色名称必须是字符串' })
  @IsOptional()
  name: string;

  @Column({ comment: '角色描述', nullable: true })
  @ApiProperty({ required: false, description: '角色描述' })
  @IsString({ message: '角色描述必须是字符串' })
  @IsOptional()
  description: string;

  @ManyToMany(() => MenuEntity, (menu) => menu.roles)
  @JoinTable()
  menus: MenuEntity[];

  @Column({
    name: 'status',
    type: 'tinyint',
    default: 1,
    comment: '是否启用:0-停用,1-启用',
  })
  @Index()
  @ApiProperty({
    required: false,
    default: 1,
    description: '是否启用:0-停用,1-启用',
  })
  @IsNotEmpty({ message: '是否启用不能为空' })
  @IsEnum([0, 1], { message: '是否启用必须是 0 | 1' })
  @IsOptional()
  status: 1 | 0;

  @ManyToMany(() => UserEntity, (user) => user.roles)
  users: UserEntity[];
}
