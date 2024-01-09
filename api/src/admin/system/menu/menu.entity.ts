import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sys_menu')
export class MenuEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'parent_id', nullable: true, comment: '父菜单id' })
  @ApiProperty({ required: true, description: '父菜单id' })
  @IsNotEmpty({ message: '父菜单id不能为空' })
  @IsString({ message: '父菜单id必须是字符串' })
  @IsOptional()
  parentId: string;

  @Column({ name: 'name', comment: '菜单名称' })
  @ApiProperty({ required: true, description: '菜单名称' })
  @IsNotEmpty({ message: '菜单名称不能为空' })
  @IsString({ message: '菜单名称必须是字符串' })
  name: string;

  @Column({ name: 'path', comment: '菜单路径' })
  @ApiProperty({ required: true, description: '菜单路径' })
  @IsNotEmpty({ message: '菜单路径不能为空' })
  @IsString({ message: '菜单路径必须是字符串' })
  path: string;

  @Column({ name: 'component', comment: '组件路径' })
  @ApiProperty({ required: true, description: '组件路径' })
  @IsNotEmpty({ message: '组件路径不能为空' })
  @IsString({ message: '组件路径必须是字符串' })
  component: string;

  @Column({ name: 'coponent_name', comment: '组件名称' })
  @ApiProperty({ required: true, description: '组件名称' })
  @IsNotEmpty({ message: '组件名称不能为空' })
  @IsString({ message: '组件名称必须是字符串' })
  coponentName: string;

  @Column({ name: 'icon', nullable: true, comment: '菜单图标' })
  @ApiProperty({ required: true, description: '菜单图标' })
  @IsNotEmpty({ message: '菜单图标不能为空' })
  @IsString({ message: '组件名称必须是字符串' })
  @IsOptional()
  icon: string;
}
