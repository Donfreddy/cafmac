import { ApiProperty } from '@nestjs/swagger';
import { IResponse } from '../common/interfaces';

export class SuccessResponseDto {
  @ApiProperty({ type: 'number', example: 200 })
  status_code: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  data: IResponse;
}

export class ErrorResponseDto {
  @ApiProperty({ type: 'number', example: 500 })
  status_code: number;

  @ApiProperty({
    type: 'string',
    example: 'Internal Server Error.',
  })
  message: string;
}
