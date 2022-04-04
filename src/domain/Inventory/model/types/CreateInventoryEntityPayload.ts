import { Vaccine } from '@domain/Vaccine/model/Vaccine';
import { VaccineCenter } from '@domain/VaccineCenter/model/VaccineCenter';

export type CreateInventoryEntityPayload = {
  id: string;
  quantity: number;
  createdAt: Date;
  vaccine: Vaccine;
  vaccineCenter: VaccineCenter;
};
