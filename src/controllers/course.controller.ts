import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { CourseService } from '../services';
import { CreateCourseDto, UpdateBlogDto } from '../dtos';
import { UpdateCourseDto } from '../dtos';
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
import { CreateCommentDto } from '../dtos/create-comment.dto';
import { CreateReviewDto } from '../dtos/create-review.dto';

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
    return this.course.get(blogSlug);
  }
  @Put(':slug')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Course updated successfully.')
  @ApiCreatedResponse({ type: SuccessResponseDto })
  @ApiOperation({ summary: 'Update course.' })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  @ApiBody({ description: 'Update course', type: UpdateBlogDto })
  @ApiParam({ name: 'slug', type: String, description: 'Course slug', example: 'course-title-mfatf1v6f' })
  update(@Param('slug') blogSlug: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.course.update(blogSlug, updateBlogDto);
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
}
