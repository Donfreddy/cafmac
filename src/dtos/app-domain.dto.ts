import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateAppDomainDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'Application domain name', required: true })
  name: string;
}

export class UpdateAppDomainDto extends PartialType(CreateAppDomainDto) {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'Application domain name', required: true })
  name: string;
}