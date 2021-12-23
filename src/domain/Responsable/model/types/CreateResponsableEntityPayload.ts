import { Account } from '@domain/Authentication/model/Account';

export interface CreateResponsableEntityPayload {
  id: string;
  dni: string;
  name: string;
  lastname: string;
  isEnabled: boolean;
  createdAt: Date;
  account: Account;
}
