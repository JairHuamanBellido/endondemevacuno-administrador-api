import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { TypeOrmVaccineCenter } from './TypeOrmVaccineCenter.entity';

@Entity({ name: 'ubigeo' })
export class TypeOrmUbigeo {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'department', type: 'varchar', length: 255 })
  department: string;

  @Column({ name: 'province', type: 'varchar', length: 255 })
  province: string;

  @Column({ name: 'district', type: 'varchar', length: 255 })
  district: string;

  @Column({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @OneToMany(
    () => TypeOrmVaccineCenter,
    (vaccine_center) => vaccine_center.ubigeo,
  )
  vaccine_centers?: TypeOrmVaccineCenter[] | null;
}
