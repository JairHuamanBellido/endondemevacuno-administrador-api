import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'account' })
export class TypeOrmAccount {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'email', type: 'varchar', length: 255 })
  email: string;

  @Column({ name: 'password', type: 'varchar', length: 50 })
  password: string;

  @Column({ name: 'is_admin', type: 'bool' })
  is_adming: string;

  @Column({ name: 'created_at', type: 'time without time zone' })
  created_at: Date;
}
