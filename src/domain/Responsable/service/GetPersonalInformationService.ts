import { HttpError } from '@core/types/HttpError';
import { HttpException, HttpStatus } from '@nestjs/common';
import { IResponsableRepository } from '../interface/IReponsableRepository.interface';
import { Responsable } from '../model/Responsable';

export class GetPersonalInformationService {
  constructor(private readonly responsableRepository: IResponsableRepository) {}

  public async execute(responsableId: string): Promise<Responsable> {
    const responsable: Responsable = await this.responsableRepository.getBy({
      id: responsableId,
    });

    if (!responsable) {
      this._notExistResponsable();
    }

    return responsable;
  }

  private _notExistResponsable(): HttpException {
    const httpError: HttpError = { message: 'Not found responsable' };
    throw new HttpException(httpError, HttpStatus.NOT_FOUND);
  }
}
