import { BaseEntity } from '@/common/entity/base.entity'
import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { Column, Entity, Index, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { RoleEntity } from '../role/role.entity'
@Entity('sys_menu')
export class MenuEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    required: false,
    description: '菜单id,新增时不需要传,更新时需要传'
  })
  @IsNotEmpty({ message: '菜单id不能为空' })
  @IsString({ message: '菜单id必须是字符串' })
  @IsOptional()
  id: string

  @Column({ name: 'parent_id', nullable: true, comment: '父菜单id' })
  @ApiProperty({ required: false, description: '父菜单id' })
  @IsString({ message: '父菜单id必须是字符串' })
  @IsOptional()
  parentId: string

  @Column({ name: 'name', nullable: true, comment: '名称' })
  @ApiProperty({
    required: false,
    description: '名称:类型为菜单时必填'
  })
  @IsNotEmpty({ message: '名称不能为空' })
  @IsString({ message: '名称必须是字符串' })
  @IsOptional()
  name: string

  @Column({ name: 'path', nullable: true, comment: '菜单路径' })
  @ApiProperty({
    required: false,
    description: '路由页面时必填'
  })
  @IsString({ message: '菜单路径必须是字符串' })
  @IsOptional()
  path: string

  @Column({ name: 'component', nullable: true, comment: '组件路径' })
  @ApiProperty({
    required: false,
    description: '路由页面时必填'
  })
  @IsString({ message: '组件路径必须是字符串' })
  @IsOptional()
  component: string

  @Column({ name: 'icon', nullable: true, comment: '菜单图标' })
  @ApiProperty({ required: false, description: '菜单图标' })
  @IsString({ message: '组件名称必须是字符串' })
  @IsOptional()
  icon: string

  @Index()
  @Column({
    name: 'menu_type',
    type: 'tinyint',
    comment: '菜单类型:0-一级菜单,1-子菜单,2-权限'
  })
  @ApiProperty({
    required: true,
    description: '菜单类型:0-一级菜单,1-子菜单,2-权限'
  })
  @IsNotEmpty({ message: '菜单类型不能为空' })
  @IsEnum([0, 1, 2], { message: '菜单类型必须是为 0 | 1 | 2' })
  menuType: 0 | 1 | 2

  @Column('simple-array', { name: 'perms', nullable: true, comment: '权限' })
  @ApiProperty({
    required: false,
    description: '类型为权限时必填'
  })
  @IsArray({ message: '权限必须是数组' })
  @IsOptional()
  perms: string[]

  @Index()
  @Column({ name: 'sort', comment: '排序', default: 1 })
  @ApiProperty({ required: true, description: '排序' })
  @IsNotEmpty({ message: '排序不能为空' })
  @IsNumber({}, { message: '排序必须是数字' })
  sort: number

  @Index()
  @Column({
    name: 'keepalive',
    type: 'tinyint',
    default: 1,
    comment: '是否缓存:0-不缓存,1-缓存'
  })
  @ApiProperty({
    required: false,
    default: 1,
    description: '是否缓存:0-不缓存,1-缓存'
  })
  @IsNotEmpty({ message: '是否缓存不能为空' })
  @IsEnum([0, 1], { message: '是否缓存必须是为 0 | 1 ' })
  keepalive: 0 | 1

  @Column({
    name: 'status',
    type: 'tinyint',
    default: 1,
    comment: '是否启用:0-停用,1-启用'
  })
  @Index()
  @ApiProperty({
    required: false,
    default: 1,
    description: '是否启用:0-停用,1-启用'
  })
  @IsNotEmpty({ message: '是否启用不能为空' })
  @IsEnum([0, 1], { message: '是否启用必须是为 0 | 1 ' })
  @IsOptional()
  status: 0 | 1

  @ManyToMany(() => RoleEntity, (role) => role.menus)
  roles: RoleEntity[]
}
