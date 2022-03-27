import { IIventoryRepository } from '../interface/IIventoryRepository.interface';

export class DeleteVaccineToInventoryService {
  constructor(private readonly inventoryRepository: IIventoryRepository) {}

  public async execute(inventoryId: string) {
    const isDeleted = await this.inventoryRepository.deleteEntity({
      id: inventoryId,
    });
    return isDeleted;
  }
}
