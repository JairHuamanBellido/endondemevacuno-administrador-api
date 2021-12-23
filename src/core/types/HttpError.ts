import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class HttpError {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  message: string;
}
