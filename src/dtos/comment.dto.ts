import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'Some content description', required: true })
  content: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'Arthur S', required: true })
  author: string;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'Arthur S', required: true })
  email: string;
}

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
}
