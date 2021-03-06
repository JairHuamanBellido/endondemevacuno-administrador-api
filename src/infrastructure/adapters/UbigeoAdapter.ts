import { Ubigeo } from '@domain/Ubigeo/model/Ubigeo';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, plainToInstance } from 'class-transformer';

export class UbigeoAdapter {
  @Expose()
  @ApiProperty()
  public id: string;

  @Expose()
  @ApiProperty()
  public department: string;

  @Expose()
  @ApiProperty()
  public province: string;

  @Expose()
  @ApiProperty()
  public district: string;

  @Exclude()
  public createdAt: Date;

  public static newFromUbigeo(ubigeo: Ubigeo): UbigeoAdapter {
    return plainToInstance(UbigeoAdapter, ubigeo, { excludePrefixes: ['_'] });
  }

  public static newListFromUbigeos(ubigeos: Ubigeo[]): UbigeoAdapter[] {
    return ubigeos.map((ubigeo) => this.newFromUbigeo(ubigeo));
  }
}
