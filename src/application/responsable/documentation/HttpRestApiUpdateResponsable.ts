import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class HttpRestApiUpdateResponsable {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public id: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  public name?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  public lastname?: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  public isEnabled?: boolean;
}
