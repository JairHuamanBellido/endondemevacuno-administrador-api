import { QueryInflowDto } from '../dto/infrastructure/QueryInflowDto';
import { Inflow } from '../model/Inflow';
export interface IInflowRepository {
  findBy(searchBy: QueryInflowDto): Promise<Inflow[]>;
  createEntity(inflow: Inflow): Promise<Inflow>;
}
