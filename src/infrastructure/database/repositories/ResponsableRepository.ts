import { QueryResponsableDto } from '@domain/Responsable/dto/infrastructure/QueryResponsableDto';
import { IResponsableRepository } from '@domain/Responsable/interface/IReponsableRepository.interface';
import { Responsable } from '@domain/Responsable/model/Responsable';
import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { TypeOrmResponsable } from '../entity/TypeOrmResponsable.entity';
import { TypeOrmResponsableMapper } from '../mappers/TypeOrmResponsableMapper';

type ResponsableQueryBuilder = SelectQueryBuilder<TypeOrmResponsable>;

@EntityRepository(TypeOrmResponsable)
export abstract class TypeormResponsableRepository
  extends Repository<TypeOrmResponsable>
  implements IResponsableRepository
{
  private readonly responsableAlias: string = 'responsable';

  public async getAll(): Promise<Responsable[]> {
    const query: ResponsableQueryBuilder = this.buildAccountQueryBuilder();

    const ormResponsables: TypeOrmResponsable[] = await query
      .leftJoinAndSelect('responsable.account', 'account')
      .getMany();

    return TypeOrmResponsableMapper.toDomainsEntities(ormResponsables);
  }

  private buildAccountQueryBuilder(): ResponsableQueryBuilder {
    return this.createQueryBuilder(this.responsableAlias).select();
  }

  private extendQueryWithByProperties(
    query: ResponsableQueryBuilder,
    by?: QueryResponsableDto,
  ) {
    if (by.id) {
      query.andWhere(`"${this.responsableAlias}".id = :id`, { id: by.id });
    }

    if (by.createdAt) {
      query.andWhere(`"${this.responsableAlias}".created_at = :created_at`, {
        created_at: by.createdAt,
      });
    }
    if (by.dni) {
      query.andWhere(`"${this.responsableAlias}".dni = :dni`, { dni: by.dni });
    }
    if (by.isEnabled) {
      query.andWhere(`"${this.responsableAlias}".is_enabled = :is_enabled`, {
        is_enabled: by.isEnabled,
      });
    }
    if (by.lastname) {
      query.andWhere(`"${this.responsableAlias}".lastname = :lastname`, {
        lastname: by.lastname,
      });
    }
    if (by.name) {
      query.andWhere(`"${this.responsableAlias}".name = :name`, {
        name: by.name,
      });
    }
  }
}
