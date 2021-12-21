import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TypeOrmAccount } from './TypeOrmAccount.entity';

@Entity({ name: 'responsable' })
export class TypeOrmResponsable {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToOne(() => TypeOrmAccount)
  @JoinColumn({ name: 'account_id' })
  account: TypeOrmAccount;

  @Column({ name: 'dni', type: 'varchar', length: 8 })
  dni: string;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'lastname', type: 'varchar', length: 255 })
  lastname: string;

  @Column({ name: 'is_enabled', type: 'boolean' })
  is_enabled: boolean;

  @Column({ name: 'created_at', type: 'time without time zone' })
  created_at: Date;
}
