import { IVaccineRepository } from '../interface/IVaccineRepository';
import { Vaccine } from '../model/Vaccine';

export class GetAllVacinesService {
  constructor(private readonly vaccineRepository: IVaccineRepository) {}

  public async execute(): Promise<Vaccine[]> {
    return await this.vaccineRepository.getAll();
  }
}
