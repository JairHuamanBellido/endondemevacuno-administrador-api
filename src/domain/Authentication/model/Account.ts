import { IsBoolean, IsDate, IsString } from 'class-validator';
import { CreateAccountEntityPayload } from './types/CreateAccountEntityPayload';

export class Account {
  @IsString()
  private _id: string;

  @IsString()
  private _email: string;

  @IsString()
  private _password: string;

  @IsBoolean()
  private _isAdmin: boolean;

  @IsDate()
  private _createdAt: Date;

  constructor(payload: CreateAccountEntityPayload) {
    this._id = payload.id;
    this._email = payload.email;
    this._password = payload.password;
    this._createdAt = payload.createdAt;
    this._isAdmin = payload.isAdmin;
  }

  get id(): string {
    return this._id;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }
  get isAdmin(): boolean {
    return this._isAdmin;
  }

  get createdAt(): Date {
    return this._createdAt;
  }
}
