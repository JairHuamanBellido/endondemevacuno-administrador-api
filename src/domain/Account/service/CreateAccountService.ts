import { HttpError } from '@core/types/HttpError';
import { Account } from '@domain/Authentication/model/Account';
import { HttpException, HttpStatus } from '@nestjs/common';
import { IAccountRepository } from '../interface/IAccountRepository.interface';

export class CreateAccountService {
  constructor(private readonly accountRepository: IAccountRepository) {}

  public async execute(account: Account) {
    const isAccountExist = await this.accountRepository.getBy({
      email: account.email,
    });

    if (isAccountExist) this._entityExist();

    const newAccount = await this.accountRepository.createEntity(account);
    return newAccount;
  }

  private _entityExist(): HttpException {
    const httpError: HttpError = { message: 'El correo ya existe' };
    throw new HttpException(httpError, HttpStatus.CONFLICT);
  }
}
