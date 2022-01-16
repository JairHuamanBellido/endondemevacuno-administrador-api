import { QueryInventoryDto } from '../dto/infrastructure/QueryInventoryDto';
import { Inventory } from '../model/Invetory';

export interface IIventoryRepository {
  getBy(searchBy: QueryInventoryDto): Promise<Inventory>;
  createEntity(entity:Inventory): Promise<Inventory>
}
