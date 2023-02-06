import { Module } from '@nestjs/common';
import { BlogController } from '../controllers';
import { BlogService } from '../services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog, Comment } from '../entities';
import { SlugProvider } from '../providers/slug.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Blog,Comment])],
  controllers: [BlogController],
  providers: [BlogService, SlugProvider],
})
export class BlogModule {
}