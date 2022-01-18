import { Disease } from '@domain/Disease/model/Disease';
export type CreateVaccineEntityPayload = {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  disease: Disease;
};
