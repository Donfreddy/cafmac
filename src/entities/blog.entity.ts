import { BaseEntity } from './base.entity';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
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
  is_published: boolean;

  @Column({ default: true })
  is_draft: boolean;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  image: string;

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

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date;
}