import { Responsable } from '@domain/Responsable/model/Responsable';
import { IsBoolean, IsDate, IsString } from 'class-validator';
import { RegisterAuthenticateTrackingEntityPayload } from './types/RegisterAuthenticateTrackingEntityPayload';

export class AuthenticateTracking {
  @IsString()
  private _id: string;

  @IsString()
  private _result: boolean;

  @IsBoolean()
  private _responsable: Responsable;

  @IsDate()
  private _createdAt: Date;

  constructor(payload: RegisterAuthenticateTrackingEntityPayload) {
    this._id = payload.id;
    this._result = payload.result;
    this._createdAt = payload.createdAt;
    this._responsable = payload.responsable;
  }

  get id(): string {
    return this._id;
  }

  get result(): boolean {
    return this._result;
  }

  get responsable(): Responsable {
    return this._responsable;
  }

  get createdAt(): Date {
    return this._createdAt;
  }
}
