import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param, ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BlogService } from '../services';
import { GetUser, ResponseMessage } from '../common/decorators';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse, ApiOkResponse,
  ApiOperation, ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateBlogDto, CreateCommentDto, ErrorResponseDto, SuccessResponseDto, UpdateBlogDto } from '../dtos';
import { User } from '../entities';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('blogs')
@Controller('blogs')
export class BlogController {
  constructor(private readonly blog: BlogService) {
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage('Blog created successfully.')
  @ApiCreatedResponse({ type: SuccessResponseDto })
  @ApiOperation({ summary: 'Create a new blog.' })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  @ApiBody({ description: 'Create a new blog', type: CreateBlogDto })
  createBlog(
    @GetUser() user: User,
    @Body() createBlogDto: CreateBlogDto,
  ) {
    return this.blog.create(createBlogDto, user);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Get all blogs successfully.')
  @ApiOperation({ summary: 'Get all blog.' })
  @ApiOkResponse({ type: SuccessResponseDto })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  getAllBlog() {
    const opt = {
      page: 1,
      limit: 20,
      route: 'http://localhost:3000/api/blogs',
    };
    return this.blog.getAll();
  }

  @Get('/published')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Get all published blogs successfully.')
  @ApiOperation({ summary: 'Get all published  blog.' })
  @ApiOkResponse({ type: SuccessResponseDto })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  getAllPublishedBlog() {
    const opt = {
      page: 1,
      limit: 20,
      route: 'http://localhost:3000/api/blogs',
    };
    return this.blog.getAllPublished(opt);
  }

  @Get(':slug')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Get one blog successfully.')
  @ApiOperation({ summary: 'Get one blog.' })
  @ApiCreatedResponse({ type: SuccessResponseDto })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  @ApiParam({ name: 'slug', type: String, description: 'Blog slug', example: 'blog-title-mfatf1v6f' })
  getBlog(@Param('slug') blogSlug: string) {
    return this.blog.get(blogSlug);
  }

  @Put(':slug')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Blog updated successfully.')
  @ApiCreatedResponse({ type: SuccessResponseDto })
  @ApiOperation({ summary: 'Update blog.' })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  @ApiBody({ description: 'Update blog', type: UpdateBlogDto })
  @ApiParam({ name: 'slug', type: String, description: 'Blog slug', example: 'blog-title-mfatf1v6f' })
  update(@Param('slug') blogSlug: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blog.update(blogSlug, updateBlogDto);
  }

  @Delete(':slug')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Blog deleted successfully.')
  @ApiOperation({ summary: 'Delete blog.' })
  @ApiCreatedResponse({ type: SuccessResponseDto })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  @ApiParam({ name: 'slug', type: String, description: 'Blog slug', example: 'blog-title-mfatf1v6f' })
  remove(@Param('slug') blogSlug: string) {
    return this.blog.remove(blogSlug);
  }

  @Post(':slug/comments')
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage('Comment created successfully.')
  @ApiOperation({ summary: 'Post comment.' })
  @ApiCreatedResponse({ type: SuccessResponseDto })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  @ApiBody({ description: 'Post comment', type: CreateCommentDto })
  @ApiParam({ name: 'slug', type: String, description: 'Blog slug', example: 'blog-title-mfatf1v6f' })
  postComment(@Param('slug') blogSlug: string, @Body() inputs: CreateCommentDto) {
    return this.blog.postComment(blogSlug, inputs);
  }

  @Put(':slug/comments/:id')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Comment updated successfully.')
  @ApiOperation({ summary: 'Update comment.' })
  @ApiCreatedResponse({ type: SuccessResponseDto })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  @ApiBody({ description: 'Update comment', type: CreateCommentDto })
  @ApiParam({ name: 'slug', type: String, description: 'Blog slug', example: 'blog-title-mfatf1v6f' })
  @ApiParam({ name: 'id', description: 'Comment ID', example: 32 })
  editComment(
    @Param('slug') blogSlug: string,
    @Param('id', ParseIntPipe) commentId: number,
    @Body() inputs: CreateCommentDto,
  ) {
    return this.blog.editComment(blogSlug, commentId, inputs);
  }

  @Delete(':slug/comments/:id')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Comment deleted successfully.')
  @ApiOperation({ summary: 'Delete comment.' })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  @ApiParam({ name: 'slug', description: 'Blog slug', example: 'blog-title-mfatf1v6f' })
  @ApiParam({ name: 'id', description: 'Comment ID', example: 32 })
  deleteComment(@Param('slug') blogSlug: string, @Param('id', ParseIntPipe) commentId: number) {
    return this.blog.deleteComment(blogSlug, commentId);
  }
}
