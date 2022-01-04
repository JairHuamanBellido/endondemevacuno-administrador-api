/* eslint-disable prettier/prettier */
import { AuthenticationAdminService } from '@domain/Authentication/service/AuthenticationAdminService';
import { SystemConfig } from '@infrastructure/config/SystemConfig';
import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { HttpJwtPayload } from '../type/HttpAuthType';

export class HttpJwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private authenticationService: AuthenticationAdminService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: SystemConfig.JWT_KEY,
    });
  }

  public async validate(payload: HttpJwtPayload): Promise<HttpJwtPayload> {
    const doesUserExist = await this.authenticationService.validateAccount(
      payload.id,
    );
    if (!doesUserExist) {
      throw new UnauthorizedException({
        message:
          'JWT Token was edit with malicious permissions, Your IP was reported to IT Department',
      });
    }
    return {
      id: payload.id,
      email: payload.email,
      role: payload.role,
      responsableId: payload.responsableId,
    };
  }
}
