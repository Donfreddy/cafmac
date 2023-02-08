import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateTrainingDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'Training title', required: true })
  title: string;
}

export class UpdateTrainingDto extends PartialType(CreateTrainingDto) {
}