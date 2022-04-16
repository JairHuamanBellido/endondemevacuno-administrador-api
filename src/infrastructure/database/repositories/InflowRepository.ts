import { QueryInflowDto } from '@domain/Inflow/dto/infrastructure/QueryInflowDto';
import { IInflowRepository } from '@domain/Inflow/interface/IInflowRepository.interface';
import { Inflow } from '@domain/Inflow/model/Inflow';
import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { TypeOrmInflow } from '../entity/TypeOrmInflow.entity';
import { TypeOrmInflowMapper } from '../mappers/TypeOrmInflowMapper';

type InventoryQueryBuilder = SelectQueryBuilder<TypeOrmInflow>;

@EntityRepository(TypeOrmInflow)
export abstract class TypeOrmInfloRepository
  extends Repository<TypeOrmInflow>
  implements IInflowRepository
{
  private readonly inflowAlias: string = 'inflow';

  public async findBy(searchBy: QueryInflowDto): Promise<Inflow[]> {
    const query = this.buildInventoryQueryBuilder();
    this.extendQueryWithFindByAnyCoincidence(query, searchBy);
    const ormInflow = await query.getMany();

    return TypeOrmInflowMapper.toDomainsEntities(ormInflow);
  }

  public async getBetweenDates(searchBy: QueryInflowDto): Promise<Inflow[]> {
    const query = this.buildInventoryQueryBuilder();
    this.extendQueryWithFindByCoincidence(query, searchBy);
    const ormInflow = await query.getMany();
    return TypeOrmInflowMapper.toDomainsEntities(ormInflow);
  }
  private buildInventoryQueryBuilder(): InventoryQueryBuilder {
    return this.createQueryBuilder(this.inflowAlias).select();
  }

  private extendQueryWithFindByCoincidence(
    query: InventoryQueryBuilder,
    by?: QueryInflowDto,
  ) {
    query.leftJoinAndSelect(
      `${this.inflowAlias}.vaccine_center`,
      'vaccine_center',
    );
    if (by.vaccineCenterId && by.startDate && by.endDate) {
      query.andWhere(
        `${this.inflowAlias}.vaccine_center.id = :vaccine_center_id`,
        {
          vaccine_center_id: by.vaccineCenterId,
        },
      );
      query.andWhere(`"${this.inflowAlias}".created_at > :startDate`, {
        startDate: new Date(by.startDate),
      });

      query.andWhere(`"${this.inflowAlias}".created_at < :endDate`, {
        endDate: new Date(by.endDate),
      });
    }
  }
  private extendQueryWithFindByAnyCoincidence(
    query: InventoryQueryBuilder,
    by?: QueryInflowDto,
  ) {
    query.leftJoinAndSelect(
      `${this.inflowAlias}.vaccine_center`,
      'vaccine_center',
    );

    if (by.id) {
      query.orWhere(`"${this.inflowAlias}".id = :id`, { id: by.id });
    }
    if (by.startDate) {
      query.orWhere(`"${this.inflowAlias}".created_at > :startDate`, {
        startDate: new Date(by.startDate),
      });
    }
    if (by.endDate) {
      query.orWhere(`"${this.inflowAlias}".created_at < :endDate`, {
        endDate: new Date(by.endDate),
      });
    }
    if (by.vaccineCenterId) {
      query.orWhere(
        `${this.inflowAlias}.vaccine_center.id = :vaccine_center_id`,
        {
          vaccine_center_id: by.vaccineCenterId,
        },
      );
    }
  }

  public async createEntity(inflow: Inflow): Promise<Inflow> {
    const ormInflow = TypeOrmInflowMapper.toOrmEntity(inflow);
    const newEntity = await this.createQueryBuilder(this.inflowAlias)
      .insert()
      .into(TypeOrmInflow)
      .values([ormInflow])
      .execute();

    const query = this.buildInventoryQueryBuilder();
    this.extendQueryWithFindByAnyCoincidence(query, {
      id: newEntity.identifiers[0].id,
    });

    const queryResult = await query.getOne();
    return TypeOrmInflowMapper.toDomainEntity(queryResult);
  }
}
