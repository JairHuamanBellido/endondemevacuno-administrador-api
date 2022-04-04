import { VaccineCenter } from '@domain/VaccineCenter/model/VaccineCenter';
import { CreateInflowEntityPayload } from './types/CreateInflowEntityPayload';

export class Inflow {
  private _id: string;
  private _vaccineCenter: VaccineCenter;
  private _peopleEntering: number;
  private _createdAt: Date;

  constructor(payload: CreateInflowEntityPayload) {
    this._id = payload.id;
    this._vaccineCenter = payload.vaccineCenter;
    this._peopleEntering = payload.peopleEntering;
    this._createdAt = payload.createdAt;
  }

  get id() {
    return this._id;
  }

  get vaccineCenter() {
    return this._vaccineCenter;
  }

  get createdAt() {
    return this._createdAt;
  }

  get peopleEntering() {
    return this._peopleEntering;
  }
}
