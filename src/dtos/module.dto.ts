import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateModuleDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'Module title', required: true })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Course slug', example: 'title-j3nklqw', required: true })
  course_slug: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({
    description: 'An array of application domain IDs',
    example: [1, 2, 3],
    required: true,
  })
  domains: number[];
}

export class UpdateModuleDto extends PartialType(CreateModuleDto) {}