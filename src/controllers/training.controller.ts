import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth, ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ResponseMessage } from '../common/decorators';
import { ErrorResponseDto, SuccessResponseDto, UpdateCourseDto } from '../dtos';
import { CreateInstructorDto } from '../dtos/create-instructor.dto';
import { InstructorService } from '../services/instructor.service';
import { TrainingService } from '../services/Training.service';
import { CreateTrainingDto } from '../dtos/create-training.dto';

@ApiTags('trainings')
@Controller('trainings')
export class TrainingController {
  constructor(private readonly training: TrainingService) {
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage('Training created successfully.')
  @ApiCreatedResponse({ type: SuccessResponseDto })
  @ApiOperation({ summary: 'Create a new training.' })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  @ApiBody({ description: 'Create a new training', type: CreateTrainingDto })
  create(@Body() inputs: CreateTrainingDto) {
    return this.training.create(inputs);
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
