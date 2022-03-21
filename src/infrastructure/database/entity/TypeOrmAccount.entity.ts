import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';
const bcrypt = require('bcrypt')

@Entity({ name: 'account' })
export class TypeOrmAccount {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'email', type: 'varchar', length: 255 })
  email: string;

  @Column({ name: 'password', type: 'varchar', length: 65 })
  password: string;

  @Column({ name: 'is_admin', type: 'bool' })
  is_admin: boolean;

  @Column({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @BeforeInsert()
  public async beforeInsert() {
    if (this.password) {
      const hashed = await bcrypt.hash(this.password, 10);
      this.password = hashed;
    }
  }
}
