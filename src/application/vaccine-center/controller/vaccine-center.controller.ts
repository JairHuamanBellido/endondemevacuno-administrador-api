import { UserRole } from '@core/enums/UsersRoleEnum';
import { HttpAuth } from '@domain/Authentication/security/decorator/HttpAuth';
import { HttpUser } from '@domain/Authentication/security/decorator/HttpUser';
import { HttpJwtPayload } from '@domain/Authentication/security/type/HttpAuthType';
import { InventoryDITokens } from '@domain/Inventory/di/InventoryDITokens';
import { CreateInventoryService } from '@domain/Inventory/services/CreateInventoryService';
import { DeleteVaccineToInventoryService } from '@domain/Inventory/services/DeleteVaccineFromInventoryService';
import { GetInvetoryByVaccineCenterService } from '@domain/Inventory/services/GetInvetoryByVaccineCenterService';
import { VaccineCenterDITokens } from '@domain/VaccineCenter/di/VaccineCenterDITokens';
import { CreateVaccineCenterService } from '@domain/VaccineCenter/service/CreateVaccineCenterService';
import { GetVaccineCenterByResponsableService } from '@domain/VaccineCenter/service/GetVaccineCenterByResponsableService';
import { UpdateVaccineCenterService } from '@domain/VaccineCenter/service/UpdateVaccineCenterService';
import { InventoryAdapter } from '@infrastructure/adapters/InventoryAdapter';
import { VaccineCenterAdapter } from '@infrastructure/adapters/VaccineCenterAdapter';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpRestApiCreateInventory } from '../documentation/HttpRestApiCreateInventory';
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
    @Inject(InventoryDITokens.GetInvetoryByVaccineCenterService)
    private readonly getInvetoryByVaccineCenterService: GetInvetoryByVaccineCenterService,
    @Inject(InventoryDITokens.CreateInventoryService)
    private readonly createInventoryService: CreateInventoryService,
    @Inject(InventoryDITokens.DeleteVaccineToInventoryService)
    private readonly deleteVaccineToInventoryService: DeleteVaccineToInventoryService,
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
  public async getByResponsable(@HttpUser() httpUser: HttpJwtPayload) {
    const vaccineCenter = await this.getVaccineCenterByResponsable.execute(
      httpUser.responsableId,
    );
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

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get inventory by vaccine center',
    type: InventoryAdapter,
  })
  @HttpAuth(UserRole.RESPONSABLE)
  @Get('/:vaccineCenterId/inventory')
  public async getInventory(@Param('vaccineCenterId') vaccineCenterId: string) {
    const inventories = await this.getInvetoryByVaccineCenterService.execute(
      vaccineCenterId,
    );

    return InventoryAdapter.newListFromInventories(inventories);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Add a vaccine to vaccine center',
    type: InventoryAdapter,
  })
  @HttpAuth(UserRole.RESPONSABLE)
  @Post('/:vaccineCenterId/inventory')
  public async addInventoryToVaccineCenter(
    @Param('vaccineCenterId') vaccineCenterId: string,
    @Body() payload: HttpRestApiCreateInventory,
  ) {
    const newInventory = await this.createInventoryService.execute(
      payload,
      vaccineCenterId,
      true,
    );

    return InventoryAdapter.newFromInventory(newInventory);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Remove vaccine from vaccine center',
  })
  @HttpAuth(UserRole.RESPONSABLE)
  @Delete('/:vaccineCenterId/inventory/:id')
  public async removeVaccineFromInventory(
    @Param('id') id: string,
    @Param('vaccineCenterId') vaccineCenterId: string,
  ) {
    const isDelete = await this.deleteVaccineToInventoryService.execute(
      vaccineCenterId,
      id,
    );

    return isDelete;
  }
}
