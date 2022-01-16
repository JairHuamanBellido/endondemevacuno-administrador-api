import { Responsable } from '@domain/Responsable/model/Responsable';
import { Ubigeo } from '@domain/Ubigeo/model/Ubigeo';
import { QueryVaccineCenterDto } from '../dto/infrastructure/QueryVaccineCenterDto';
import { VaccineCenter } from '../model/VaccineCenter';

export interface IVaccineCenterRepository {
  getBy(query: QueryVaccineCenterDto): Promise<VaccineCenter>;
  createEntity(vaccineCenter: VaccineCenter, responsable:Responsable, ubigeo:Ubigeo): Promise<VaccineCenter>;
}
