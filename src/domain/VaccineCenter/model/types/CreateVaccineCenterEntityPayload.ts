import { Responsable } from '@domain/Responsable/model/Responsable';
import { Ubigeo } from '@domain/Ubigeo/model/Ubigeo';

export type CreateVaccineCenterEntityPayload = {
  id: string;
  name: string;
  direction: string;
  businessHour: string;
  isAvailable: boolean;
  localization: string;
  capacity: number;
  diris: string;
  createdAt: Date;
  ubigeo: Ubigeo;
  responsable: Responsable;
};
