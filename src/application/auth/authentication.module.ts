import { AuthenticationDITokens } from '@domain/Authentication/di/AuthenticationDITokens';
import { IAccountRepository } from '@domain/Authentication/interface/IAccountRepository.interface';
import { HttpJwtStrategy } from '@domain/Authentication/security/passport/HttpJwtStrategy';
import { AuthenticationAdminService } from '@domain/Authentication/service/AuthenticationAdminService';
import { SystemConfig } from '@infrastructure/config/SystemConfig';
import { TypeormAccountRepository } from '@infrastructure/database/repositories/AccountRepository';
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
    provide: AuthenticationDITokens.HttpJwtStrategy,
    useFactory: (authenticationService: AuthenticationAdminService) =>
      new HttpJwtStrategy(authenticationService),
    inject: [AuthenticationDITokens.AuthenticationAdminService],
  },
];

@Module({
  imports: [
    PassportModule,
    JwtModule.register({ secret: SystemConfig.JWT_KEY }),
  ],
  controllers: [AuthenticationController],
  providers: [...persistenceProviders, ...serviceProviders],
})
export class AuthenticationModule {}
