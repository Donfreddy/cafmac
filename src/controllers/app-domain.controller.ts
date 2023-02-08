import {
  Body,
  Controller,
  Delete, Get,
  HttpCode,
  HttpStatus,
  Param, ParseIntPipe,
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
import { CreateAppDomainDto, ErrorResponseDto, SuccessResponseDto, UpdateAppDomainDto } from '../dtos';
import { AppDomainService } from '../services/app-domain.service';


@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('app domains')
@Controller('app-domains')
export class AppDomainController {
  constructor(private readonly appDomain: AppDomainService) {
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage('App domain created successfully.')
  @ApiCreatedResponse({ type: SuccessResponseDto })
  @ApiOperation({ summary: 'Create a new app domain.' })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  @ApiBody({ description: 'Create a new app domain', type: CreateAppDomainDto })
  create(@Body() inputs: CreateAppDomainDto) {
    return this.appDomain.create(inputs);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Get all app domain successfully.')
  @ApiOperation({ summary: 'Get all app domains.' })
  @ApiOkResponse({ type: SuccessResponseDto })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  getAllAppDomain() {
    return this.appDomain.getAll();
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('App domain updated successfully.')
  @ApiCreatedResponse({ type: SuccessResponseDto })
  @ApiOperation({ summary: 'Update app domain.' })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  @ApiBody({ description: 'Update app domain', type: UpdateAppDomainDto })
  @ApiParam({ name: 'id', type: Number, description: 'App domain id', example: 3 })
  update(@Param('id', ParseIntPipe) appDomainId: number, @Body() inputs: UpdateAppDomainDto) {
    return this.appDomain.update(appDomainId, inputs);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('App domain deleted successfully.')
  @ApiOperation({ summary: 'Delete app domain.' })
  @ApiCreatedResponse({ type: SuccessResponseDto })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  @ApiParam({ name: 'id', type: Number, description: 'App domain id', example: 2 })
  remove(@Param('id', ParseIntPipe) appDomainId: number) {
    return this.appDomain.remove(appDomainId);
  }
}
