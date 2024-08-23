import { BaseEntity } from '@/common/entity/base.entity'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { Column, Entity, Index, JoinTable, ManyToMany } from 'typeorm'
import { MenuEntity } from '../menu/menu.entity'
import { UserEntity } from '../user/user.entity'

@Entity('sys_role')
export class RoleEntity extends BaseEntity {
  @Index()
  @Column({ comment: '角色名称' })
  @ApiProperty({
    description: '角色名称,查询时非必传,新增更新时必传',
    required: false
  })
  @IsNotEmpty({ message: '角色名称不能为空' })
  @IsString({ message: '角色名称必须是字符串' })
  @IsOptional()
  name: string

  @Index({ unique: true })
  @Column({ comment: '角色编码' })
  @ApiProperty({
    description: '角色编码,查询时非必传,新增更新时必传',
    required: false
  })
  @IsNotEmpty({ message: '角色编码不能为空' })
  @IsString({ message: '角色编码必须是字符串' })
  @IsOptional()
  code: string

  @Column({ comment: '角色描述', nullable: true })
  @ApiProperty({ required: false, description: '角色描述' })
  @IsString({ message: '角色描述必须是字符串' })
  @IsOptional()
  description: string

  @ApiProperty({
    readOnly: true,
    description: '菜单列表',
    type: MenuEntity,
    isArray: true
  })
  @ManyToMany(() => MenuEntity, (menu) => menu.roles)
  @JoinTable()
  menus: MenuEntity[]

  @ManyToMany(() => UserEntity, (user) => user.roles)
  users: UserEntity[]
}
