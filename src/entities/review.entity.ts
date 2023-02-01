import { BaseEntity } from './base.entity';
import { Entity, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Course } from './course.entity';

@Entity('reviews')
export class Review extends BaseEntity {
  @Column({ type: 'text' })
  content: string;

  @Column({ nullable: true })
  author: string;

  @Column({ default: '0.0' })
  vote: string;

  @ManyToOne(() => Course, course => course.reviews)
  @JoinColumn()
  course: Course;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}