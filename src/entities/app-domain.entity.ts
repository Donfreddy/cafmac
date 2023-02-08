import { BaseEntity } from './base.entity';
import { Entity, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('app-domains')
export class AppDomain extends BaseEntity {
  @Column({ type: 'text' })
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date;
}
