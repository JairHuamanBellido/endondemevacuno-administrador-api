import { HttpRestApiUpdateResponsable as Payload } from '@application/responsable/documentation/HttpRestApiUpdateResponsable';
import { HttpError } from '@core/types/HttpError';
import { HttpException, HttpStatus } from '@nestjs/common';
import { IResponsableRepository } from '../interface/IReponsableRepository.interface';
import { Responsable } from '../model/Responsable';

export class UpdateResponsableService {
  constructor(private readonly responsableRepository: IResponsableRepository) {}

  public async execute(payload: Payload): Promise<Responsable> {
    const responsable: Responsable = await this.responsableRepository.getBy({
      id: payload.id,
    });
    if (!responsable) {
      this.notFound();
    }
    responsable.edit(payload);

    return await this.responsableRepository.updateEntity(responsable);
  }

  private notFound(): HttpException {
    const httpError: HttpError = { message: 'Entity not found' };
    throw new HttpException(httpError, HttpStatus.NOT_FOUND);
  }
}
