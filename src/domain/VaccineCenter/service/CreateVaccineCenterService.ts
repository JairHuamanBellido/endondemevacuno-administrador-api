import { HttpRestApiCreateVaccineCenter as Payload } from '@application/vaccine-center/documentation/HttpRestApiCreateVaccineCenter';
import { HttpError } from '@core/types/HttpError';
import { IUbigeoRepository } from '@domain/Ubigeo/interface/IUbigeoRepository.interface';
import { HttpException, HttpStatus } from '@nestjs/common';
import { IVaccineCenterRepository } from '../interface/IVaccineCenterRepository.interface';
import { VaccineCenter } from '../model/VaccineCenter';
import { v4 as uuidv4 } from 'uuid';
import { IResponsableRepository } from '@domain/Responsable/interface/IReponsableRepository.interface';
import { FlagCreateVaccinationCenterService } from '@domain/Responsable/service/FlagCreateVaccinationCenterService';
import { CreateInventoryService } from '@domain/Inventory/services/CreateInventoryService';
import { Inventory } from '@domain/Inventory/model/Invetory';
import { IVaccineCenterRepositoryDynamoDB } from '../interface/IvaccineCenterRepositoryDynamoDB.interface';

export class CreateVaccineCenterService {
  constructor(
    private readonly vaccineCenterRepository: IVaccineCenterRepository,
    private readonly ubigeoRepository: IUbigeoRepository,
    private readonly responsableRepository: IResponsableRepository,
    private readonly validateIfAbleToCreate: FlagCreateVaccinationCenterService,
    private readonly createInventoryService: CreateInventoryService,
    private readonly vaccineCenterDynamoDBRepository: IVaccineCenterRepositoryDynamoDB,
  ) {}

  public async execute(payload: Payload, responsableId: string) {
    const responsable = await this.responsableRepository.getBy({
      id: responsableId,
    });
    const { flag } = await this.validateIfAbleToCreate.execute(responsableId);
    const isEntityExist = await this.vaccineCenterRepository.getBy({
      name: payload.name,
    });

    if (!responsable) this._responsableNotFound();

    if (!flag) this._alreadyCreateVaccineCenter();

    if (isEntityExist) this._entityExist();

    const ubigeo = await this.ubigeoRepository.getBy({ id: payload.ubigeoId });

    const vaccineCenter: VaccineCenter = new VaccineCenter({
      businessHour: payload.businessHour,
      createdAt: new Date(),
      direction: payload.direction,
      diris: payload.diris,
      id: uuidv4(),
      isAvailable: true,
      localization: payload.localization,
      name: payload.name,
      responsable: responsable,
      ubigeo: ubigeo,
      capacity: payload.capacity,
    });

    const newVaccineCenter = await this.vaccineCenterRepository.createEntity(
      vaccineCenter,
      responsable,
      ubigeo,
    );

    const inventories: Inventory[] = [];

    for await (const iterator of payload.vaccines) {
      const newInventory = await this.createInventoryService.execute(
        iterator,
        newVaccineCenter.id,
      );
      inventories.push(newInventory);
    }
    newVaccineCenter.inventories = inventories;

    await this.vaccineCenterDynamoDBRepository.create(newVaccineCenter);

    return newVaccineCenter;
  }

  private _entityExist(): HttpException {
    const httpError: HttpError = {
      message: 'El nombre del centro de vacunación ya existe',
    };
    throw new HttpException(httpError, HttpStatus.CONFLICT);
  }

  private _responsableNotFound(): HttpException {
    const httpError: HttpError = {
      message: 'El responsable no existe',
    };
    throw new HttpException(httpError, HttpStatus.NOT_FOUND);
  }

  private _alreadyCreateVaccineCenter(): HttpException {
    const httpError: HttpError = {
      message: 'El responsable ya ha creado un centro de vacunación',
    };
    throw new HttpException(httpError, HttpStatus.CONFLICT);
  }
}
