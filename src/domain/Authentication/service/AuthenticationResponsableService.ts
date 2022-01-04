import { IAccountRepository } from '../../Account/interface/IAccountRepository.interface';
import { AuthenticationRequestDto as Payload } from '../dto/application/AuthenticationRequestDto';
import { AuthenticationResponseDto as Response } from '../dto/application/AuthenticationResponseDto';
import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Account } from '../model/Account';
import { HttpError } from '@core/types/HttpError';
import { UserRole } from '@core/enums/UsersRoleEnum';
import { HttpJwtPayload } from '../security/type/HttpAuthType';

export class AuthenticationResponsableService {
  constructor(
    private readonly accountRepository: IAccountRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async execute(payload: Payload): Promise<Response> {
    const account: Account = await this.accountRepository.getBy({
      ...payload,
      isAdmin: false,
    });

    if (!account || payload.password !== account.password) {
      this._invalidCredentials();
    }
    const jwtPayload: HttpJwtPayload = {
      email: account.email,
      id: account.id,
      role: account.isAdmin ? UserRole.ADMIN : UserRole.RESPONSABLE,
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
