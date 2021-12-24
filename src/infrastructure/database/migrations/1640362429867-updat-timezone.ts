import { MigrationInterface, QueryRunner } from 'typeorm';

export class updatTimezone1640362429867 implements MigrationInterface {
  name = 'updatTimezone1640362429867';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "account" ADD "created_at" TIMESTAMP  NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "account" ADD "created_at" TIME NOT NULL`,
    );
  }
}
