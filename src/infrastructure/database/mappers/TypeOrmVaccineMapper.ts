import { Vaccine } from '@domain/Vaccine/model/Vaccine';
import { TypeOrmVaccine } from '../entity/TypeOrmVaccine.entity';
import { TypeOrmDiseaseMapper } from './TypeOrmDiseaseMapper';

export class TypeOrmVaccineMapper {
  public static toDomainEntity(ormVaccine: TypeOrmVaccine): Vaccine {
    const domainVaccine = new Vaccine({
      createdAt: ormVaccine.created_at,
      description: ormVaccine.description,
      id: ormVaccine.id,
      name: ormVaccine.name,
      disease: TypeOrmDiseaseMapper.toDomainEntity(ormVaccine.disease),
    });

    return domainVaccine;
  }

  public static toDomainEntities(ormVaccines: TypeOrmVaccine[]): Vaccine[] {
    return ormVaccines.map((e) => this.toDomainEntity(e));
  }

  public static toOrmEntity(vaccine: Vaccine): TypeOrmVaccine {
    const ormVaccine: TypeOrmVaccine = {
      created_at: vaccine.createdAt,
      description: vaccine.description,
      id: vaccine.id,
      name: vaccine.name,
      disease: TypeOrmDiseaseMapper.toOrmEntity(vaccine.disease),
    };

    return ormVaccine;
  }
}
