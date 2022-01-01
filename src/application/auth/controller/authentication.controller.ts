import { AuthenticationDITokens } from '@domain/Authentication/di/AuthenticationDITokens';
import { AuthenticationAdminService } from '@domain/Authentication/service/AuthenticationAdminService';
import { AuthenticationResponsableService } from '@domain/Authentication/service/AuthenticationResponsableService';
import { Body, Controller, HttpStatus, Inject, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpError } from 'src/core/types/HttpError';
import { HttpRestApiAuthenticationRequest } from './documentation/HttpRestApiAuthenticationRequest';
import { HttpRestApiAuthenticationResponse } from './documentation/HttpRestApiAuthenticationResponse';

@ApiTags('Authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(
    @Inject(AuthenticationDITokens.AuthenticationAdminService)
    private readonly authenticationAdminService: AuthenticationAdminService,
    @Inject(AuthenticationDITokens.AuthenticationResponsableService)
    private readonly authenticationResponsableService: AuthenticationResponsableService,
  ) {}

  @ApiResponse({
    status: 201,
    description: 'Credentials are correct',
    type: HttpRestApiAuthenticationResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Credentials are incorrect',
    type: HttpError,
  })
  @Post('/admin')
  public async authentication(
    @Body() body: HttpRestApiAuthenticationRequest,
  ): Promise<HttpRestApiAuthenticationResponse> {
    return await this.authenticationAdminService.execute(body);
  }

  @Post('/responsable')
  public async responsableAuthentication(
    @Body() body: HttpRestApiAuthenticationRequest,
  ): Promise<HttpRestApiAuthenticationResponse> {
    return await this.authenticationResponsableService.execute(body);
  }
}
