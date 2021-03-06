import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { TypeOrmAccount } from './TypeOrmAccount.entity';
import { TypeOrmAuthenticateTracking } from './TypeOrmAuthenticateTracking.entity';

@Entity({ name: 'responsable' })
export class TypeOrmResponsable {
  @PrimaryColumn()
  id: string;

  @OneToOne(() => TypeOrmAccount)
  @JoinColumn({ name: 'account_id' })
  account: TypeOrmAccount;

  @OneToMany(() => TypeOrmAuthenticateTracking, authenticateTracking => authenticateTracking.responsable)
  authenticateTrackings?: TypeOrmAuthenticateTracking[];

  @Column({ name: 'dni', type: 'varchar', length: 8 })
  dni: string;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'lastname', type: 'varchar', length: 255 })
  lastname: string;

  @Column({ name: 'is_enabled', type: 'boolean' })
  is_enabled: boolean;

  @Column({ name: 'created_at', type: 'timestamp' })
  created_at: Date;
}
