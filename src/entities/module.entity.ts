import { BaseEntity } from './base.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Course } from './course.entity';

@Entity('modules')
export class Module extends BaseEntity {
  @Column({ type: 'text' })
  title: string;

  @Column({ unique: true })
  slug: string;

  @ManyToOne(() => Course)
  @JoinColumn()
  course: Course;

  @Column({ type: 'simple-array' })
  domains: string[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date;
}
