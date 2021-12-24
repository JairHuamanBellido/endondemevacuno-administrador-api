import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { TypeOrmVaccine } from './TypeOrmVaccine.entity';
import { TypeOrmVaccineCenter } from './TypeOrmVaccineCenter.entity';

@Entity({ name: 'inventory' })
export class TypeOrmInventory {
  @PrimaryColumn()
  id: string;

  @ManyToOne(
    () => TypeOrmVaccineCenter,
    (vaccine_center) => vaccine_center.inventory,
  )
  @JoinColumn({ name: 'vaccine_center_id' })
  vaccine_center: TypeOrmVaccineCenter;

  @ManyToOne(() => TypeOrmVaccine, (vaccine) => vaccine.inventory)
  @JoinColumn({ name: 'vaccine_id' })
  vaccines: TypeOrmVaccine;

  @Column({ name: 'quantity', type: 'int' })
  quantity: number;

  @Column({ name: 'created_at', type: 'timestamp' })
  created_at: Date;
}
