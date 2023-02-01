import { BaseEntity } from './base.entity';
import { Entity, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('trainings')
export class Training extends BaseEntity {
  @Column({ type: 'text' })
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}