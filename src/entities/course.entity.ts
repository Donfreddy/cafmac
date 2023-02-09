import { BaseEntity } from './base.entity';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToMany, DeleteDateColumn, JoinTable,
} from 'typeorm';
import { Training } from './training.entity';
import { Instructor } from './instructor.entity';
import { Review } from './review.entity';

@Entity('courses')
export class Course extends BaseEntity {
  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'simple-array' })
  prerequisites: string[];

  @Column({ type: 'simple-array' })
  objectives: string[];

  @Column({ type: 'simple-array' })
  kpi: string[];

  @Column()
  duration: number;

  @Column({ type: 'float', default: 0 })
  vote_average: number;

  @Column({ default: 0 })
  graduates: number;

  @Column({ default: 0 })
  registered: number;

  @Column({ default: 0 })
  module_count: number;

  @Column({ default: 0 })
  instructor_count: number;

  @Column({ nullable: true })
  banner: string;

  @Column({ nullable: true })
  public image_id?: number;

  @ManyToOne(() => Training)
  @JoinColumn()
  training: Training;

  @ManyToMany(() => Instructor, instructor => instructor.courses)
  @JoinTable()
  instructors: Instructor[];

  @OneToMany(() => Review, review => review.course)
  @JoinColumn()
  reviews: Review[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date;
}