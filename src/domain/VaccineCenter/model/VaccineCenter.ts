import { HttpRestApiUpdateVaccineCenter } from '@application/vaccine-center/documentation/HttpRestApiUpdateVaccineCenter';
import { Inventory } from '@domain/Inventory/model/Invetory';
import { Responsable } from '@domain/Responsable/model/Responsable';
import { Ubigeo } from '@domain/Ubigeo/model/Ubigeo';
import { CreateVaccineCenterEntityPayload } from './types/CreateVaccineCenterEntityPayload';

export class VaccineCenter {
  private _id: string;
  private _name: string;
  private _direction: string;
  private _businessHour: string;
  private _isAvailable: boolean;
  private _localization: string;
  private _diris: string;
  private _createdAt: Date;
  private _ubigeo: Ubigeo;
  private _responable: Responsable;
  private _inventories: Inventory[];

  constructor(payload: CreateVaccineCenterEntityPayload) {
    this._businessHour = payload.businessHour;
    this._createdAt = payload.createdAt;
    this._direction = payload.direction;
    this._diris = payload.diris;
    this._id = payload.id;
    this._isAvailable = payload.isAvailable;
    this._localization = payload.localization;
    this._name = payload.name;
    this._ubigeo = payload.ubigeo;
    this._responable = payload.responsable;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get direction(): string {
    return this._direction;
  }
  get businessHour(): string {
    return this._businessHour;
  }

  get isAvailable(): boolean {
    return this._isAvailable;
  }

  get localization(): string {
    return this._localization;
  }

  get diris(): string {
    return this._diris;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get ubigeo() {
    return this._ubigeo;
  }

  get responsable() {
    return this._responable;
  }

  get inventories() {
    return this._inventories;
  }

  set inventories(inventories: Inventory[]) {
    this._inventories = inventories;
  }

  public edit(payload: HttpRestApiUpdateVaccineCenter): void {
    if (payload.endHour && payload.startHour) {
      this._businessHour = `${payload.startHour} -  ${payload.endHour}`;
    }
    if (payload.isAvailable !== undefined) {
      this._isAvailable = payload.isAvailable;
    }
  }
}
