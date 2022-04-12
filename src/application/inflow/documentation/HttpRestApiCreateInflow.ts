import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class HttpRestApiCreateInflow {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public vaccineCenterId: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  public peopleEntering: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public createdAt: string;
}
