import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDiseaseTable1642473902212 implements MigrationInterface {
    name = 'AddDiseaseTable1642473902212'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "disease" ("id" character varying NOT NULL, "name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_f7a8573a47cdc044735eda4644b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "vaccine" ADD "disease_id" character varying`);
        await queryRunner.query(`ALTER TABLE "vaccine" ADD CONSTRAINT "FK_ec161901960f7b62a6838f1aad1" FOREIGN KEY ("disease_id") REFERENCES "disease"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vaccine" DROP CONSTRAINT "FK_ec161901960f7b62a6838f1aad1"`);
        await queryRunner.query(`ALTER TABLE "inventory" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vaccine_center" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ubigeo" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vaccine" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "authenticate_tracking" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "responsable" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "account" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vaccine" DROP COLUMN "disease_id"`);
        await queryRunner.query(`DROP TABLE "disease"`);
    }

}
