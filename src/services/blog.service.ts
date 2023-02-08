import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog, User } from '../entities';
import { CreateBlogDto, UpdateBlogDto, UpdateCommentDto, CreateCommentDto } from '../dtos';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { SlugProvider } from '../providers/slug.provider';
import { CommentService } from './comment.service';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepo: Repository<Blog>,
    private readonly comment: CommentService,
    private readonly slug: SlugProvider,
  ) {
  }

  async create(inputs: CreateBlogDto, author: User): Promise<Blog> {
    const newBlog = new Blog();
    newBlog.title = inputs.title;
    newBlog.slug = this.slug.slugify(inputs.title);
    newBlog.content = inputs.content;
    newBlog.category = inputs.category;
    newBlog.tags = inputs.tags;
    newBlog.author = author;

    return this.blogRepo.save(newBlog).then((entity) => this.getWhere('id', (entity as Blog).id))
      .catch((error) => Promise.reject(error));
  }

  getAll(options: IPaginationOptions): Promise<Pagination<Blog>> {
    return paginate<Blog>(this.blogRepo, options);
  }

  async get(blogSlug: string): Promise<Blog> {
    const foundBlog = await this.getWhere('slug', blogSlug);
    if (!foundBlog) {
      throw new NotFoundException(`Blog not fount with slug ${blogSlug}`);
    }
    return foundBlog;
  }

  async update(blogSlug: string, inputs: UpdateBlogDto) {
    const foundBlog = await this.get(blogSlug);
    await this.blogRepo.update(foundBlog.id, inputs);
    return await this.get(blogSlug);
  }

  async remove(blogSlug: string) {
    const foundBlog = await this.get(blogSlug);
    await this.blogRepo.softDelete(foundBlog.id);
    return { deleted: true };
  }

  async postComment(blogSlug: string, inputs: CreateCommentDto) {
    const foundBlog = await this.get(blogSlug);
    return this.comment.create(foundBlog, inputs);
  }

  async editComment(blogSlug: string, commentId: number, inputs: UpdateCommentDto) {
    await this.get(blogSlug);
    return this.comment.update(commentId, inputs);
  }

  async deleteComment(blogSlug: string, commentId: number) {
    await this.get(blogSlug);
    return this.comment.remove(commentId);
  }

  async getWhere(key: string, value: any, relations: string[] = []): Promise<Blog | null> {
    return this.blogRepo.findOne({ where: { [key]: value }, relations });
  }
}
