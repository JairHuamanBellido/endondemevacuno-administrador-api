import { IResponsableRepository } from '../interface/IReponsableRepository.interface';
import { Responsable } from '../model/Responsable';

export class GetAllResponsableService {
  constructor(private readonly responsableRepository: IResponsableRepository) {}

  public async execute(): Promise<Responsable[]> {
    const responsables: Responsable[] =
      await this.responsableRepository.getAll();

    return responsables;
  }
}
