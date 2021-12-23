import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class HttpRestApiAuthenticationRequest {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public password: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  public isAdmin: boolean;
}
