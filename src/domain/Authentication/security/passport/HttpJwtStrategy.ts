/* eslint-disable prettier/prettier */
import { AuthenticationAdminService } from '@domain/Authentication/service/AuthenticationAdminService';
import { SystemConfig } from '@infrastructure/config/SystemConfig';
import { UnauthorizedException } from '@nestjs/common';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { HttpJwtPayload } from '../type/HttpAuthType';

export class HttpJwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private authenticationService: AuthenticationAdminService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'EnDondeMeVacunoSecret',
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

export const jwtConfig: JwtModuleAsyncOptions = {
  useFactory: async () => {
    const systemConfig = new SystemConfig();
    const { JwtKey } = await systemConfig.getConfiguration();
    return {
      secret: JwtKey,
    };
  },
};
