import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'Some content description', required: true })
  content: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: '4.7', required: true })
  rating: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'Arthur S', required: true })
  author: string;
}
