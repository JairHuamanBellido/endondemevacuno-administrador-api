import { Responsable } from '@domain/Responsable/model/Responsable';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, plainToClass, Type } from 'class-transformer';
import { AccountAdapter } from './AccountAdapter';

export class ResponsableAdapter {
  @Expose()
  @ApiProperty()
  public id: string;

  @Expose()
  @ApiProperty()
  public dni: string;

  @Expose()
  @ApiProperty()
  public name: string;

  @Expose()
  @ApiProperty()
  public lastname: string;

  @Expose()
  @ApiProperty()
  public isEnabled: boolean;

  @Exclude()
  public createdAt: Date;

  @Expose()
  @Type(() => AccountAdapter)
  @ApiProperty()
  public account: AccountAdapter;

  public static newFromResponsable(
    responsable: Responsable,
  ): ResponsableAdapter {
    return plainToClass(ResponsableAdapter, responsable, {
      excludePrefixes: ['_'],
    });
  }

  public static newListFromResponsables(
    responsables: Responsable[],
  ): ResponsableAdapter[] {
    return responsables.map((responsable) =>
      this.newFromResponsable(responsable),
    );
  }
}
