import { Vaccine } from '@domain/Vaccine/model/Vaccine';
import { VaccineCenter } from '@domain/VaccineCenter/model/VaccineCenter';
import { CreateInventoryEntityPayload } from './types/CreateInventoryEntityPayload';

export class Inventory {
  private _id: string;
  private _quantity: number;
  private _createdAt: Date;
  private _vaccine: Vaccine;
  private _vaccineCenter: VaccineCenter;

  constructor(payload: CreateInventoryEntityPayload) {
    this._createdAt = payload.createdAt;
    this._id = payload.id;
    this._quantity = payload.quantity;
    this._vaccine = payload.vaccine;
    this._vaccineCenter = payload.vaccineCenter;
  }

  get id() {
    return this._id;
  }

  get quantity() {
    return this._quantity;
  }

  get createdAt() {
    return this._createdAt;
  }

  get vaccine() {
    return this._vaccine;
  }
  get vaccineCenter() {
    return this._vaccineCenter;
  }
}
