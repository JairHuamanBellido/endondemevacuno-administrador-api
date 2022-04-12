import { IVaccineCenterRepository } from '@domain/VaccineCenter/interface/IVaccineCenterRepository.interface';
import { IInflowRepository } from '@domain/Inflow/interface/IInflowRepository.interface';
import { Inflow } from '@domain/Inflow/model/Inflow';
import { HttpRestApiCreateInflow } from '@application/inflow/documentation/HttpRestApiCreateInflow';
import { v4 as uuidv4 } from 'uuid';

export class CreateInflowService {
  constructor(
    private readonly vaccineCenterRepository: IVaccineCenterRepository,
    private readonly inflowRepository: IInflowRepository,
  ) {}
  public async execute(payload: HttpRestApiCreateInflow) {
    const vaccineCenter = await this.vaccineCenterRepository.getBy({
      id: payload.vaccineCenterId,
    });

    const date = new Date(payload.createdAt);
    date.setHours(date.getHours() + 5);
    const inflow = new Inflow({
      createdAt: date,
      id: uuidv4(),
      peopleEntering: payload.peopleEntering,
      vaccineCenter: vaccineCenter,
    });

    return await this.inflowRepository.createEntity(inflow);
  }
}
