import { CreateDiseaseEntityPayload } from './types/CreateDiseaseEntityPayload';

export class Disease {
  private _id: string;
  private _name: string;
  private _description: string;
  private _createdAt: Date;

  constructor(payload: CreateDiseaseEntityPayload) {
    this._createdAt = payload.createdAt;
    this._description = payload.description;
    this._id = payload.id;
    this._name = payload.name;
  }

  get createdAt() {
    return this._createdAt;
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get id() {
    return this._id;
  }
}
