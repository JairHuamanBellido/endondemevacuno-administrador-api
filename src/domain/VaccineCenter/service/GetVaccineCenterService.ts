import { HttpError } from '@core/types/HttpError';
import {
  HttpException,
  HttpStatus,
  HttpVersionNotSupportedException,
} from '@nestjs/common';
import { IVaccineCenterRepository } from '../interface/IVaccineCenterRepository.interface';
import { VaccineCenter } from '../model/VaccineCenter';

export class GetVaccineCenterService {
  constructor(
    private readonly vaccineCenterRepository: IVaccineCenterRepository,
  ) {}

  public async execute(id: string): Promise<VaccineCenter> {
    const vaccineCenter = await this.vaccineCenterRepository.getBy({ id: id });

    if (!vaccineCenter) this._notFound();

    return vaccineCenter;
  }

  private _notFound(): HttpVersionNotSupportedException {
    const httpError: HttpError = {
      message: 'Centro de vacunación no encontrado',
    };
    throw new HttpException(httpError, HttpStatus.NOT_FOUND);
  }
}
