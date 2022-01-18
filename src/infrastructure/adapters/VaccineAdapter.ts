import { Vaccine } from '@domain/Vaccine/model/Vaccine';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, plainToInstance, Type } from 'class-transformer';
import { DiseaseAdapter } from './DiseaseAdapter';

export class VaccineAdapter {
  @Expose()
  @ApiProperty()
  public id: string;

  @Expose()
  @ApiProperty()
  public name: string;

  @Expose()
  @ApiProperty()
  public description: string;

  @Exclude()
  @ApiProperty()
  public createdAt: Date;

  @Expose()
  @Type(() => DiseaseAdapter)
  @ApiProperty()
  public disease: DiseaseAdapter;

  public static newFromVaccine(vaccine: Vaccine): VaccineAdapter {
    return plainToInstance(VaccineAdapter, vaccine, { excludePrefixes: ['_'] });
  }

  public static newListFromVaccines(vaccines: Vaccine[]): VaccineAdapter[] {
    return vaccines.map((vaccine) => this.newFromVaccine(vaccine));
  }
}
