import { HttpRestApiCreateInventory } from '@application/vaccine-center/documentation/HttpRestApiCreateInventory';
import { IVaccineRepository } from '@domain/Vaccine/interface/IVaccineRepository';
import { IVaccineCenterRepository } from '@domain/VaccineCenter/interface/IVaccineCenterRepository.interface';
import { IIventoryRepository } from '../interface/IIventoryRepository.interface';
import { Inventory } from '../model/Invetory';
import { v4 as uuidv4 } from 'uuid';
import { IVaccineCenterRepositoryDynamoDB } from '@domain/VaccineCenter/interface/IvaccineCenterRepositoryDynamoDB.interface';
import { VaccineCenter } from '@domain/VaccineCenter/model/VaccineCenter';

export class CreateInventoryService {
  constructor(
    private readonly inventoryRepository: IIventoryRepository,
    private readonly vaccineRepository: IVaccineRepository,
    private readonly vaccineCenterRepository: IVaccineCenterRepository,
    private readonly vaccineCenterRepositoryDynamoDb: IVaccineCenterRepositoryDynamoDB,
  ) {}

  public async execute(
    payload: HttpRestApiCreateInventory,
    vaccineCenterId: string,
    isForDynamoDB = false,
  ): Promise<Inventory> {
    const vaccine = await this.vaccineRepository.getBy({
      id: payload.vaccineId,
    });
    const vaccineCenter = await this.vaccineCenterRepository.getBy({
      id: vaccineCenterId,
    });
    const inventory = new Inventory({
      createdAt: new Date(),
      id: uuidv4(),
      quantity: payload.quantity,
      vaccine: vaccine,
      vaccineCenter: vaccineCenter,
    });

    const currentInventory = await this.inventoryRepository.getAll({
      vaccineCenterId: vaccineCenterId,
    });
    const newInventory = await this.inventoryRepository.createEntity(inventory);
    if (isForDynamoDB) {
      const vaccineCenterNew = new VaccineCenter(vaccineCenter);
      vaccineCenterNew.inventories = [...currentInventory, newInventory];
      await this.vaccineCenterRepositoryDynamoDb.updateVaccines(
        vaccineCenterNew,
      );
    }
    return newInventory;
  }
}
