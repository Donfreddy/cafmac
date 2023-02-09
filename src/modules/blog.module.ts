import { Module } from '@nestjs/common';
import { BlogController } from '../controllers';
import { BlogService } from '../services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog, Comment } from '../entities';
import { SlugProvider } from '../providers/slug.provider';
import { CommentController } from '../controllers/comment.controller';
import { CommentService } from '../services/comment.service';
import { LocalFile } from '../entities/local-file.entity';
import { LocalFileService } from '../services/local-file.service';

@Module({
  imports: [TypeOrmModule.forFeature([Blog,Comment, LocalFile])],
  controllers: [BlogController, CommentController],
  providers: [BlogService, CommentService, SlugProvider, LocalFileService],
})
export class BlogModule {
}