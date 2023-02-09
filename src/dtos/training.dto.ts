import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateTrainingDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'Training title', required: true })
  title: string;

  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ type: 'string', example: 'Training banner', required: false, format: 'binary' })
  banner: Express.Multer.File;
}

export class UpdateTrainingDto extends PartialType(CreateTrainingDto) {
}