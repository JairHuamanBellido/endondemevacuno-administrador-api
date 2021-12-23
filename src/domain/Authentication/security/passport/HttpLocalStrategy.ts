import { AuthenticationService } from '@domain/Authentication/service/AuthenticationService';
import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

export class HttpLocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthenticationService) {
    super();
  }

  async validate(
    email: string,
    password?: string,
    isAdmin?: boolean,
  ): Promise<any> {
    const user = await this.authService.execute({
      email: email,
      password: password,
      isAdmin: isAdmin,
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
