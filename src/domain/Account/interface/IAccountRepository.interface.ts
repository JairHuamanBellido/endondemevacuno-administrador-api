import { QueryAccountDto } from '@domain/Authentication/dto/infrastructure/QueryAccountDto';
import { Account } from '@domain/Authentication/model/Account';

export interface IAccountRepository {
  getBy(payload: QueryAccountDto): Promise<Account>;
  createEntity(account: Account): Promise<Account>;
}
