import { TypeOrmInflow } from '../entity/TypeOrmInflow.entity';
import { Inflow } from '@domain/Inflow/model/Inflow';
import { TypeOrmVaccineCenterMapper } from './TypeOrmVaccineCenterMapper';

export class TypeOrmInflowMapper {
  public static toDomainEntity(ormInflow: TypeOrmInflow): Inflow {
    const domainInflow = new Inflow({
      id: ormInflow.id,
      peopleEntering: ormInflow.people_entering,
      vaccineCenter: ormInflow.vaccine_center
        ? TypeOrmVaccineCenterMapper.toDomainEntity(ormInflow.vaccine_center)
        : undefined,
      createdAt: ormInflow.created_at,
    });

    return domainInflow;
  }

  public static toDomainsEntities(ormInflows: TypeOrmInflow[]): Inflow[] {
    return ormInflows.map((e) => this.toDomainEntity(e));
  }

  public static toOrmEntity(inflow: Inflow): TypeOrmInflow {
    const ormInflow: TypeOrmInflow = {
      created_at: inflow.createdAt,
      id: inflow.id,
      people_entering: inflow.peopleEntering,
      vaccine_center: TypeOrmVaccineCenterMapper.toOrmEntity(
        inflow.vaccineCenter,
      ),
    };

    return ormInflow;
  }
}
