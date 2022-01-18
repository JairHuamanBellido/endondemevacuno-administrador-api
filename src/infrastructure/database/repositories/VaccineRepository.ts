import { QueryVaccineDto } from '@domain/Vaccine/dto/infrastructure/QueryVaccineDto';
import { IVaccineRepository } from '@domain/Vaccine/interface/IVaccineRepository';
import { Vaccine } from '@domain/Vaccine/model/Vaccine';
import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { TypeOrmVaccine } from '../entity/TypeOrmVaccine.entity';
import { TypeOrmVaccineMapper } from '../mappers/TypeOrmVaccineMapper';

type VaccineQueryBuilder = SelectQueryBuilder<TypeOrmVaccine>;

@EntityRepository(TypeOrmVaccine)
export abstract class TypeOrmVaccineRepository
  extends Repository<TypeOrmVaccine>
  implements IVaccineRepository
{
  private readonly vaccineAlias: string = 'vaccine';
  public async getBy(searchBy: QueryVaccineDto): Promise<Vaccine> {
    let domainVaccine: Vaccine;

    const query = this.buildAccountQueryBuilder();

    this.extendQueryWithFindByAnyCoincidence(query, searchBy);
    const ormVaccine = await query.getOne();
    if (ormVaccine) {
      domainVaccine = TypeOrmVaccineMapper.toDomainEntity(ormVaccine);
    }

    return domainVaccine;
  }

  public async getAll(): Promise<Vaccine[]> {
    const query = this.buildAccountQueryBuilder();
    const ormVaccines = await query
      .leftJoinAndSelect(`${this.vaccineAlias}.disease`, 'disease')
      .getMany();
    return TypeOrmVaccineMapper.toDomainEntities(ormVaccines);
  }

  private buildAccountQueryBuilder(): VaccineQueryBuilder {
    return this.createQueryBuilder(this.vaccineAlias).select();
  }

  private extendQueryWithFindByAnyCoincidence(
    query: VaccineQueryBuilder,
    by?: QueryVaccineDto,
  ) {
    if (by.id) {
      query.orWhere(`"${this.vaccineAlias}".id = :id`, { id: by.id });
    }
    if (by.description) {
      query.orWhere(`"${this.vaccineAlias}".description = :description`, {
        description: by.description,
      });
    }
    if (by.name) {
      query.orWhere(`"${this.vaccineAlias}".name = :name`, {
        name: by.name,
      });
    }
    if (by.createdAt) {
      query.orWhere(`"${this.vaccineAlias}".created_at = :createdAt`, {
        createdAt: by.createdAt,
      });
    }
  }
}
