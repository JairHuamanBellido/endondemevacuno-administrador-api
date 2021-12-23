import { Responsable } from '@domain/Responsable/model/Responsable';
import { TypeOrmResponsable } from '../entity/TypeOrmResponsable.entity';
import { TypeOrmAccountMapper } from './TypeOrmAccountMapper';

export class TypeOrmResponsableMapper {
  public static toDomainEntity(
    ormResponsable: TypeOrmResponsable,
  ): Responsable {
    const domainResponsable: Responsable = new Responsable({
      account: TypeOrmAccountMapper.toDomainEntity(ormResponsable.account),
      createdAt: ormResponsable.created_at,
      dni: ormResponsable.dni,
      id: ormResponsable.id,
      isEnabled: ormResponsable.is_enabled,
      lastname: ormResponsable.lastname,
      name: ormResponsable.name,
    });

    return domainResponsable;
  }
  public static toDomainsEntities(
    ormResponsables: TypeOrmResponsable[],
  ): Responsable[] {
    return ormResponsables.map((e) => this.toDomainEntity(e));
  }
}
