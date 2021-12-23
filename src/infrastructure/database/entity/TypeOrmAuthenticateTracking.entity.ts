import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { TypeOrmResponsable } from './TypeOrmResponsable.entity';

@Entity({ name: 'authenticate_tracking' })
export class TypeOrmAuthenticateTracking {
  @PrimaryColumn()
  id: string;

  @OneToOne(() => TypeOrmResponsable)
  @JoinColumn({ name: 'responsable_id' })
  responable: TypeOrmResponsable;

  @Column({ name: 'result', type: 'bool' })
  result: boolean;

  @Column({ name: 'created_at', type: 'time without time zone' })
  created_at: Date;
}
