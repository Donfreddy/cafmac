import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog, Comment } from '../entities';
import { Repository } from 'typeorm';
import * as _ from 'lodash';
import { CreateCommentDto, UpdateCommentDto } from '../dtos';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
  ) {
  }

  async create(blog: Blog, inputs: CreateCommentDto) {

    const newComment = new Comment();
    newComment.content = inputs.content;
    newComment.author = inputs.author;
    newComment.blog = blog;
    await this.commentRepo.save(newComment);

    return { comment: _.pick(newComment, ['id', 'content', 'author', 'email']) };
  }

  getAll(): Promise<Comment[]> {
    return this.commentRepo.find();
  }

  async get(commentId: number): Promise<Comment> {
    const foundComment = await this.getWhere('id', commentId);
    if (!foundComment) {
      throw new NotFoundException(`Comment not fount with id #${commentId}`);
    }
    return foundComment;
  }

  async update(commentId: number, inputs: UpdateCommentDto) {
    const foundComment = await this.get(commentId);
    await this.commentRepo.update(foundComment.id, inputs);
    return await this.get(commentId);
  }

  async remove(commentId: number) {
    const foundInstructor = await this.get(commentId);
    await this.commentRepo.softDelete(foundInstructor.id);
    return { deleted: true };
  }

  async getWhere(key: string, value: any, relations: string[] = []): Promise<Comment | null> {
    return this.commentRepo.findOne({ where: { [key]: value }, relations });
  }
}
