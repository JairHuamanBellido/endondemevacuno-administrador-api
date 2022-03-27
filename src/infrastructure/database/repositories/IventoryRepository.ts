import { QueryInventoryDto } from '@domain/Inventory/dto/infrastructure/QueryInventoryDto';
import { IIventoryRepository } from '@domain/Inventory/interface/IIventoryRepository.interface';
import { Inventory } from '@domain/Inventory/model/Invetory';
import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { TypeOrmInventory } from '../entity/TypeOrmInventory.entity';
import { TypeOrmInvetoryMapper } from '../mappers/TypeOrmInventoryMapper';

type InventoryQueryBuilder = SelectQueryBuilder<TypeOrmInventory>;

@EntityRepository(TypeOrmInventory)
export abstract class TypeOrmInventoryRepository
  extends Repository<TypeOrmInventory>
  implements IIventoryRepository
{
  private readonly inventoryAlias: string = 'inventory';

  public async getBy(searchBy: QueryInventoryDto): Promise<Inventory> {
    let domainInventory: Inventory;

    const query = this.buildAccountQueryBuilder();

    this.extendQueryWithFindByAnyCoincidence(query, searchBy);

    const ormInventory = await query.getOne();

    if (ormInventory) {
      domainInventory = TypeOrmInvetoryMapper.toDomainEntity(ormInventory);
    }
    return domainInventory;
  }
  public async getAll(searchBy: QueryInventoryDto): Promise<Inventory[]> {
    const query = this.buildAccountQueryBuilder();
    this.extendQueryWithFindByAnyCoincidence(query, searchBy);

    const ormInventory = await query.getMany();
    return TypeOrmInvetoryMapper.toDomainsEntities(ormInventory);
  }

  public async deleteEntity(searchBy: QueryInventoryDto): Promise<boolean> {
    const query = this.buildAccountQueryBuilder()
      .delete()
      .from(TypeOrmInventory)
      .where('id = :id', { id: searchBy.id })
      .execute();
    if (!query) return false;
    return true;
  }

  public async createEntity(entity: Inventory): Promise<Inventory> {
    const ormInventory = TypeOrmInvetoryMapper.toOrmEntity(entity);

    const newEntity = await this.createQueryBuilder(this.inventoryAlias)
      .insert()
      .into(TypeOrmInventory)
      .values([ormInventory])
      .execute();

    const query = this.buildAccountQueryBuilder();
    this.extendQueryWithFindByAnyCoincidence(query, {
      id: newEntity.identifiers[0].id,
    });

    const ormEntity = await query.getOne();

    return TypeOrmInvetoryMapper.toDomainEntity(ormEntity);
  }

  private buildAccountQueryBuilder(): InventoryQueryBuilder {
    return this.createQueryBuilder(this.inventoryAlias).select();
  }

  private extendQueryWithFindByAnyCoincidence(
    query: InventoryQueryBuilder,
    by?: QueryInventoryDto,
  ) {
    query.leftJoinAndSelect(`${this.inventoryAlias}.vaccines`, 'vaccines');
    query.leftJoinAndSelect(
      `${this.inventoryAlias}.vaccine_center`,
      'vaccine_center',
    );
    if (by.id) {
      query.orWhere(`"${this.inventoryAlias}".id = :id`, { id: by.id });
    }
    if (by.createdAt) {
      query.orWhere(`"${this.inventoryAlias}".created_at = :createdAt`, {
        createdAt: by.createdAt,
      });
    }

    if (by.quantity) {
      query.orWhere(`"${this.inventoryAlias}".quantity = :quantity`, {
        quantity: by.quantity,
      });
    }
    if (by.vaccineCenterId) {
      query.orWhere(
        `${this.inventoryAlias}.vaccine_center.id = :vaccine_center_id`,
        {
          vaccine_center_id: by.vaccineCenterId,
        },
      );
    }
  }
}
