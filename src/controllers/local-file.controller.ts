import {
  Controller,
  Get,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { LocalFileService } from '../services/local-file.service';

@ApiTags('images')
@Controller('images')
@UseInterceptors(ClassSerializerInterceptor)
export default class LocalFilesController {
  constructor(private readonly localFile: LocalFileService) {
  }

  @Get('/:fileName')
  async getImage(
    @Param('fileName') fileName: string,
    @Res() response: Response,
  ) {
    const file = await this.localFile.getFileByName(fileName);
    response.set({
      'Content-Disposition': `inline; filename="${file.filename}"`,
      'Content-Type': file.mimetype,
    }).sendFile(fileName, { root: file.destination });
  }
}
