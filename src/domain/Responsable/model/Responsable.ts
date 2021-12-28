import { HttpRestApiUpdateResponsable } from '@application/responsable/documentation/HttpRestApiUpdateResponsable';
import { Account } from '@domain/Authentication/model/Account';
import { CreateResponsableEntityPayload } from './types/CreateResponsableEntityPayload';

export class Responsable {
  private _id: string;
  private _account: Account;
  private _dni: string;
  private _name: string;
  private _lastname: string;
  private _isEnabled: boolean;
  private _createdAt: Date;

  constructor(payload: CreateResponsableEntityPayload) {
    this._id = payload.id;
    this._createdAt = payload.createdAt;
    this._dni = payload.dni;
    this._isEnabled = payload.isEnabled;
    this._lastname = payload.lastname;
    this._name = payload.name;
    this._account = payload.account;
  }

  get id(): string {
    return this._id;
  }

  get dni(): string {
    return this._dni;
  }

  get name(): string {
    return this._name;
  }

  get lastname(): string {
    return this._lastname;
  }

  get isEnabled(): boolean {
    return this._isEnabled;
  }
  set isEnabled(isEnabled: boolean) {
    this._isEnabled = isEnabled;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get account(): Account {
    return this._account;
  }

  set account(account: Account) {
    this._account = account;
  }

  public edit(payload: HttpRestApiUpdateResponsable) {
    if (payload.isEnabled !== undefined) this.isEnabled = payload.isEnabled;
    if (payload.lastname !== undefined) this._lastname = payload.lastname;
    if (payload.name !== undefined) this._name = payload.name;
  }
}
