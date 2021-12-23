import { QueryAccountDto } from '@domain/Authentication/dto/infrastructure/QueryAccountDto';
import { IAccountRepository } from '@domain/Authentication/interface/IAccountRepository.interface';
import { Account } from '@domain/Authentication/model/Account';
import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { TypeOrmAccount } from '../entity/TypeOrmAccount.entity';
import { TypeOrmAccountMapper } from '../mappers/TypeOrmAccountMapper';

type AccountQueryBuilder = SelectQueryBuilder<TypeOrmAccount>;

@EntityRepository(TypeOrmAccount)
export abstract class TypeormAccountRepository
  extends Repository<TypeOrmAccount>
  implements IAccountRepository
{
  private readonly accountAlias: string = 'account';

  public async getBy(payload: QueryAccountDto): Promise<Account> {
    let domainAccount: Account;
    const query: AccountQueryBuilder = this.buildAccountQueryBuilder();

    this.extendQueryWithByProperties(payload, query);
    const ormAccount: TypeOrmAccount = await query.getOne();
    if (ormAccount) {
      domainAccount = TypeOrmAccountMapper.toDomainEntity(ormAccount);
    }
    return domainAccount;
  }

  private buildAccountQueryBuilder(): AccountQueryBuilder {
    return this.createQueryBuilder(this.accountAlias).select();
  }

  private extendQueryWithByProperties(
    by: QueryAccountDto,
    query: AccountQueryBuilder,
  ) {
    if (by.id) {
      query.andWhere(`"${this.accountAlias}".id = :id`, { id: by.id });
    }
    if (by.email) {
      query.andWhere(`"${this.accountAlias}".email = :email`, {
        email: by.email,
      });
    }
    if (by.password) {
      query.andWhere(`"${this.accountAlias}".password = :password`, {
        password: by.password,
      });
    }
    if (by.isAdmin) {
      query.andWhere(`"${this.accountAlias}".is_admin = :is_admin`, {
        is_admin: by.isAdmin,
      });
    }
    if (by.createdAt) {
      query.andWhere(`"${this.accountAlias}".created_at = :created_at`, {
        created_at: by.createdAt,
      });
    }
  }
}
