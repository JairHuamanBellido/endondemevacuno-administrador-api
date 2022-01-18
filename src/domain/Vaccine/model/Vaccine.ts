import { Disease } from '@domain/Disease/model/Disease';
import { CreateVaccineEntityPayload } from './types/CreateVaccineEntityPayload';

export class Vaccine {
  private _id: string;
  private _name: string;
  private _description: string;
  private _createdAt: Date;
  private _disease: Disease;

  constructor(payload: CreateVaccineEntityPayload) {
    this._id = payload.id;
    this._description = payload.description;
    this._name = payload.name;
    this._createdAt = payload.createdAt;
    this._disease = payload.disease;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get createdAt() {
    return this._createdAt;
  }

  get disease() {
    return this._disease;
  }
}
