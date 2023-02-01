import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('root')
@Controller()
export class AppController {
  @Get()
  root() {
    return {
      message: 'Welcome to CAFMAC API',
      description: 'RESTful API service for CAFMAC',
      version: 'v1.0.0',
    };
  }
}
