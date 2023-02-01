import { BaseEntity } from './base.entity';
import { Entity, Column, JoinColumn, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import { Course } from './course.entity';

@Entity('instructors')
export class Instructor extends BaseEntity {
  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  title: string;

  @Column()
  avatar: string;

  @ManyToMany(() => Course, course => course.instructors)
  @JoinColumn()
  courses: Course[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}