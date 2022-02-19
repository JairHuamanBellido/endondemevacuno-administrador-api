import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class HttpRestApiUpdateVaccineCenter {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  startHour: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  endHour: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isAvailable: boolean;
}
