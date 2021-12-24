import { MigrationInterface, QueryRunner } from 'typeorm';

export class updatTimezoneAllTables1640364424896 implements MigrationInterface {
  name = 'updatTimezoneAllTables1640364424896';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "responsable" DROP COLUMN "created_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "responsable" ADD "created_at" TIMESTAMP NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "authenticate_tracking" DROP COLUMN "created_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "authenticate_tracking" ADD "created_at" TIMESTAMP NULL`,
    );
    await queryRunner.query(`ALTER TABLE "vaccine" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "vaccine" ADD "created_at" TIMESTAMP NULL`,
    );
    await queryRunner.query(`ALTER TABLE "ubigeo" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "ubigeo" ADD "created_at" TIMESTAMP NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "vaccine_center" DROP COLUMN "created_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vaccine_center" ADD "created_at" TIMESTAMP NULL`,
    );
    await queryRunner.query(`ALTER TABLE "inventory" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "inventory" ADD "created_at" TIMESTAMP NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "inventory" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "inventory" ADD "created_at" TIME NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "vaccine_center" DROP COLUMN "created_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vaccine_center" ADD "created_at" TIME NULL`,
    );
    await queryRunner.query(`ALTER TABLE "ubigeo" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "ubigeo" ADD "created_at" TIME NULL`);
    await queryRunner.query(`ALTER TABLE "vaccine" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "vaccine" ADD "created_at" TIME NULL`);
    await queryRunner.query(
      `ALTER TABLE "authenticate_tracking" DROP COLUMN "created_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "authenticate_tracking" ADD "created_at" TIME NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "responsable" DROP COLUMN "created_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "responsable" ADD "created_at" TIME NULL`,
    );
  }
}
