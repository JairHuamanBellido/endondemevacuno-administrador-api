import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { TypeOrmResponsable } from './TypeOrmResponsable.entity';

@Entity({ name: 'authenticate_tracking' })
export class TypeOrmAuthenticateTracking {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => TypeOrmResponsable)
  @JoinColumn({ name: 'responsable_id' })
  responsable: TypeOrmResponsable;

  @Column({ name: 'result', type: 'bool' })
  result: boolean;

  @Column({ name: 'created_at', type: 'timestamp' })
  created_at: Date;
}
