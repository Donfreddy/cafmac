import { BaseEntity } from './base.entity';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToMany, DeleteDateColumn,
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
  number_of_graduate: number;

  @Column({ type: 'simple-array', nullable: true })
  application_domains: string[];

  @Column({ type: 'simple-array', nullable: true })
  modules: string[];

  @ManyToOne(() => Training)
  @JoinColumn()
  training: Training;

  @ManyToMany(() => Instructor, instructor => instructor.courses)
  @JoinColumn()
  instructors: Instructor[];

  @OneToMany(() => Review, review => review.course, { eager: true })
  @JoinColumn()
  reviews: Review[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date;
}