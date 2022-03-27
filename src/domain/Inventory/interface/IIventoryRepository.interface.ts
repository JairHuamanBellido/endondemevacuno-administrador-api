import { QueryInventoryDto } from '../dto/infrastructure/QueryInventoryDto';
import { Inventory } from '../model/Invetory';

export interface IIventoryRepository {
  getBy(searchBy: QueryInventoryDto): Promise<Inventory>;
  createEntity(entity: Inventory): Promise<Inventory>;
  getAll(searchBy: QueryInventoryDto): Promise<Inventory[]>;
  deleteEntity(searchBy: QueryInventoryDto): Promise<boolean>;
}
