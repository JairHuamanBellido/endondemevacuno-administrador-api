import {MigrationInterface, QueryRunner} from "typeorm";

export class createInflowTable1649113441048 implements MigrationInterface {
    name = 'createInflowTable1649113441048'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "inflow" ("id" character varying NOT NULL, "people_entering" bigint NOT NULL, "created_at" TIMESTAMP NOT NULL, "vaccine_center_id" character varying, CONSTRAINT "PK_7460393d1b715127a85b9e936b9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "inflow" ADD CONSTRAINT "FK_fcbed7f8a5fa61e3ec18720e285" FOREIGN KEY ("vaccine_center_id") REFERENCES "vaccine_center"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inflow" DROP CONSTRAINT "FK_fcbed7f8a5fa61e3ec18720e285"`);
        await queryRunner.query(`ALTER TABLE "vaccine" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inventory" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vaccine_center" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ubigeo" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "authenticate_tracking" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "responsable" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "account" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`DROP TABLE "inflow"`);
    }

}
