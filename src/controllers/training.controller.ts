import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put, UploadedFile,
  UseGuards, UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth, ApiBody, ApiConsumes,
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
import LocalFilesInterceptor from '../common/interceptors/local-files.interceptor';

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
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(LocalFilesInterceptor({
    fieldName: 'image',
    path: '/images',
    fileFilter: (_, file, cb) => {
      if (!file.mimetype.includes('image')) {
        return cb(new BadRequestException('Provide a valid image'), false);
      }
      cb(null, true);
    },
  }))
  create(@Body() inputs: CreateTrainingDto, @UploadedFile('file') banner: Express.Multer.File) {
    return this.training.create(inputs, {
      path: banner.path,
      filename: banner.filename,
      destination: banner.destination,
      mimetype: banner.mimetype,
    });
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
