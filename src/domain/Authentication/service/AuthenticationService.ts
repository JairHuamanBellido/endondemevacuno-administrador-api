import { HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'src/core/enums/UsersRoleEnum';
import { AuthenticationRequestDto } from '../dto/application/AuthenticationRequestDto';
import { AuthenticationResponseDto } from '../dto/application/AuthenticationResponseDto';
import { IAccountRepository } from '../interface/IAccountRepository.interface';
import { Account } from '../model/Account';
import { HttpJwtPayload } from '../security/type/HttpAuthType';
import { HttpError } from '@core/types/HttpError';
export class AuthenticationService {
  constructor(
    private readonly accountRepository: IAccountRepository,

    private readonly jwtService: JwtService,
  ) {}

  public async execute(
    payload: AuthenticationRequestDto,
  ): Promise<AuthenticationResponseDto> {
    const account: Account = await this.accountRepository.getBy(payload);

    if (!account || payload.password !== account.password) {
      const httpError: HttpError = { message: 'Invalidad Credentials' };
      throw new HttpException(httpError, HttpStatus.BAD_REQUEST);
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
  public async validateAccount(id: string) {
    const account = await this.accountRepository.getBy({ id: id });
    return account;
  }
}
