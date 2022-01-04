import { ApiProperty } from '@nestjs/swagger';

export class HttpRestApiFlagResponse {
  @ApiProperty()
  flag: boolean;
}
