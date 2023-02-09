import { BaseEntity } from './base.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  DeleteDateColumn,
  JoinTable,
} from 'typeorm';
import { Course } from './course.entity';

@Entity('instructors')
export class Instructor extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  surname: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  telephone: string;

  @ManyToMany(() => Course, course => course.instructors)
  @JoinTable()
  courses: Course[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date;
}