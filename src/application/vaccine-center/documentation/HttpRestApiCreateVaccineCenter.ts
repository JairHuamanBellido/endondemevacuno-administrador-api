import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { HttpRestApiCreateInventory } from './HttpRestApiCreateInventory';

export class HttpRestApiCreateVaccineCenter {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  direction: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  businessHour: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  localization: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  diris: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  ubigeoId: string;

  @ApiProperty({ type: [HttpRestApiCreateInventory] })
  @IsArray({})
  @IsNotEmpty()
  vaccines: HttpRestApiCreateInventory[];

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  capacity: number;
}
