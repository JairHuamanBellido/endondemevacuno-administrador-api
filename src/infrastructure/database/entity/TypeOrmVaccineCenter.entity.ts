import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { TypeOrmInflow } from './TypeOrmInflow.entity';
import { TypeOrmInventory } from './TypeOrmInventory.entity';
import { TypeOrmResponsable } from './TypeOrmResponsable.entity';
import { TypeOrmUbigeo } from './TypeOrmUbigeo.entity';

@Entity({ name: 'vaccine_center' })
export class TypeOrmVaccineCenter {
  @PrimaryColumn()
  id: string;

  @OneToOne(() => TypeOrmResponsable)
  @JoinColumn({ name: 'responsable_id' })
  responsable: TypeOrmResponsable;

  @ManyToOne(() => TypeOrmUbigeo, (ubigeo) => ubigeo.vaccine_centers)
  @JoinColumn({ name: 'ubigeo_id' })
  ubigeo: TypeOrmUbigeo;

  @OneToMany(() => TypeOrmInventory, (inventory) => inventory.vaccine_center)
  inventory?: TypeOrmInventory[];

  @OneToMany(() => TypeOrmInflow, (inflow) => inflow.vaccine_center)
  inflow?: TypeOrmInflow[];

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'direction', type: 'varchar', length: 255 })
  direction: string;

  @Column({ name: 'business_hour', type: 'varchar', length: 50 })
  business_hour: string;

  @Column({ name: 'capacity', type: 'int' })
  capacity: number;

  @Column({ name: 'is_available', type: 'bool' })
  is_available: boolean;

  @Column({ name: 'localization', type: 'varchar' })
  localization: string;

  @Column({ name: 'diris', type: 'varchar', length: 50 })
  diris: string;

  @Column({ name: 'created_at', type: 'timestamp' })
  created_at: Date;
}
