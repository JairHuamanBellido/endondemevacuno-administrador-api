import { AuthenticationDITokens } from '@domain/Authentication/di/AuthenticationDITokens';
import { IAccountRepository } from '@domain/Authentication/interface/IAccountRepository.interface';
import { HttpJwtStrategy } from '@domain/Authentication/security/passport/HttpJwtStrategy';
import { AuthenticationService } from '@domain/Authentication/service/AuthenticationService';
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
    provide: AuthenticationDITokens.AuthenticationService,
    useFactory: (
      accountRepository: IAccountRepository,
      jwtService: JwtService,
    ) => new AuthenticationService(accountRepository, jwtService),
    inject: [AuthenticationDITokens.IAccountRepository, JwtService],
  },
  {
    provide: AuthenticationDITokens.HttpJwtStrategy,
    useFactory: (authenticationService: AuthenticationService) =>
      new HttpJwtStrategy(authenticationService),
    inject: [AuthenticationDITokens.AuthenticationService],
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
