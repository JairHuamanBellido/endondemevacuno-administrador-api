import { AuthenticateTracking } from '@domain/Authentication/model/AuthenticateTracking';
import { TypeOrmAuthenticateTracking } from '../entity/TypeOrmAuthenticateTracking.entity';
import { TypeOrmResponsableMapper } from './TypeOrmResponsableMapper';

export class TypeOrmAuthenticateTrackingMapper {
  public static toDomainEntity(
    ormAuthenticateTracking: TypeOrmAuthenticateTracking,
  ): AuthenticateTracking {
    const domainAuthenticateTracking: AuthenticateTracking = new AuthenticateTracking({
      responsable: ormAuthenticateTracking.responsable
        ? TypeOrmResponsableMapper.toDomainEntity(ormAuthenticateTracking.responsable)
        : undefined,
      createdAt: ormAuthenticateTracking.created_at,
      id: ormAuthenticateTracking.id,
      result: ormAuthenticateTracking.result,
    });

    return domainAuthenticateTracking;
  }
  public static toDomainsEntities(
    ormAuthenticateTrackings: TypeOrmAuthenticateTracking[],
  ): AuthenticateTracking[] {
    return ormAuthenticateTrackings.map((e) => this.toDomainEntity(e));
  }

  public static toOrmEntity(AuthenticateTracking: AuthenticateTracking): TypeOrmAuthenticateTracking {
    return {
      responsable: AuthenticateTracking.responsable
        ? TypeOrmResponsableMapper.toOrmEntity(AuthenticateTracking.responsable)
        : undefined,
      created_at: AuthenticateTracking.createdAt,
      id: AuthenticateTracking.id,
      result: AuthenticateTracking.result,
    };
  }
}
