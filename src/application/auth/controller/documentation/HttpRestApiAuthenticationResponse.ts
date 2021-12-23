import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class HttpRestApiAuthenticationResponse {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public token: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public userId: string;
}
