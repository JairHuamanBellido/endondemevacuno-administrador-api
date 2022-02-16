import { UserRole } from '@core/enums/UsersRoleEnum';
import { HttpAuth } from '@domain/Authentication/security/decorator/HttpAuth';
import { VaccineDITokens } from '@domain/Vaccine/di/VaccineDITokens';
import { GetAllVacinesService } from '@domain/Vaccine/services/GetAllVacinesService';
import { VaccineAdapter } from '@infrastructure/adapters/VaccineAdapter';
import { Controller, Get, HttpStatus, Inject } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('vaccines')
@ApiTags('Vaccines')
@ApiBearerAuth()
export class VaccinesController {
  constructor(
    @Inject(VaccineDITokens.GetAllVacinesService)
    private readonly getAllVacinesService: GetAllVacinesService,
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get all vacines',
    type: [VaccineAdapter],
  })
  @HttpAuth(UserRole.RESPONSABLE)
  @Get('/')
  public async getAll(): Promise<VaccineAdapter[]> {
    const vaccines = await this.getAllVacinesService.execute();
    return VaccineAdapter.newListFromVaccines(vaccines);
  }
}
