import { UserRole } from '@core/enums/UsersRoleEnum';
import { HttpAuth } from '@domain/Authentication/security/decorator/HttpAuth';
import { HttpUser } from '@domain/Authentication/security/decorator/HttpUser';
import { HttpJwtPayload } from '@domain/Authentication/security/type/HttpAuthType';
import { VaccineCenterDITokens } from '@domain/VaccineCenter/di/VaccineCenterDITokens';
import { CreateVaccineCenterService } from '@domain/VaccineCenter/service/CreateVaccineCenterService';
import { GetVaccineCenterService } from '@domain/VaccineCenter/service/GetVaccineCenterService';
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
import { ApiResponse } from '@nestjs/swagger';
import { HttpRestApiCreateVaccineCenter } from '../documentation/HttpRestApiCreateVaccineCenter';
import { HttpRestApiUpdateVaccineCenter } from '../documentation/HttpRestApiUpdateVaccineCenter';

@Controller('vaccine-center')
export class VaccineCenterController {
  constructor(
    @Inject(VaccineCenterDITokens.CreateVaccineCenterService)
    private readonly createVaccineCenter: CreateVaccineCenterService,
    @Inject(VaccineCenterDITokens.UpdateVaccineCenterService)
    private readonly updateVaccineCenter: UpdateVaccineCenterService,
    @Inject(VaccineCenterDITokens.GetVaccineCenterService)
    private readonly getVaccineCenter: GetVaccineCenterService,
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
  @Get('/:id')
  public async getById(@Param('id') id: string) {
    const vaccineCenter = await this.getVaccineCenter.execute(id);
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
