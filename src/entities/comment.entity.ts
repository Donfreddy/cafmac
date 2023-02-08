import { BaseEntity } from './base.entity';
import { Entity, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Blog } from './blog.entity';

@Entity('comments')
export class Comment extends BaseEntity {
  @Column({ type: 'text' })
  content: string;

  @Column()
  author: string;

  @Column({ nullable: true })
  email: string;

  @ManyToOne(() => Blog, blog => blog.comments)
  @JoinColumn()
  blog: Blog;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date;
}