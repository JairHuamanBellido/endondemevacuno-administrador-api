import { HttpError } from '@core/types/HttpError';
import { Account } from '@domain/Authentication/model/Account';
import { HttpException, HttpStatus } from '@nestjs/common';
import { IResponsableRepository } from '../interface/IReponsableRepository.interface';
import { Responsable } from '../model/Responsable';
import { v4 as uuidv4 } from 'uuid';
import { CreateAccountService } from '@domain/Account/service/CreateAccountService';
import { GenerateCredentialService } from './GenerateCredentialsService';
import { HttpRestApiCreateResponsable as Payload } from '@application/responsable/documentation/HttpRestApiCreateResponsable';

export class CreateResponsableService {
  private _generatedPassword: string;
  constructor(
    private readonly responsableRepository: IResponsableRepository,
    private readonly createAccountService: CreateAccountService,
    private readonly generateCredentialService: GenerateCredentialService,
  ) {
    this._generatedPassword = '123456';
  }

  public async execute(createResponsable: Payload): Promise<Responsable> {
    const isEntityExist = await this.responsableRepository.getBy({
      dni: createResponsable.dni,
    });

    if (isEntityExist) this._entityExist();


    const account = await this.createAccount(createResponsable);


    // await this.generateCredentialService.eee(
    //   createResponsable,
    //   this._generatedPassword,
    // );
    return await this.createResponsable(createResponsable, account);
  }

  private async createAccount(createResponsable: Payload): Promise<Account> {
    const account: Account = new Account({
      createdAt: new Date(),
      email: createResponsable.email,
      id: uuidv4(),
      isAdmin: false,
      password: this._generatedPassword,
    });

    const newAccount = await this.createAccountService.execute(account);
    return newAccount;
  }

  private async createResponsable(
    createResponsable: Payload,
    account: Account,
  ): Promise<Responsable> {
    const responsable: Responsable = new Responsable({
      account: account,
      createdAt: new Date(),
      dni: createResponsable.dni,
      id: uuidv4(),
      isEnabled: true,
      lastname: createResponsable.lastname,
      name: createResponsable.name,
    });

    return await this.responsableRepository.createEntity(responsable);
  }

  private _entityExist(): HttpException {
    const httpError: HttpError = { message: 'El dni ya existe' };
    throw new HttpException(httpError, HttpStatus.CONFLICT);
  }
}
