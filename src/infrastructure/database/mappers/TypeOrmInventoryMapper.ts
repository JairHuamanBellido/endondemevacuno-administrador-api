import { Inventory } from '@domain/Inventory/model/Invetory';
import { VaccineCenter } from '@domain/VaccineCenter/model/VaccineCenter';
import { TypeOrmInventory } from '../entity/TypeOrmInventory.entity';
import { TypeOrmVaccineCenterMapper } from './TypeOrmVaccineCenterMapper';
import { TypeOrmVaccineMapper } from './TypeOrmVaccineMapper';

export class TypeOrmInvetoryMapper {
  public static toDomainEntity(ormInvetory: TypeOrmInventory): Inventory {
    const domainInventory = new Inventory({
      createdAt: ormInvetory.created_at,
      id: ormInvetory.id,
      quantity: ormInvetory.quantity,
      vaccine: TypeOrmVaccineMapper.toDomainEntity(ormInvetory.vaccines),
      vaccineCenter: TypeOrmVaccineCenterMapper.toDomainEntity(
        ormInvetory.vaccine_center,
      ),
    });

    return domainInventory;
  }

  public static toOrmEntity(inventory: Inventory): TypeOrmInventory {
    const ormInventory: TypeOrmInventory = {
      created_at: inventory.createdAt,
      id: inventory.id,
      quantity: inventory.quantity,
      vaccine_center: TypeOrmVaccineCenterMapper.toOrmEntity(inventory.vaccineCenter),
      vaccines: TypeOrmVaccineMapper.toOrmEntity(inventory.vaccine),
    };

    return ormInventory;
  }
}
