import { HttpRestApiUpdateVaccineCenter } from '@application/vaccine-center/documentation/HttpRestApiUpdateVaccineCenter';
import { HttpError } from '@core/types/HttpError';
import { HttpException, HttpStatus } from '@nestjs/common';
import { IVaccineCenterRepository } from '../interface/IVaccineCenterRepository.interface';
import { VaccineCenter } from '../model/VaccineCenter';

export class UpdateVaccineCenterService {
  constructor(
    private readonly vaccineCenterRepository: IVaccineCenterRepository,
  ) {}

  public async execute(
    payload: HttpRestApiUpdateVaccineCenter,
  ): Promise<VaccineCenter> {
    const vaccineCenter = await this.vaccineCenterRepository.getBy({
      id: payload.id,
    });

    if (!vaccineCenter) this._notFound();

    vaccineCenter.edit(payload);

    await this.vaccineCenterRepository.updateEntity(vaccineCenter);

    return vaccineCenter;
  }

  private _notFound(): HttpException {
    const httpError: HttpError = {
      message: 'Centro de vacunación no encontrado',
    };
    throw new HttpException(httpError, HttpStatus.NOT_FOUND);
  }
}
