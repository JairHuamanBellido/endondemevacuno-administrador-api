import { Responsable } from '../model/Responsable';

export interface IResponsableRepository {
  getAll(): Promise<Responsable[]>;
}
