import { ManyToOne } from 'typeorm';
import { JoinColumn } from 'typeorm';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { TypeOrmDisease } from './TypeOrmDisease.entity';
import { TypeOrmInventory } from './TypeOrmInventory.entity';

@Entity({ name: 'vaccine' })
export class TypeOrmVaccine {
  @PrimaryColumn()
  id: string;

  @OneToMany(() => TypeOrmInventory, (inventory) => inventory.vaccines)
  inventory?: TypeOrmInventory;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'description', type: 'varchar', length: 255 })
  description: string;

  @Column({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @ManyToOne(() => TypeOrmDisease, (disease) => disease.vaccine)
  @JoinColumn({ name: 'disease_id' })
  disease: TypeOrmDisease;
}
