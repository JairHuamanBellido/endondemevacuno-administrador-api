import { CreateVaccineCenterEntityPayload } from './types/CreateVaccineCenterEntityPayload';

export class VaccineCenter {
  private _id: string;
  private _ubigeo: any;
  private _name: string;
  private _direction: string;
  private _businessHour: string;
  private _isAvailable: boolean;
  private _localization: string;
  private _diris: string;
  private _createdAt: Date;

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
  }

  get id(): string {
    return this._id;
  }

  get ubigeo(): any {
    return this._ubigeo;
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
}
