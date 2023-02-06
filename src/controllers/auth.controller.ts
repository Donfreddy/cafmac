import { Body, Controller, HttpCode, HttpStatus, Post, UseInterceptors } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from '../dtos';
import { AuthService } from '../services';
import { ResponseMessage } from '../common/decorators';
import { ErrorResponseDto, SuccessResponseDto } from '../dtos';
import { LoginDto } from '../dtos';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {
  }

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage('User registered successfully.')
  @ApiCreatedResponse({ type: SuccessResponseDto })
  @ApiOperation({ summary: 'Register a new user.' })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  @ApiBody({ description: 'Register a new user', type: CreateUserDto })
  async registerUser(@Body() inputs: CreateUserDto): Promise<any> {
    return await this.auth.register(inputs);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('User logged in successfully.')
  @ApiOkResponse({ type: SuccessResponseDto })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  @ApiOperation({ summary: 'Login user with his email and password.' })
  @ApiBody({ description: 'Login user in to the system', type: LoginDto })
  async loginUser(@Body() inputs: LoginDto): Promise<any> {
    return await this.auth.login(inputs);
  }
}
