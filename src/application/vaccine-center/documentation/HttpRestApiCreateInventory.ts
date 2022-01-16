import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class HttpRestApiCreateInventory {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  vaccineId: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
