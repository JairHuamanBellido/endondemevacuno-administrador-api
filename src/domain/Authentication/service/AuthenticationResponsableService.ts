import { UserRole } from '@core/enums/UsersRoleEnum';
import { HttpError } from '@core/types/HttpError';
import { IResponsableRepository } from '@domain/Responsable/interface/IReponsableRepository.interface';
import { Responsable } from '@domain/Responsable/model/Responsable';
import { HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAccountRepository } from '../../Account/interface/IAccountRepository.interface';
import { AuthenticationRequestDto as Payload } from '../dto/application/AuthenticationRequestDto';
import { AuthenticationResponseDto as Response } from '../dto/application/AuthenticationResponseDto';
import { Account } from '../model/Account';
import { HttpJwtPayload } from '../security/type/HttpAuthType';
import { AuthenticateTrackingService } from './AuthenticateTrackingService';
import { EvaluateEnableResponsableAccount } from './EvaluateEnableResponsableAccount';

export class AuthenticationResponsableService {
  constructor(
    private readonly accountRepository: IAccountRepository,
    private readonly responsableRepository: IResponsableRepository,
    private readonly jwtService: JwtService,
    private readonly authenticateTrackingService: AuthenticateTrackingService,
    private readonly evaluateEnableResponsableAccount: EvaluateEnableResponsableAccount
  ) { }

  public async execute(payload: Payload): Promise<Response> {
    let pass = payload.password;
    payload.password = null;

    const account: Account = await this.accountRepository.getBy({
      ...payload,
      isAdmin: false,
    });

    if (!account)
      this._invalidCredentials();

    const responsable: Responsable = await this.responsableRepository.getBy({
      accountId: account.id,
    });

    if (!responsable.isEnabled) {
      let result = await this.evaluateEnableResponsableAccount.execute(responsable);
      if (!result)
        this._accountTemporalBlocked();
    }

    if (pass !== account.password) {
      await this.authenticateTrackingService.execute({
        responsable: responsable,
        result: false
      })
      this._invalidCredentials();
    }

    await this.authenticateTrackingService.execute({
      responsable: responsable,
      result: true
    })

    const jwtPayload: HttpJwtPayload = {
      email: account.email,
      id: account.id,
      role: account.isAdmin ? UserRole.ADMIN : UserRole.RESPONSABLE,
      responsableId: responsable.id,
    };

    const token = await this.jwtService.sign(jwtPayload);

    return {
      token: token,
      userId: account.id,
    };
  }

  private _invalidCredentials(): HttpException {
    const httpError: HttpError = { message: 'Las credenciales no son válidas' };

    throw new HttpException(httpError, HttpStatus.FORBIDDEN);
  }

  private _accountTemporalBlocked(): HttpException {
    const httpError: HttpError = {
      message:
        'Cuenta bloqueada por exceso de intentos fallidos. Inténtelo de nuevo en 10 minutos',
    };

    throw new HttpException(httpError, HttpStatus.FORBIDDEN);
  }
}
