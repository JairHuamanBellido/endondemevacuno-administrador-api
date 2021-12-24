import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'account' })
export class TypeOrmAccount {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'email', type: 'varchar', length: 255 })
  email: string;

  @Column({ name: 'password', type: 'varchar', length: 50 })
  password: string;

  @Column({ name: 'is_admin', type: 'bool' })
  is_admin: boolean;

  @Column({ name: 'created_at', type: 'timestamp' })
  created_at: Date;
}
