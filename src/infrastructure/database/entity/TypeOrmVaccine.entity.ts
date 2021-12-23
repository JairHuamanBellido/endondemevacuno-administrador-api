import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { TypeOrmInventory } from './TypeOrmInventory.entity';

@Entity({ name: 'vaccine' })
export class TypeOrmVaccine {
  @PrimaryColumn()
  id: string;

  @OneToMany(() => TypeOrmInventory, (inventory) => inventory.vaccines)
  inventory: TypeOrmInventory;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'description', type: 'varchar', length: 255 })
  description: string;

  @Column({ name: 'created_at', type: 'time without time zone' })
  created_at: Date;
}
