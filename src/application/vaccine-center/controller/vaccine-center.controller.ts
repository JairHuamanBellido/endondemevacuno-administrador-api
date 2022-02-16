import { UserRole } from '@core/enums/UsersRoleEnum';
import { HttpAuth } from '@domain/Authentication/security/decorator/HttpAuth';
import { HttpUser } from '@domain/Authentication/security/decorator/HttpUser';
import { HttpJwtPayload } from '@domain/Authentication/security/type/HttpAuthType';
import { VaccineCenterDITokens } from '@domain/VaccineCenter/di/VaccineCenterDITokens';
import { CreateVaccineCenterService } from '@domain/VaccineCenter/service/CreateVaccineCenterService';
import { GetVaccineCenterByResponsableService } from '@domain/VaccineCenter/service/GetVaccineCenterByResponsableService';
import { UpdateVaccineCenterService } from '@domain/VaccineCenter/service/UpdateVaccineCenterService';
import { VaccineCenterAdapter } from '@infrastructure/adapters/VaccineCenterAdapter';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpRestApiCreateVaccineCenter } from '../documentation/HttpRestApiCreateVaccineCenter';
import { HttpRestApiUpdateVaccineCenter } from '../documentation/HttpRestApiUpdateVaccineCenter';

@Controller('vaccine-center')
@ApiTags('vaccine-center')
@ApiBearerAuth()
export class VaccineCenterController {
  constructor(
    @Inject(VaccineCenterDITokens.CreateVaccineCenterService)
    private readonly createVaccineCenter: CreateVaccineCenterService,
    @Inject(VaccineCenterDITokens.UpdateVaccineCenterService)
    private readonly updateVaccineCenter: UpdateVaccineCenterService,
    @Inject(VaccineCenterDITokens.GetVaccineCenterByResponsableService)
    private readonly getVaccineCenterByResponsable: GetVaccineCenterByResponsableService,
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create a vaccine center',
    type: VaccineCenterAdapter,
  })
  @HttpAuth(UserRole.RESPONSABLE)
  @Post('/')
  public async create(
    @Body() payload: HttpRestApiCreateVaccineCenter,
    @HttpUser() httpUser: HttpJwtPayload,
  ) {
    const vaccineCenter = await this.createVaccineCenter.execute(
      payload,
      httpUser.responsableId,
    );

    return VaccineCenterAdapter.newFromVaccineCenter(vaccineCenter);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return the detail of vaccine center',
    type: VaccineCenterAdapter,
  })
  @HttpAuth(UserRole.RESPONSABLE)
  @Get('/')
  public async getByResponsable(@HttpUser() httpUser:HttpJwtPayload) {
    const vaccineCenter = await this.getVaccineCenterByResponsable.execute(httpUser.responsableId);
    return VaccineCenterAdapter.newFromVaccineCenter(vaccineCenter);
  }

  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'Update vaccine center',
    type: VaccineCenterAdapter,
  })
  @HttpAuth(UserRole.RESPONSABLE)
  @Put('/')
  public async update(@Body() payload: HttpRestApiUpdateVaccineCenter) {
    const vaccineCenterUpdated = await this.updateVaccineCenter.execute(
      payload,
    );

    return VaccineCenterAdapter.newFromVaccineCenter(vaccineCenterUpdated);
  }
}
