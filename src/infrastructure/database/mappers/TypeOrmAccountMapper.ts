import { Account } from '@domain/Authentication/model/Account';
import { TypeOrmAccount } from '../entity/TypeOrmAccount.entity';

export class TypeOrmAccountMapper {
  public static toDomainEntity(ormAccount: TypeOrmAccount): Account {
    const domainAccount: Account = new Account({
      id: ormAccount.id,
      createdAt: ormAccount.created_at,
      email: ormAccount.email,
      isAdmin: ormAccount.is_admin,
      password: ormAccount.password,
    });

    return domainAccount;
  }

  public static toOrmEntity(domainAccount: Account): TypeOrmAccount {
    const ormAccount: TypeOrmAccount = new TypeOrmAccount();
    ormAccount.created_at = domainAccount.createdAt;
    ormAccount.email = domainAccount.email;
    ormAccount.id = domainAccount.id;
    ormAccount.is_admin = domainAccount.isAdmin;
    ormAccount.password = domainAccount.password;
    return ormAccount;
  }
}
