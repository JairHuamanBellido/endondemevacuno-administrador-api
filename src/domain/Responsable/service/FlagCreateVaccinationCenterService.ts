import { HttpError } from '@core/types/HttpError';
import { HttpRestApiFlagResponse as Response } from '@core/types/HttpRestApiFlagResponse';
import { IVaccineCenterRepository } from '@domain/VaccineCenter/interface/IVaccineCenterRepository.interface';
import { HttpException, HttpStatus } from '@nestjs/common';
import { IResponsableRepository } from '../interface/IReponsableRepository.interface';

export class FlagCreateVaccinationCenterService {
  constructor(
    private readonly responsableRepository: IResponsableRepository,
    private readonly vaccineCenterRepository: IVaccineCenterRepository,
  ) {}
  public async execute(responsableId: string): Promise<Response> {
    const responsable = await this.responsableRepository.getBy({
      id: responsableId,
    });

    if (!responsable) {
      this._notExistResponsable();
    }
    const isVaccineCenterExist = await this.vaccineCenterRepository.getBy({
      responsableId: responsable.id,
    });

    return { flag: !isVaccineCenterExist ? true : false };
  }

  private _notExistResponsable(): HttpException {
    const httpError: HttpError = { message: 'Not found responsable' };
    throw new HttpException(httpError, HttpStatus.NOT_FOUND);
  }
}
