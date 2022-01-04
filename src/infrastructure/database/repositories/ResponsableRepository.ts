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

  public async getBy(searchBy: QueryResponsableDto): Promise<Responsable> {
    let domainResponsable: Responsable;
    const query: ResponsableQueryBuilder = this.buildAccountQueryBuilder();
    this.extendQueryWithFindByAllCoincidence(query, searchBy);

    const ormResponable: TypeOrmResponsable = await query.getOne();

    if (ormResponable) {
      domainResponsable =
        TypeOrmResponsableMapper.toDomainEntity(ormResponable);
    }
    return domainResponsable;
  }

  public async updateEntity(responsable: Responsable): Promise<Responsable> {
    const ormResponsable: TypeOrmResponsable =
      TypeOrmResponsableMapper.toOrmEntity(responsable);

    await this.createQueryBuilder(this.responsableAlias)
      .update(TypeOrmResponsable)
      .set(ormResponsable)
      .where('id = :id', { id: ormResponsable.id })
      .execute();

    return await this.getBy({ id: responsable.id });
  }
  public async findBy(searchBy: QueryResponsableDto): Promise<Responsable[]> {
    const query: ResponsableQueryBuilder = this.buildAccountQueryBuilder();
    this.extendQueryWithFindByAnyCoincidence(query, searchBy);

    const ormResponable: TypeOrmResponsable[] = await query
      .leftJoinAndSelect('responsable.account', 'account')
      .getMany();

    return TypeOrmResponsableMapper.toDomainsEntities(ormResponable);
  }

  public async createEntity(responable: Responsable): Promise<Responsable> {
    const ormResponable = TypeOrmResponsableMapper.toOrmEntity(responable);
    const newEntity = await this.createQueryBuilder(this.responsableAlias)
      .insert()
      .into(TypeOrmResponsable)
      .values([ormResponable])
      .execute();

    const query: ResponsableQueryBuilder = this.buildAccountQueryBuilder();
    this.extendQueryWithFindByAllCoincidence(query, {
      id: newEntity.identifiers[0].id,
    });
    const ormEntity: TypeOrmResponsable = await query
      .leftJoinAndSelect('responsable.account', 'account')
      .getOne();
    return TypeOrmResponsableMapper.toDomainEntity(ormEntity);
  }
  private buildAccountQueryBuilder(): ResponsableQueryBuilder {
    return this.createQueryBuilder(this.responsableAlias).select();
  }

  private extendQueryWithFindByAnyCoincidence(
    query: ResponsableQueryBuilder,
    by?: QueryResponsableDto,
  ) {
    query.leftJoinAndSelect('responsable.account', 'account');

    if (by.id) {
      query.orWhere(`"${this.responsableAlias}".id = :id`, { id: by.id });
    }

    if (by.createdAt) {
      query.orWhere(`"${this.responsableAlias}".created_at = :created_at`, {
        created_at: by.createdAt,
      });
    }
    if (by.dni) {
      query.orWhere(`"${this.responsableAlias}".dni = :dni`, { dni: by.dni });
    }
    if (by.isEnabled) {
      query.orWhere(`"${this.responsableAlias}".is_enabled = :is_enabled`, {
        is_enabled: by.isEnabled,
      });
    }
    if (by.lastname) {
      query.orWhere(`"${this.responsableAlias}".lastname = :lastname`, {
        lastname: by.lastname,
      });
    }
    if (by.name) {
      query.orWhere(`"${this.responsableAlias}".name = :name`, {
        name: by.name,
      });
    }
  }

  private extendQueryWithFindByAllCoincidence(
    query: ResponsableQueryBuilder,
    by?: QueryResponsableDto,
  ) {
    query.leftJoinAndSelect('responsable.account', 'account');

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
    if (by.accountId) {
      query.andWhere('account.id = :accountId', { accountId: by.accountId });
    }
  }
}
