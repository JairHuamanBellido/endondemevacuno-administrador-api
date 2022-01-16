import { Inventory } from '@domain/Inventory/model/Invetory';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, plainToInstance, Type } from 'class-transformer';
import { VaccineAdapter } from './VaccineAdapter';

export class InventoryAdapter {
  @Expose()
  @ApiProperty()
  public id: string;

  @Expose()
  @ApiProperty()
  public quantity: number;

  @Exclude()
  @ApiProperty()
  public createdAt: Date;

  @Expose()
  @Type(() => VaccineAdapter)
  @ApiProperty()
  public vaccine: VaccineAdapter;

  public static newFromInventory(inventory: Inventory): InventoryAdapter {
    return plainToInstance(InventoryAdapter, inventory, {
      excludePrefixes: ['_'],
    });
  }
  public static newListFromInventories(
    inventories: Inventory[],
  ): InventoryAdapter[] {
    return inventories.map((inventory) => this.newFromInventory(inventory));
  }
}
