import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
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
import {
  CreateTrainingDto,
  ErrorResponseDto,
  SuccessResponseDto,
  UpdateBlogDto,
  UpdateTrainingDto,
} from '../dtos';
import { TrainingService } from '../services/Training.service';

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
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Get all trainings successfully.')
  @ApiOperation({ summary: 'Get all training.' })
  @ApiOkResponse({ type: SuccessResponseDto })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  getAllTraining() {
    return this.training.getAll();
  }

  @Get(':slug')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Get one training successfully.')
  @ApiOperation({ summary: 'Get one training.' })
  @ApiCreatedResponse({ type: SuccessResponseDto })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  @ApiParam({ name: 'slug', type: String, description: 'Training slug', example: 'training-title-mfatf1v6f' })
  getBlog(@Param('slug') trainingSlug: string) {
    return this.training.get(trainingSlug);
  }

  @Put(':slug')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Training updated successfully.')
  @ApiCreatedResponse({ type: SuccessResponseDto })
  @ApiOperation({ summary: 'Update training.' })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  @ApiBody({ description: 'Update training', type: UpdateBlogDto })
  @ApiParam({ name: 'slug', type: String, description: 'Training slug', example: 'training-title-mfatf1v6f' })
  update(@Param('slug') trainingSlug: string, @Body() inputs: UpdateTrainingDto) {
    return this.training.update(trainingSlug, inputs);
  }

  @Delete(':slug')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Training deleted successfully.')
  @ApiOperation({ summary: 'Delete module.' })
  @ApiCreatedResponse({ type: SuccessResponseDto })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  @ApiParam({ name: 'slug', type: String, description: 'Training slug', example: 'training-title-mfatf1v6f' })
  remove(@Param('slug') trainingSlug: string) {
    return this.training.remove(trainingSlug);
  }
}
