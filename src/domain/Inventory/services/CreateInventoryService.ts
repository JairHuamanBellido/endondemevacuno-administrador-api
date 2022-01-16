import { HttpRestApiCreateInventory } from '@application/vaccine-center/documentation/HttpRestApiCreateInventory';
import { IVaccineRepository } from '@domain/Vaccine/interface/IVaccineRepository';
import { IVaccineCenterRepository } from '@domain/VaccineCenter/interface/IVaccineCenterRepository.interface';
import { IIventoryRepository } from '../interface/IIventoryRepository.interface';
import { Inventory } from '../model/Invetory';
import { v4 as uuidv4 } from 'uuid';

export class CreateInventoryService {
  constructor(
    private readonly inventoryRepository: IIventoryRepository,
    private readonly vaccineRepository: IVaccineRepository,
    private readonly vaccineCenterRepository: IVaccineCenterRepository,
  ) {}

  public async execute(
    payload: HttpRestApiCreateInventory,
    vaccineCenterId: string,
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

    const newInventory = await this.inventoryRepository.createEntity(inventory);

    return newInventory;
  }
}
