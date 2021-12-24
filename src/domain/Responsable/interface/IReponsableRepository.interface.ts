import { QueryResponsableDto } from '../dto/infrastructure/QueryResponsableDto';
import { Responsable } from '../model/Responsable';

export interface IResponsableRepository {
  getBy(queryResponsableDto: QueryResponsableDto): Promise<Responsable>;
  getAll(): Promise<Responsable[]>;
  createEntity(responable: Responsable): Promise<Responsable>;
  findBy(queryResponsableDto: QueryResponsableDto): Promise<Responsable[]>;
}
