import { AccountDITokens } from '@domain/Account/di/AccountDITokens';
import { IAccountRepository } from '@domain/Account/interface/IAccountRepository.interface';
import { CreateAccountService } from '@domain/Account/service/CreateAccountService';
import { ResponsableDITokens } from '@domain/Responsable/di/ResponsableDITokens';
import { IResponsableRepository } from '@domain/Responsable/interface/IReponsableRepository.interface';
import { CreateResponsableService } from '@domain/Responsable/service/CreateResponsableService';
import { FlagCreateVaccinationCenterService } from '@domain/Responsable/service/FlagCreateVaccinationCenterService';
import { GenerateCredentialService } from '@domain/Responsable/service/GenerateCredentialsService';
import { GetAllResponsableService } from '@domain/Responsable/service/GetAllResponsablesService';
import { UpdateResponsableService } from '@domain/Responsable/service/UpdateResponsableService';
import { VaccineCenterDITokens } from '@domain/VaccineCenter/di/VaccineCenterDITokens';
import { IVaccineCenterRepository } from '@domain/VaccineCenter/interface/IVaccineCenterRepository.interface';
import { SendgridAdapter } from '@infrastructure/adapters/SendgridAdapter';
import { TypeormAccountRepository } from '@infrastructure/database/repositories/AccountRepository';
import { TypeormResponsableRepository } from '@infrastructure/database/repositories/ResponsableRepository';
import { TypeormVaccinateCenterRepository } from '@infrastructure/database/repositories/VaccineCenterRepository';
import { Module, Provider } from '@nestjs/common';
import { Connection } from 'typeorm';
import { ResponsablesController } from './controller/responsables.controller';

const persistenceProvider: Provider[] = [
  {
    provide: ResponsableDITokens.IResponsableRepository,
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(TypeormResponsableRepository),
    inject: [Connection],
  },
  {
    provide: AccountDITokens.IAccountRepository,
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(TypeormAccountRepository),
    inject: [Connection],
  },
  {
    provide: VaccineCenterDITokens.IVaccineCenterRepository,
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(TypeormVaccinateCenterRepository),
    inject: [Connection],
  },
  {
    provide: ResponsableDITokens.SendgridRepository,
    useClass: SendgridAdapter,
  },
];

const serviceProviders: Provider[] = [
  {
    provide: AccountDITokens.CreateAccountService,
    useFactory: (accountRepository: IAccountRepository) =>
      new CreateAccountService(accountRepository),
    inject: [AccountDITokens.IAccountRepository],
  },
  {
    provide: ResponsableDITokens.GenerateCredentialService,
    useFactory: (sendgridAdapter: SendgridAdapter) =>
      new GenerateCredentialService(sendgridAdapter),
    inject: [ResponsableDITokens.SendgridRepository],
  },
  {
    provide: ResponsableDITokens.GetAllResponsablesService,
    useFactory: (responsableRepository: IResponsableRepository) =>
      new GetAllResponsableService(responsableRepository),
    inject: [ResponsableDITokens.IResponsableRepository],
  },
  {
    provide: ResponsableDITokens.CreateResponsableService,
    useFactory: (
      responsableRepository: IResponsableRepository,
      createAccountService: CreateAccountService,
      generateCredentialService: GenerateCredentialService,
    ) =>
      new CreateResponsableService(
        responsableRepository,
        createAccountService,
        generateCredentialService,
      ),
    inject: [
      ResponsableDITokens.IResponsableRepository,
      AccountDITokens.CreateAccountService,
      ResponsableDITokens.GenerateCredentialService,
    ],
  },
  {
    provide: ResponsableDITokens.UpdateResponsableService,
    useFactory: (responsableRepository: IResponsableRepository) =>
      new UpdateResponsableService(responsableRepository),
    inject: [ResponsableDITokens.IResponsableRepository],
  },
  {
    provide: ResponsableDITokens.FlagCreateVaccinationCenterService,
    useFactory: (
      responsableRepository: IResponsableRepository,
      vaccineCenterRepository: IVaccineCenterRepository,
    ) =>
      new FlagCreateVaccinationCenterService(
        responsableRepository,
        vaccineCenterRepository,
      ),
    inject: [
      ResponsableDITokens.IResponsableRepository,
      VaccineCenterDITokens.IVaccineCenterRepository,
    ],
  },
];
@Module({
  providers: [...persistenceProvider, ...serviceProviders],
  controllers: [ResponsablesController],
  exports: [...serviceProviders]
})
export class ResponsableModule { }
