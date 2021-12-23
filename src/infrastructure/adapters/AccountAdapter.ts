import { Account } from '@domain/Authentication/model/Account';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, plainToClass } from 'class-transformer';

export class AccountAdapter {
  @ApiProperty()
  @Expose()
  public id: string;

  @ApiProperty()
  @Expose()
  public email: string;

  @Exclude()
  public password: string;

  @ApiProperty()
  @Expose()
  public isAdmin: boolean;

  @Exclude()
  public createdAt: Date;

  public static newFromAccount(account: Account): AccountAdapter {
    return plainToClass(AccountAdapter, account, { excludePrefixes: ['_'] });
  }
}
