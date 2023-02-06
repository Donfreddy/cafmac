import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateBlogDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'Blog title', required: true })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'Some content description', required: true })
  content: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'Finance', required: false })
  category: string;
}