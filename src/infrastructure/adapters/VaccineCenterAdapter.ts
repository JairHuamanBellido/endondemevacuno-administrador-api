import { VaccineCenter } from '@domain/VaccineCenter/model/VaccineCenter';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance, Type } from 'class-transformer';
import { InventoryAdapter } from './InventoryAdapter';
import { UbigeoAdapter } from './UbigeoAdapter';

export class VaccineCenterAdapter {
  @Expose()
  @ApiProperty()
  public id: string;
  @Expose()
  @ApiProperty()
  public name: string;
  @Expose()
  @ApiProperty()
  public direction: string;
  @Expose()
  @ApiProperty()
  public businessHour: string;
  @Expose()
  @ApiProperty()
  public isAvailable: boolean;
  @Expose()
  @ApiProperty()
  public localization: string;
  @Expose()
  @ApiProperty()
  public diris: string;

  @Expose()
  @ApiProperty()
  public createdAt: Date;

  @Expose()
  @Type(() => InventoryAdapter)
  @ApiProperty()
  public inventories: InventoryAdapter[];

  @Expose()
  @Type(() => UbigeoAdapter)
  @ApiProperty()
  public ubigeo: UbigeoAdapter[];

  public static newFromVaccineCenter(vaccineCenter: VaccineCenter) {
    return plainToInstance(VaccineCenterAdapter, vaccineCenter, {
      excludePrefixes: ['_'],
    });
  }

  public static newListFromVaccineCenter(vaccineCenters: VaccineCenter[]) {
    return vaccineCenters.map((vaccineCenter) =>
      this.newFromVaccineCenter(vaccineCenter),
    );
  }
}
