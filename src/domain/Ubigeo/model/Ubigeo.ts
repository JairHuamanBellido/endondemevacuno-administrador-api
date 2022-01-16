import { CreateUbigeoEntityPayload } from './types/CreateUbigeoEntityPayload';

export class Ubigeo {
  private _id: string;
  private _department: string;
  private _province: string;
  private _district: string;
  private _createdAt: Date;

  constructor(payload: CreateUbigeoEntityPayload) {
    this._department = payload.department;
    this._district = payload.district;
    this._id = payload.id;
    this._province = payload.province;
    this._createdAt = payload.createdAt;
  }

  get id(): string {
    return this._id;
  }

  get department(): string {
    return this._department;
  }

  get province(): string {
    return this._province;
  }

  get district(): string {
    return this._district;
  }

  get createdAt(): Date {
    return this._createdAt;
  }
}
