import { QueryVaccineDto } from '../dto/infrastructure/QueryVaccineDto';
import { Vaccine } from '../model/Vaccine';

export interface IVaccineRepository {
  getBy(searchBy: QueryVaccineDto): Promise<Vaccine>;
}
