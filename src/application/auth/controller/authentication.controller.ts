import { AuthenticationDITokens } from '@domain/Authentication/di/AuthenticationDITokens';
import { AuthenticationService } from '@domain/Authentication/service/AuthenticationService';
import { Body, Controller, HttpStatus, Inject, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpError } from 'src/core/types/HttpError';
import { HttpRestApiAuthenticationRequest } from './documentation/HttpRestApiAuthenticationRequest';
import { HttpRestApiAuthenticationResponse } from './documentation/HttpRestApiAuthenticationResponse';

@ApiTags('Authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(
    @Inject(AuthenticationDITokens.AuthenticationService)
    private readonly authenticationService: AuthenticationService,
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
  @Post('/')
  public async authentication(
    @Body() body: HttpRestApiAuthenticationRequest,
  ): Promise<HttpRestApiAuthenticationResponse> {
    return await this.authenticationService.execute(body);
  }
}
