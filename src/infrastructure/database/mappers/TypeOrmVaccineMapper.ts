import { Vaccine } from '@domain/Vaccine/model/Vaccine';
import { TypeOrmVaccine } from '../entity/TypeOrmVaccine.entity';

export class TypeOrmVaccineMapper {
  public static toDomainEntity(ormVaccine: TypeOrmVaccine): Vaccine {
    const domainVaccine = new Vaccine({
      createdAt: ormVaccine.created_at,
      description: ormVaccine.description,
      id: ormVaccine.id,
      name: ormVaccine.name,
    });

    return domainVaccine;
  }

  public static toOrmEntity(vaccine: Vaccine): TypeOrmVaccine {
    const ormVaccine: TypeOrmVaccine = {
      created_at: vaccine.createdAt,
      description: vaccine.description,
      id: vaccine.id,
      name: vaccine.name,
    };

    return ormVaccine;
  }
}
