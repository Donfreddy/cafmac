import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'Some content description', required: true })
  content: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'Arthur S', required: true })
  author: string;
}
