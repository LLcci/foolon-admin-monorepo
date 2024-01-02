import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @CreateDateColumn({ name: 'create_time', comment: '创建时间' })
  createTime: Date;

  @UpdateDateColumn({ name: 'update_time', comment: '更新时间' })
  updateTime: Date;

  @Column({ name: 'create_user_id', comment: '创建用户id' })
  createUserId: string;

  @Column({ nullable: true, name: 'update_user_id', comment: '更新用户id' })
  updateUserId: string;
}
