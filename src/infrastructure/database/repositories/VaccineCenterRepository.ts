import { QueryVaccineCenterDto } from '@domain/VaccineCenter/dto/infrastructure/QueryVaccineCenterDto';
import { IVaccineCenterRepository } from '@domain/VaccineCenter/interface/IVaccineCenterRepository.interface';
import { VaccineCenter } from '@domain/VaccineCenter/model/VaccineCenter';
import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { TypeOrmVaccineCenter } from '../entity/TypeOrmVaccineCenter.entity';
import { TypeOrmVaccineCenterMapper } from '../mappers/TypeOrmVaccineCenterMapper';

type VaccineCenterQueryBuilder = SelectQueryBuilder<TypeOrmVaccineCenter>;

@EntityRepository(TypeOrmVaccineCenter)
export abstract class TypeormVaccinateCenterRepository
  extends Repository<TypeOrmVaccineCenter>
  implements IVaccineCenterRepository
{
  private readonly vaccineCenterAlias: string = 'vaccine_center';

  public async getBy(searchBy: QueryVaccineCenterDto): Promise<VaccineCenter> {
    let domainVaccineCenter: VaccineCenter;
    const query: VaccineCenterQueryBuilder = this.buildAccountQueryBuilder();
    this.extendQueryWithFindByAnyCoincidence(query, searchBy);

    const ormVaccineCenter: TypeOrmVaccineCenter = await query.getOne();
    if (ormVaccineCenter) {
      domainVaccineCenter =
        TypeOrmVaccineCenterMapper.toDomainEntity(ormVaccineCenter);
    }
    return domainVaccineCenter;
  }

  public async createEntity(
    vaccineCenter: VaccineCenter,
  ): Promise<VaccineCenter> {
    const ormVaccineCenter =
      TypeOrmVaccineCenterMapper.toOrmEntity(vaccineCenter);
    const newEntity = await this.createQueryBuilder(this.vaccineCenterAlias)
      .insert()
      .into(TypeOrmVaccineCenter)
      .values([ormVaccineCenter])
      .execute();

    const query: VaccineCenterQueryBuilder = this.buildAccountQueryBuilder();
    this.extendQueryWithFindByAnyCoincidence(query, {
      id: newEntity.identifiers[0].id,
    });

    const ormEntity: TypeOrmVaccineCenter = await query.getOne();
    return TypeOrmVaccineCenterMapper.toDomainEntity(ormEntity);
  }

  public async updateEntity(vaccineCenter: VaccineCenter): Promise<void> {
    const ormVaccineCenter =
      TypeOrmVaccineCenterMapper.toOrmEntity(vaccineCenter);
    await this.createQueryBuilder(this.vaccineCenterAlias)
      .update(TypeOrmVaccineCenter)
      .set(ormVaccineCenter)
      .where('id = :id', { id: ormVaccineCenter.id })
      .execute();
  }

  private buildAccountQueryBuilder(): VaccineCenterQueryBuilder {
    return this.createQueryBuilder(this.vaccineCenterAlias).select();
  }

  private extendQueryWithFindByAnyCoincidence(
    query: VaccineCenterQueryBuilder,
    by?: QueryVaccineCenterDto,
  ) {
    query.leftJoinAndSelect('vaccine_center.responsable', 'responsable');
    query.leftJoinAndSelect('vaccine_center.ubigeo', 'ubigeo');
    if (by.id) {
      query.orWhere(`"${this.vaccineCenterAlias}".id = :id`, { id: by.id });
    }
    if (by.responsableId) {
      query.andWhere('responsable.id = :responsableId', {
        responsableId: by.responsableId,
      });
    }
    if (by.name) {
      query.andWhere(`${this.vaccineCenterAlias}.name = :name`, {
        name: by.name,
      });
    }
  }
}
