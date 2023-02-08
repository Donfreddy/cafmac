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
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth, ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse, ApiOkResponse,
  ApiOperation, ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ResponseMessage } from '../common/decorators';
import { CreateInstructorDto, ErrorResponseDto, SuccessResponseDto, UpdateInstructorDto } from '../dtos';
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
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Get all instructor successfully.')
  @ApiOperation({ summary: 'Get all instructors.' })
  @ApiOkResponse({ type: SuccessResponseDto })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  getAllModule() {
    return this.instructor.getAll();
  }

  @Get(':slug')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Get one instructor successfully.')
  @ApiOperation({ summary: 'Get one instructor.' })
  @ApiCreatedResponse({ type: SuccessResponseDto })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  @ApiParam({ name: 'slug', type: String, description: 'Instructor slug', example: 'instructor-title-mfatf1v6f' })
  getBlog(@Param('slug') instructorSlug: string) {
    return this.instructor.get(instructorSlug);
  }

  @Put(':slug')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Instructor updated successfully.')
  @ApiCreatedResponse({ type: SuccessResponseDto })
  @ApiOperation({ summary: 'Update instructor.' })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  @ApiBody({ description: 'Update instructor', type: UpdateInstructorDto })
  @ApiParam({ name: 'slug', type: String, description: 'Instructor slug', example: 'instructor-title-mfatf1v6f' })
  update(@Param('slug') instructorSlug: string, @Body() inputs: UpdateInstructorDto) {
    return this.instructor.update(instructorSlug, inputs);
  }

  @Delete(':slug')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Instructor deleted successfully.')
  @ApiOperation({ summary: 'Delete instructor.' })
  @ApiCreatedResponse({ type: SuccessResponseDto })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  @ApiParam({ name: 'slug', type: String, description: 'Instructor slug', example: 'instructor-title-mfatf1v6f' })
  remove(@Param('slug') moduleSlug: string) {
    return this.instructor.remove(moduleSlug);
  }
}
