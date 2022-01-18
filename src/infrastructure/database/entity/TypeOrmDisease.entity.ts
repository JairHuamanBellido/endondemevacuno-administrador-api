import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { TypeOrmVaccine } from './TypeOrmVaccine.entity';

@Entity({ name: 'disease' })
export class TypeOrmDisease {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'description', type: 'varchar', length: 255 })
  description: string;

  @Column({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @OneToMany(() => TypeOrmVaccine, (vaccine) => vaccine.disease)
  vaccine?: TypeOrmVaccine;
}
