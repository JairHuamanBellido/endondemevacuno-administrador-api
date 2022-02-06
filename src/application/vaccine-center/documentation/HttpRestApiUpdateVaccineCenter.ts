import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class HttpRestApiUpdateVaccineCenter {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  startHour: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  endHour: string;
}
