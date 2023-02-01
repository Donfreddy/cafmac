import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { CourseService } from '../services';
import { CreateCourseDto } from '../dtos';
import { UpdateCourseDto } from '../dtos';
import {
  ApiBearerAuth, ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ResponseMessage } from '../common/decorators';
import { ErrorResponseDto, SuccessResponseDto } from '../dtos';
import { CreateInstructorDto } from '../dtos/create-instructor.dto';
import { InstructorService } from '../services/instructor.service';

@ApiTags('instructors')
@Controller('instructors')
export class InstructorController {
  constructor(private readonly instructor: InstructorService) {
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage('Instructor created successfully.')
  @ApiCreatedResponse({ type: SuccessResponseDto })
  @ApiOperation({ summary: 'Create a new instructor.' })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  @ApiBody({ description: 'Create a new instructor', type: CreateInstructorDto })
  create(@Body() inputs: CreateInstructorDto) {
    return this.instructor.create(inputs);
  }

  @Get()
  findAll() {
    // return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    //  return this.courseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    // return this.courseService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    //  return this.courseService.remove(+id);
  }
}
