import { Module } from '@nestjs/common';
import { BlogController } from '../controllers';
import { BlogService } from '../services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog, Comment } from '../entities';
import { SlugProvider } from '../providers/slug.provider';
import { CommentController } from '../controllers/comment.controller';
import { CommentService } from '../services/comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Blog,Comment])],
  controllers: [BlogController, CommentController],
  providers: [BlogService, CommentService, SlugProvider],
})
export class BlogModule {
}