import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrainingDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'Training name', required: true })
  name: string;
}
