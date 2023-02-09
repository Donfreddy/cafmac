import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'Blog title', required: true })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'Some content description', required: true })
  content: string;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({ example: ['Economic'], required: false })
  tags: string[];

  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ type: 'string', example: 'Blog image', required: false, format: "binary" })
  image: Express.Multer.File;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'Finance', required: false })
  category: string;
}

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