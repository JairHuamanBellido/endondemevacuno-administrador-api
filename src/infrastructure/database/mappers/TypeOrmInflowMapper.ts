import { TypeOrmInflow } from '../entity/TypeOrmInflow.entity';
import { Inflow } from '@domain/Inflow/model/Inflow';
import { TypeOrmVaccineCenterMapper } from './TypeOrmVaccineCenterMapper';

export class TypeOrmInflowMapper {
  public static toDomainEntity(ormInflow: TypeOrmInflow): Inflow {
    const domainInvetory = new Inflow({
      id: ormInflow.id,
      peopleEntering: ormInflow.people_entering,
      vaccineCenter: TypeOrmVaccineCenterMapper.toDomainEntity(
        ormInflow.vaccine_center,
      ),
      createdAt: ormInflow.created_at,
    });

    return domainInvetory;
  }

  public static toDomainsEntities(ormInflows: TypeOrmInflow[]): Inflow[] {
    return ormInflows.map((e) => this.toDomainEntity(e));
  }

  public static toOrmEntity(inflow: Inflow): TypeOrmInflow {
    const ormInventory: TypeOrmInflow = {
      created_at: inflow.createdAt,
      id: inflow.id,
      people_entering: inflow.peopleEntering,
      vaccine_center: TypeOrmVaccineCenterMapper.toOrmEntity(
        inflow.vaccineCenter,
      ),
    };

    return ormInventory;
  }
}
