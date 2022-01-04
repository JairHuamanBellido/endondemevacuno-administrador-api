import { QueryVaccineCenterDto } from '../dto/infrastructure/QueryVaccineCenterDto';
import { VaccineCenter } from '../model/VaccineCenter';

export interface IVaccineCenterRepository {
  getBy(query: QueryVaccineCenterDto): Promise<VaccineCenter>;
}
