import { Ubigeo } from '@domain/Ubigeo/model/Ubigeo';
import { TypeOrmUbigeo } from '../entity/TypeOrmUbigeo.entity';

export class TypeOrmUbigeoMapper {
  public static toDomainEntity(ormUbigeo: TypeOrmUbigeo): Ubigeo {
    const domainUbigeo: Ubigeo = new Ubigeo({
      createdAt: ormUbigeo.created_at,
      department: ormUbigeo.department,
      district: ormUbigeo.district,
      id: ormUbigeo.id,
      province: ormUbigeo.province,
    });
    return domainUbigeo;
  }

  public static toOrmEntity(ubigeo: Ubigeo): TypeOrmUbigeo {
    const ormUbigeo: TypeOrmUbigeo = {
      created_at: ubigeo.createdAt,
      department: ubigeo.department,
      district: ubigeo.district,
      id: ubigeo.id,
      province: ubigeo.province,
    };

    return ormUbigeo;
  }

  public static toDomainEntities(ormgUbigeo: TypeOrmUbigeo[]): Ubigeo[] {
    return ormgUbigeo.map((val) => this.toDomainEntity(val))
  }
}
