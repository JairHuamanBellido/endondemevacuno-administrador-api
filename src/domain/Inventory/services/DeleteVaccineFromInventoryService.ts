import { IVaccineCenterRepositoryDynamoDB } from '@domain/VaccineCenter/interface/IvaccineCenterRepositoryDynamoDB.interface';
import { IVaccineCenterRepository } from '@domain/VaccineCenter/interface/IVaccineCenterRepository.interface';
import { VaccineCenter } from '@domain/VaccineCenter/model/VaccineCenter';
import { IIventoryRepository } from '../interface/IIventoryRepository.interface';

export class DeleteVaccineToInventoryService {
  constructor(
    private readonly inventoryRepository: IIventoryRepository,
    private readonly vaccineCenterRepository: IVaccineCenterRepository,
    private readonly vaccineCenterRepositoryDynamodDB: IVaccineCenterRepositoryDynamoDB,
  ) {}

  public async execute(vaccineCenterId: string, inventoryId: string) {
    const isDeleted = await this.inventoryRepository.deleteEntity({
      id: inventoryId,
    });
    const vaccineCenter = await this.vaccineCenterRepository.getBy({
      id: vaccineCenterId,
    });
    const newVaccineCenter = new VaccineCenter(vaccineCenter);
    const currentInventory = await this.inventoryRepository.getAll({
      vaccineCenterId: vaccineCenterId,
    });

    newVaccineCenter.inventories = currentInventory;
    await this.vaccineCenterRepositoryDynamodDB.updateVaccines(
      newVaccineCenter,
    );

    return isDeleted;
  }
}
