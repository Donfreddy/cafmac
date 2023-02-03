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
import { ModuleService } from '../services/module.service';
import { CreateModuleDto } from '../dtos/create-module.dto';

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
