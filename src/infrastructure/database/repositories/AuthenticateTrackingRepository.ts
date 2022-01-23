import { QueryAuthenticateTrackingDto } from '@domain/Authentication/dto/infrastructure/QueryAuthenticateTrackingDto';
import { IAuthenticateTrackingRepository } from '@domain/Authentication/interface/IAuthenticateTrackingRepository.interface';
import { AuthenticateTracking } from '@domain/Authentication/model/AuthenticateTracking';
import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { TypeOrmAuthenticateTracking } from '../entity/TypeOrmAuthenticateTracking.entity';
import { TypeOrmAuthenticateTrackingMapper } from '../mappers/TypeOrmAuthenticateTrackingMapper';

type AuthenticateTrackingQueryBuilder = SelectQueryBuilder<TypeOrmAuthenticateTracking>;

@EntityRepository(TypeOrmAuthenticateTracking)
export abstract class TypeOrmAuthenticateTrackingRepository
    extends Repository<TypeOrmAuthenticateTracking>
    implements IAuthenticateTrackingRepository {
    private readonly authenticateTrackingAlias: string = 'authenticate_tracking';

    public async getBy(searchBy: QueryAuthenticateTrackingDto): Promise<AuthenticateTracking> {
        let domainAuthenticateTracking: AuthenticateTracking;
        const query: AuthenticateTrackingQueryBuilder = this.buildAccountQueryBuilder();
        this.extendQueryWithFindByAllCoincidence(query, searchBy);

        const ormAuthenticateTracking: TypeOrmAuthenticateTracking = await query.getOne();

        if (ormAuthenticateTracking)
            domainAuthenticateTracking = TypeOrmAuthenticateTrackingMapper.toDomainEntity(ormAuthenticateTracking);

        return domainAuthenticateTracking;
    }

    public async findBy(searchBy: QueryAuthenticateTrackingDto): Promise<AuthenticateTracking[]> {
        const query: AuthenticateTrackingQueryBuilder = this.buildAccountQueryBuilder();
        this.extendQueryWithFindByAllCoincidence(query, searchBy);

        const ormAuthenticateTracking: TypeOrmAuthenticateTracking[] = await query
            .getMany();

        return TypeOrmAuthenticateTrackingMapper.toDomainsEntities(ormAuthenticateTracking);
    }

    public async createEntity(authenticateTracking: AuthenticateTracking): Promise<AuthenticateTracking> {
        const ormAuthenticateTracking = TypeOrmAuthenticateTrackingMapper.toOrmEntity(authenticateTracking);
        const newEntity = await this.createQueryBuilder(this.authenticateTrackingAlias)
            .insert()
            .into(TypeOrmAuthenticateTracking)
            .values([ormAuthenticateTracking])
            .execute();

        const query: AuthenticateTrackingQueryBuilder = this.buildAccountQueryBuilder();
        this.extendQueryWithFindByAllCoincidence(query, {
            id: newEntity.identifiers[0].id,
        });
        const ormEntity: TypeOrmAuthenticateTracking = await query
            .getOne();
        return TypeOrmAuthenticateTrackingMapper.toDomainEntity(ormEntity);
    }
    private buildAccountQueryBuilder(): AuthenticateTrackingQueryBuilder {
        return this.createQueryBuilder(this.authenticateTrackingAlias).select();
    }

    private extendQueryWithFindByAnyCoincidence(
        query: AuthenticateTrackingQueryBuilder,
        by?: QueryAuthenticateTrackingDto,
    ) {
        query.leftJoinAndSelect('authenticate_tracking.responsable', 'responsable');

        if (by.id) {
            query.orWhere(`"${this.authenticateTrackingAlias}".id = :id`, { id: by.id });
        }
        if (by.fromDate) {
            query.orWhere(`"${this.authenticateTrackingAlias}".created_at >= :fromDate`, { fromDate: by.fromDate });
        }
        if (by.responsableId) {
            query.orWhere(`"${this.authenticateTrackingAlias}".responsable_id = :responsableId`, { responsableId: by.responsableId });
        }
        if (by.result != null) {
            query.orWhere(`"${this.authenticateTrackingAlias}".result = :result`, { result: by.result });
        }
    }

    private extendQueryWithFindByAllCoincidence(
        query: AuthenticateTrackingQueryBuilder,
        by?: QueryAuthenticateTrackingDto,
    ) {
        query.leftJoinAndSelect('authenticate_tracking.responsable', 'responsable');

        if (by.id) {
            query.andWhere(`"${this.authenticateTrackingAlias}".id = :id`, { id: by.id });
        }
        if (by.fromDate) {
            query.andWhere(`"${this.authenticateTrackingAlias}".created_at >= :fromDate`, { fromDate: by.fromDate });
        }
        if (by.responsableId) {
            query.andWhere(`"${this.authenticateTrackingAlias}".responsable_id = :responsableId`, { responsableId: by.responsableId });
        }
        if (by.result != null) {
            query.andWhere(`"${this.authenticateTrackingAlias}".result = :result`, { result: by.result });
        }

        query.orderBy(`"${this.authenticateTrackingAlias}".created_at`, 'DESC');
    }
}
