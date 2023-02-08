import { BaseEntity } from './base.entity';
import { Entity, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Course } from './course.entity';

@Entity('reviews')
export class Review extends BaseEntity {
  @Column({ type: 'text' })
  content: string;

  @Column()
  author: string;

  @Column({ nullable: true })
  email: string;

  @Column({ default: '0.0' })
  rating: string;

  @ManyToOne(() => Course, course => course.reviews)
  @JoinColumn()
  course: Course;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date;
}