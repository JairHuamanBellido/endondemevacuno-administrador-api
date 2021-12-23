import { ResponsableDITokens } from '@domain/Responsable/di/ResponsableDITokens';
import { Controller, Get, Inject } from '@nestjs/common';
import { GetAllResponsableService } from '@domain/Responsable/service/GetAllResponsablesService';
import { HttpAuth } from '@domain/Authentication/security/decorator/HttpAuth';
import { UserRole } from '@core/enums/UsersRoleEnum';
import { ResponsableAdapter } from '@infrastructure/adapters/ManagerAdapter';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('responsables')
@Controller('responsables')
export class ResponsablesController {
  constructor(
    @Inject(ResponsableDITokens.GetAllResponsablesService)
    private readonly getAllResponsablesService: GetAllResponsableService,
  ) {}

  @ApiResponse({
    status: 200,
    description: 'An array of responsables',
    type: [ResponsableAdapter],
  })
  @HttpAuth(UserRole.ADMIN)
  @ApiBearerAuth('bearer')
  @Get('/')
  public async getAll(): Promise<ResponsableAdapter[]> {
    const responsables = await this.getAllResponsablesService.execute();

    return await ResponsableAdapter.newListFromResponsables(responsables);
  }
}
