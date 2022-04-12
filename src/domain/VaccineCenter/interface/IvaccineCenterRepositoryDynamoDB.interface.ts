import { VaccineCenter } from '../model/VaccineCenter';
export interface IVaccineCenterRepositoryDynamoDB {
  create(vaccineCenter: VaccineCenter);
  update(vaccineCenter: VaccineCenter);
  updateVaccines(vaccineCenter: VaccineCenter);
}
