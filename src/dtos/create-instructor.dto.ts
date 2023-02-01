import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: '', required: false })
  avatar: string;
}
