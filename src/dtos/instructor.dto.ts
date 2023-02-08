import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateInstructorDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'Mike', required: true })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'Williams', required: true })
  surname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'Ingénieur en maintenance', required: true })
  title: string;

  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: '', required: false })
  telephone: string;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: '', required: false })
  avatar: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ type: 'string', example: 'Instructor biographic', required: true })
  bio: string;
}

export class UpdateInstructorDto  extends PartialType(CreateInstructorDto) {}
