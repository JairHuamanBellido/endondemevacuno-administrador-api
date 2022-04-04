import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { TypeOrmVaccineCenter } from './TypeOrmVaccineCenter.entity';

@Entity({ name: 'inflow' })
export class TypeOrmInflow {
  @PrimaryColumn()
  id: string;

  @ManyToOne(
    () => TypeOrmVaccineCenter,
    (vaccine_center) => vaccine_center.inflow,
  )
  @JoinColumn({ name: 'vaccine_center_id' })
  vaccine_center: TypeOrmVaccineCenter;

  @Column({ name: 'people_entering', type: 'int8' })
  people_entering: number;

  @Column({ name: 'created_at', type: 'timestamp' })
  created_at: Date;
}
