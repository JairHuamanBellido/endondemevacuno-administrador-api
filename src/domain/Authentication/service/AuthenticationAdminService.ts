import { HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'src/core/enums/UsersRoleEnum';
import { AuthenticationRequestDto as Payload } from '../dto/application/AuthenticationRequestDto';
import { AuthenticationResponseDto as Response } from '../dto/application/AuthenticationResponseDto';
import { IAccountRepository } from '../../Account/interface/IAccountRepository.interface';
import { Account } from '../model/Account';
import { HttpJwtPayload } from '../security/type/HttpAuthType';
import { HttpError } from '@core/types/HttpError';
export class AuthenticationAdminService {
  constructor(
    private readonly accountRepository: IAccountRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async execute(payload: Payload): Promise<Response> {
    const account: Account = await this.accountRepository.getBy({
      ...payload,
      isAdmin: true,
    });

    if (!account || payload.password !== account.password) {
      this._invalidCredentials();
    }

    const jwtPayload: HttpJwtPayload = {
      email: account.email,
      id: account.id,
      role: account.isAdmin ? UserRole.ADMIN : UserRole.RESPONSABLE,
      responsableId: undefined,
    };

    const token = await this.jwtService.sign(jwtPayload);

    return {
      token: token,
      userId: account.id,
    };
  }

  public async validateAccount(id: string) {
    const account = await this.accountRepository.getBy({ id: id });

    return account;
  }

  private _invalidCredentials(): HttpException {
    const httpError: HttpError = { message: 'Invalid Credentials' };

    throw new HttpException(httpError, HttpStatus.FORBIDDEN);
  }
}
