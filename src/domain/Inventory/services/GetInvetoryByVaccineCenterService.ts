import { HttpException, HttpStatus } from '@nestjs/common';
import { IIventoryRepository } from '../interface/IIventoryRepository.interface';
import { HttpError } from '@core/types/HttpError';

export class GetInvetoryByVaccineCenterService {
  constructor(private readonly inventoryRepository: IIventoryRepository) {}

  public async execute(vaccineCenterId: string) {
    const inventory = await this.inventoryRepository.getAll({
      vaccineCenterId: vaccineCenterId,
    });
    if (!inventory) this._notExist();

    return inventory;
  }

  private _notExist(): HttpException {
    const httpError: HttpError = {
      message: 'No existe inventario',
    };
    throw new HttpException(httpError, HttpStatus.NOT_FOUND);
  }
}
