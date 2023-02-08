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
import { ErrorResponseDto, SuccessResponseDto, CreateModuleDto, UpdateModuleDto } from '../dtos';
import { ModuleService } from '../services/module.service';

@ApiTags('modules')
@Controller('modules')
export class ModuleController {
  constructor(private readonly module: ModuleService) {
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage('Module created successfully.')
  @ApiCreatedResponse({ type: SuccessResponseDto })
  @ApiOperation({ summary: 'Create a new module.' })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  @ApiBody({ description: 'Create a new module', type: CreateModuleDto })
  create(@Body() inputs: CreateModuleDto) {
    return this.module.create(inputs);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Get all modules successfully.')
  @ApiOperation({ summary: 'Get all module.' })
  @ApiOkResponse({ type: SuccessResponseDto })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  getAllModule() {
    return this.module.getAll();
  }

  @Get(':slug')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Get one module successfully.')
  @ApiOperation({ summary: 'Get one module.' })
  @ApiCreatedResponse({ type: SuccessResponseDto })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  @ApiParam({ name: 'slug', type: String, description: 'Module slug', example: 'module-title-mfatf1v6f' })
  getBlog(@Param('slug') moduleSlug: string) {
    return this.module.get(moduleSlug);
  }

  @Put(':slug')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Module updated successfully.')
  @ApiCreatedResponse({ type: SuccessResponseDto })
  @ApiOperation({ summary: 'Update module.' })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  @ApiBody({ description: 'Update module', type: UpdateModuleDto })
  @ApiParam({ name: 'slug', type: String, description: 'Module slug', example: 'module-title-mfatf1v6f' })
  update(@Param('slug') moduleSlug: string, @Body() inputs: UpdateModuleDto) {
    return this.module.update(moduleSlug, inputs);
  }

  @Delete(':slug')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Module deleted successfully.')
  @ApiOperation({ summary: 'Delete module.' })
  @ApiCreatedResponse({ type: SuccessResponseDto })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  @ApiParam({ name: 'slug', type: String, description: 'Module slug', example: 'module-title-mfatf1v6f' })
  remove(@Param('slug') moduleSlug: string) {
    return this.module.remove(moduleSlug);
  }
}
