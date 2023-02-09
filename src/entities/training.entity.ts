import { BaseEntity } from './base.entity';
import { Entity, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('trainings')
export class Training extends BaseEntity {
  @Column({ type: 'text' })
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ default: 0 })
  course_count: number;

  @Column({ nullable: true })
  banner: string;

  @Column({ nullable: true })
  public banner_id?: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date;
}