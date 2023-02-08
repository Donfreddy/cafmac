import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'John', required: true })
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'Doe', required: true })
  last_name: string;

  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value?.toLowerCase().trim())
  @ApiProperty({ type: 'string', example: 'johndoe@gmail.com', required: true })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({ type: 'string', example: 'Password@123', required: true })
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
}