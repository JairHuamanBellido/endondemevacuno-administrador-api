import { Disease } from '@domain/Disease/model/Disease';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';

export class DiseaseAdapter {
  @ApiProperty()
  @Expose()
  public id: string;

  @ApiProperty()
  @Expose()
  public name: string;

  public static newFromDisease(disease: Disease): DiseaseAdapter {
    return plainToInstance(DiseaseAdapter, disease, { excludePrefixes: ['_'] });
  }
}
