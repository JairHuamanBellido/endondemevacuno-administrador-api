import { ResponsableModule } from '@application/responsable/responsable.module';
import { IAccountRepository } from '@domain/Account/interface/IAccountRepository.interface';
import { AuthenticationDITokens } from '@domain/Authentication/di/AuthenticationDITokens';
import { IAuthenticateTrackingRepository } from '@domain/Authentication/interface/IAuthenticateTrackingRepository.interface';
import { HttpJwtStrategy } from '@domain/Authentication/security/passport/HttpJwtStrategy';
import { AuthenticateTrackingService } from '@domain/Authentication/service/AuthenticateTrackingService';
import { AuthenticationAdminService } from '@domain/Authentication/service/AuthenticationAdminService';
import { AuthenticationResponsableService } from '@domain/Authentication/service/AuthenticationResponsableService';
import { ResponsableDITokens } from '@domain/Responsable/di/ResponsableDITokens';
import { IResponsableRepository } from '@domain/Responsable/interface/IReponsableRepository.interface';
import { UpdateResponsableService } from '@domain/Responsable/service/UpdateResponsableService';
import { SystemConfig } from '@infrastructure/config/SystemConfig';
import { TypeormAccountRepository } from '@infrastructure/database/repositories/AccountRepository';
import { TypeOrmAuthenticateTrackingRepository } from '@infrastructure/database/repositories/AuthenticateTrackingRepository';
import { TypeormResponsableRepository } from '@infrastructure/database/repositories/ResponsableRepository';
import { Module, Provider } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Connection } from 'typeorm';
import { AuthenticationController } from './controller/authentication.controller';

const persistenceProviders: Provider[] = [
  {
    provide: AuthenticationDITokens.IAccountRepository,
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(TypeormAccountRepository),
    inject: [Connection],
  },
  {
    provide: ResponsableDITokens.IResponsableRepository,
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(TypeormResponsableRepository),
    inject: [Connection],
  },
  {
    provide: AuthenticationDITokens.IAuthenticateTrackingRepository,
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(TypeOrmAuthenticateTrackingRepository),
    inject: [Connection],
  },
];

const serviceProviders: Provider[] = [
  {
    provide: AuthenticationDITokens.AuthenticationAdminService,
    useFactory: (
      accountRepository: IAccountRepository,
      jwtService: JwtService,
    ) => new AuthenticationAdminService(accountRepository, jwtService),
    inject: [AuthenticationDITokens.IAccountRepository, JwtService],
  },
  {
    provide: AuthenticationDITokens.AuthenticateTrackingService,
    useFactory: (
      authenticateTracking: IAuthenticateTrackingRepository,
      updateResponsableService: UpdateResponsableService
    ) => new AuthenticateTrackingService(
      authenticateTracking,
      updateResponsableService
    ),
    inject: [
      AuthenticationDITokens.IAuthenticateTrackingRepository,
      ResponsableDITokens.UpdateResponsableService
    ],
  },
  {
    provide: AuthenticationDITokens.HttpJwtStrategy,
    useFactory: (authenticationService: AuthenticationAdminService) =>
      new HttpJwtStrategy(authenticationService),
    inject: [AuthenticationDITokens.AuthenticationAdminService],
  },
  {
    provide: AuthenticationDITokens.AuthenticationResponsableService,
    useFactory: (
      accountRepository: IAccountRepository,
      responsableRepository: IResponsableRepository,
      jwtService: JwtService,
      authenticateTrackingService: AuthenticateTrackingService
    ) =>
      new AuthenticationResponsableService(
        accountRepository,
        responsableRepository,
        jwtService,
        authenticateTrackingService
      ),
    inject: [
      AuthenticationDITokens.IAccountRepository,
      ResponsableDITokens.IResponsableRepository,
      JwtService,
      AuthenticationDITokens.AuthenticateTrackingService,
    ],
  },
];

@Module({
  imports: [
    PassportModule,
    JwtModule.register({ secret: SystemConfig.JWT_KEY }),
    ResponsableModule
  ],
  controllers: [AuthenticationController],
  providers: [...persistenceProviders, ...serviceProviders],
})
export class AuthenticationModule { }
