import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateModuleDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'Module name', required: true })
  name: string;
}
