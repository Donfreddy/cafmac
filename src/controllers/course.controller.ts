import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  Put, ParseIntPipe,
} from '@nestjs/common';
import { CourseService } from '../services';
import {
  CreateCommentDto,
  CreateCourseDto,
  CreateReviewDto,
  UpdateBlogDto,
  UpdateCourseDto,
  UpdateReviewDto,
} from '../dtos';
import {
  ApiBearerAuth, ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse, ApiOkResponse,
  ApiOperation, ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ResponseMessage } from '../common/decorators';
import { ErrorResponseDto, SuccessResponseDto } from '../dtos';

@ApiTags('courses')
@Controller('courses')
export class CourseController {
  constructor(private readonly course: CourseService) {
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage('Course created successfully.')
  @ApiCreatedResponse({ type: SuccessResponseDto })
  @ApiOperation({ summary: 'Create a new course.' })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  @ApiBody({ description: 'Create a new course', type: CreateCourseDto })
  create(@Body() inputs: CreateCourseDto) {
    return this.course.create(inputs);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Get all course successfully.')
  @ApiOperation({ summary: 'Get all course.' })
  @ApiOkResponse({ type: SuccessResponseDto })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  getAllCourse() {
    const opt = {
      page: 1,
      limit: 20,
      route: 'http://localhost:3000/api/courses',
    };
    return this.course.getAll(opt);
  }

  @Get(':slug')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Get one course successfully.')
  @ApiOperation({ summary: 'Get one course.' })
  @ApiCreatedResponse({ type: SuccessResponseDto })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  @ApiParam({ name: 'slug', type: String, description: 'Course slug', example: 'course-title-mfatf1v6f' })
  getBlog(@Param('slug') blogSlug: string) {
    return this.course.getOne(blogSlug);
  }

  @Put(':slug')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Course updated successfully.')
  @ApiCreatedResponse({ type: SuccessResponseDto })
  @ApiOperation({ summary: 'Update course.' })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  @ApiBody({ description: 'Update course', type: UpdateCourseDto })

  @ApiParam({ name: 'slug', type: String, description: 'Course slug', example: 'course-title-mfatf1v6f' })
  update(@Param('slug') blogSlug: string, @Body() inputs: UpdateCourseDto) {
    return this.course.update(blogSlug, inputs);
  }

  @Delete(':slug')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Course deleted successfully.')
  @ApiOperation({ summary: 'Delete course.' })
  @ApiCreatedResponse({ type: SuccessResponseDto })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  @ApiParam({ name: 'slug', type: String, description: 'Course slug', example: 'course-title-mfatf1v6f' })
  remove(@Param('slug') blogSlug: string) {
    return this.course.remove(blogSlug);
  }

  @Post(':slug/reviews')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Course reviewed successfully.')
  @ApiOperation({ summary: 'Review course.' })
  @ApiCreatedResponse({ type: SuccessResponseDto })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  @ApiBody({ description: 'Review course', type: CreateReviewDto })
  @ApiParam({ name: 'slug', type: String, description: 'Course slug', example: 'course-title-mfatf1v6f' })
  postComment(@Param('slug') blogSlug: string, @Body() inputs: CreateReviewDto) {
    return this.course.postReview(blogSlug, inputs);
  }


  @Put(':slug/reviews/:id')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Comment updated successfully.')
  @ApiOperation({ summary: 'Update comment.' })
  @ApiCreatedResponse({ type: SuccessResponseDto })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  @ApiBody({ description: 'Update review', type: CreateCommentDto })
  @ApiParam({ name: 'slug', type: String, description: 'Course slug', example: 'course-title-mfatf1v6f' })
  @ApiParam({ name: 'id', description: 'Review ID', example: 32 })
  editComment(
    @Param('slug') couseSlug: string,
    @Param('id', ParseIntPipe) reviewId: number,
    @Body() inputs: UpdateReviewDto,
  ) {
   //  return this.course.(blogSlug, commentId, inputs);
  }

  @Delete(':slug/reviews/:id')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Review deleted successfully.')
  @ApiOperation({ summary: 'Delete review.' })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  @ApiParam({ name: 'slug', description: 'Blog slug', example: 'course-title-mfatf1v6f' })
  @ApiParam({ name: 'id', description: 'Review ID', example: 32 })
  deleteComment(@Param('slug') courseSlug: string, @Param('id', ParseIntPipe) reviewId: number) {
    // return this.blog.deleteComment(blogSlug, commentId);
  }
}
