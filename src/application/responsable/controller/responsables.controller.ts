import { ResponsableDITokens } from '@domain/Responsable/di/ResponsableDITokens';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post,
  Put,
} from '@nestjs/common';
import { GetAllResponsableService } from '@domain/Responsable/service/GetAllResponsablesService';
import { HttpAuth } from '@domain/Authentication/security/decorator/HttpAuth';
import { UserRole } from '@core/enums/UsersRoleEnum';
import { ResponsableAdapter } from '@infrastructure/adapters/ManagerAdapter';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpRestApiCreateResponsable } from '../documentation/HttpRestApiCreateResponsable';
import { CreateResponsableService } from '@domain/Responsable/service/CreateResponsableService';
import { HttpRestApiUpdateResponsable } from '../documentation/HttpRestApiUpdateResponsable';
import { UpdateResponsableService } from '@domain/Responsable/service/UpdateResponsableService';
@ApiTags('responsables')
@Controller('responsables')
export class ResponsablesController {
  constructor(
    @Inject(ResponsableDITokens.GetAllResponsablesService)
    private readonly getAllResponsablesService: GetAllResponsableService,
    @Inject(ResponsableDITokens.CreateResponsableService)
    private readonly createResponsableService: CreateResponsableService,
    @Inject(ResponsableDITokens.UpdateResponsableService)
    private readonly updateResponsableService: UpdateResponsableService,
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

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create Responsable',
    type: ResponsableAdapter,
  })
  @HttpAuth(UserRole.ADMIN)
  @Post('/')
  public async createResponsable(
    @Body() body: HttpRestApiCreateResponsable,
  ): Promise<ResponsableAdapter> {
    const responsable = await this.createResponsableService.execute(body);
    return ResponsableAdapter.newFromResponsable(responsable);
  }

  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'Update account status of responsable',
    type: ResponsableAdapter,
  })
  @HttpAuth(UserRole.ADMIN)
  @Put('/')
  public async updateResponsable(
    @Body() body: HttpRestApiUpdateResponsable,
  ): Promise<ResponsableAdapter> {
    const responsable = await this.updateResponsableService.execute(body);
    return ResponsableAdapter.newFromResponsable(responsable);
  }
}
