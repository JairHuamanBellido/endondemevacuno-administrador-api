import { UserRole } from '@core/enums/UsersRoleEnum';
import { HttpAuth } from '@domain/Authentication/security/decorator/HttpAuth';
import { UbigeoDITokens } from '@domain/Ubigeo/di/UbigeoDITokens';
import { GetAllUbigeoService } from '@domain/Ubigeo/services/GetAllUbigeoService';
import { UbigeoAdapter } from '@infrastructure/adapters/UbigeoAdapter';
import { Controller, Get, HttpStatus, Inject } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('ubigeos')
@ApiTags('Ubigeo')
export class UbigeoController {
  constructor(
    @Inject(UbigeoDITokens.GetAllUbigeoService)
    private readonly getAllUbigeoService: GetAllUbigeoService,
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get all ubigeo list',
    type: [UbigeoAdapter],
  })
  @HttpAuth(UserRole.RESPONSABLE)
  @Get('/')
  public async getAll(): Promise<UbigeoAdapter[]> {
    const ubigeos = await this.getAllUbigeoService.execute();
    return UbigeoAdapter.newListFromUbigeos(ubigeos);
  }
}
