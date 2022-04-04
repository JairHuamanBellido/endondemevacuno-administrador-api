import { VaccineCenter } from '@domain/VaccineCenter/model/VaccineCenter';

export type CreateInflowEntityPayload = {
  id: string;
  vaccineCenter: VaccineCenter;
  peopleEntering: number;
  createdAt: Date;
};
