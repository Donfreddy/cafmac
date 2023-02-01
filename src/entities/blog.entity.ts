import { BaseEntity } from './base.entity';
import { Entity, Column, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Comment } from './comment.entity';

@Entity('blogs')
export class Blog extends BaseEntity {
  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'simple-array' })
  tags: string[];

  @Column({ default: false })
  published: boolean;

  @Column({ nullable: true })
  category: string;

  @OneToMany(() => Comment, comment => comment.blog, { eager: true })
  @JoinColumn()
  comments: Comment[];

  @ManyToOne(() => User, { eager: true })
  @JoinColumn()
  author: User;

  @Column({ nullable: true })
  publish_at: Date;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}