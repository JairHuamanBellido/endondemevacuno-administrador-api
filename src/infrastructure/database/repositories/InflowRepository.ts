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

  private buildInventoryQueryBuilder(): InventoryQueryBuilder {
    return this.createQueryBuilder(this.inflowAlias).select();
  }

  private extendQueryWithFindByAnyCoincidence(
    query: InventoryQueryBuilder,
    by?: QueryInflowDto,
  ) {
    if (by.id) {
      query.orWhere(`"${this.inflowAlias}".id = :id`, { id: by.id });
    }
    if (by.startDate) {
      query.orWhere(`"${this.inflowAlias}".created_at > :startDate`, {
        startDate: by.startDate,
      });
    }
    if (by.endDate) {
      query.orWhere(`"${this.inflowAlias}".created_at < :endDate`, {
        endDate: by.endDate,
      });
    }
  }
}
