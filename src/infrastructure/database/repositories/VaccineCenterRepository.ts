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

  private buildAccountQueryBuilder(): VaccineCenterQueryBuilder {
    return this.createQueryBuilder(this.vaccineCenterAlias).select();
  }

  private extendQueryWithFindByAnyCoincidence(
    query: VaccineCenterQueryBuilder,
    by?: QueryVaccineCenterDto,
  ) {
    query.leftJoinAndSelect('vaccine_center.responsable', 'responsable');

    if (by.id) {
      query.orWhere(`"${this.vaccineCenterAlias}".id = :id`, { id: by.id });
    }
    if (by.responsableId) {
      query.andWhere('responsable.id = :responsableId', {
        responsableId: by.responsableId,
      });
    }
  }
}
