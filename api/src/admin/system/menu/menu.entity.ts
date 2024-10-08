import { BaseEntity } from '@/common/entity/base.entity'
import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { Column, Entity, Index, ManyToMany } from 'typeorm'
import { RoleEntity } from '../role/role.entity'
@Entity('sys_menu')
export class MenuEntity extends BaseEntity {
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
    comment: '菜单类型:0-一级菜单,1-子菜单,2-权限,3外部链接'
  })
  @ApiProperty({
    required: true,
    description: '菜单类型:0-一级菜单,1-子菜单,2-权限,3-外部链接',
    enum: [0, 1, 2, 3]
  })
  @IsNotEmpty({ message: '菜单类型不能为空' })
  @IsEnum([0, 1, 2, 3], { message: '菜单类型必须是为 0 | 1 | 2 | 3' })
  menuType: 0 | 1 | 2 | 3

  @Column('simple-array', { name: 'perms', nullable: true, comment: '权限' })
  @ApiProperty({
    required: false,
    description: '类型为权限时必填'
  })
  @IsArray({ message: '权限必须是数组' })
  @IsOptional()
  perms: string[]

  @Column({ name: 'open_type', type: 'tinyint', comment: '0-内部打开,1-外部打开', nullable: true })
  @ApiProperty({
    required: false,
    description: '打开方式:0-内部打开,1-外部打开，类型为外部链接时必填',
    enum: [0, 1]
  })
  @IsEnum([0, 1], { message: '打开方式必须是为 0 | 1 ' })
  @IsOptional()
  openType: 0 | 1

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

  @ManyToMany(() => RoleEntity, (role) => role.menus)
  roles: RoleEntity[]
}
