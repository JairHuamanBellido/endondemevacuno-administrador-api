import { VaccineCenter } from '@domain/VaccineCenter/model/VaccineCenter';
import { TypeOrmVaccineCenter } from '../entity/TypeOrmVaccineCenter.entity';
import { TypeOrmResponsableMapper } from './TypeOrmResponsableMapper';
import { TypeOrmUbigeoMapper } from './TypeOrmUbigeoMapper';

export class TypeOrmVaccineCenterMapper {
  public static toDomainEntity(
    ormVaccineCenter: TypeOrmVaccineCenter,
  ): VaccineCenter {
    const domainVaccineCenter: VaccineCenter = new VaccineCenter({
      businessHour: ormVaccineCenter.business_hour,
      createdAt: ormVaccineCenter.created_at,
      direction: ormVaccineCenter.direction,
      diris: ormVaccineCenter.diris,
      id: ormVaccineCenter.id,
      isAvailable: ormVaccineCenter.is_available,
      localization: ormVaccineCenter.localization,
      name: ormVaccineCenter.name,
      responsable: ormVaccineCenter.responsable
        ? TypeOrmResponsableMapper.toDomainEntity(ormVaccineCenter.responsable)
        : undefined,
      ubigeo: ormVaccineCenter.ubigeo
        ? TypeOrmUbigeoMapper.toDomainEntity(ormVaccineCenter.ubigeo)
        : undefined,
    });

    return domainVaccineCenter;
  }

  public static toOrmEntity(
    vaccineCenter: VaccineCenter,
  ): TypeOrmVaccineCenter {
    return {
      business_hour: vaccineCenter.businessHour,
      created_at: vaccineCenter.createdAt,
      direction: vaccineCenter.direction,
      diris: vaccineCenter.diris,
      id: vaccineCenter.id,
      is_available: vaccineCenter.isAvailable,
      localization: vaccineCenter.localization,
      name: vaccineCenter.name,
      responsable: vaccineCenter.responsable
        ? TypeOrmResponsableMapper.toOrmEntity(vaccineCenter.responsable)
        : undefined,
      ubigeo: vaccineCenter.ubigeo
        ? TypeOrmUbigeoMapper.toOrmEntity(vaccineCenter.ubigeo)
        : undefined,
    };
  }
}
