import {MigrationInterface, QueryRunner} from "typeorm";

export class initialTables1640101311197 implements MigrationInterface {
    name = 'initialTables1640101311197'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "account" ("id" SERIAL NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(50) NOT NULL, "is_admin" boolean NOT NULL, "created_at" TIME NOT NULL, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "responsable" ("id" SERIAL NOT NULL, "dni" character varying(8) NOT NULL, "name" character varying(255) NOT NULL, "lastname" character varying(255) NOT NULL, "is_enabled" boolean NOT NULL, "created_at" TIME NOT NULL, "account_id" integer, CONSTRAINT "REL_2b29916447b393add867638fcd" UNIQUE ("account_id"), CONSTRAINT "PK_4a49c7b18592ee4ee474538cf7c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "authenticate_tracking" ("id" SERIAL NOT NULL, "result" boolean NOT NULL, "created_at" TIME NOT NULL, "responsable_id" integer, CONSTRAINT "REL_3da89a284e9efa891055fd6e10" UNIQUE ("responsable_id"), CONSTRAINT "PK_ef46fbbd093bf2c222179a1dc5b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vaccine" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "created_at" TIME NOT NULL, CONSTRAINT "PK_3879829f8d2e396157ebffab918" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ubigeo" ("id" SERIAL NOT NULL, "department" character varying(255) NOT NULL, "province" character varying(255) NOT NULL, "district" character varying(255) NOT NULL, "created_at" TIME NOT NULL, CONSTRAINT "PK_0694cc46b01fb7e212e5901c87e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vaccine_center" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "direction" character varying(255) NOT NULL, "business_hour" character varying(50) NOT NULL, "is_available" boolean NOT NULL, "localization" character varying NOT NULL, "diris" character varying(50) NOT NULL, "created_at" TIME NOT NULL, "ubigeo_id" integer, CONSTRAINT "PK_447c70b701506706fe8c475ea3f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "inventory" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "created_at" TIME NOT NULL, "vaccine_center_id" integer, "vaccine_id" integer, CONSTRAINT "PK_82aa5da437c5bbfb80703b08309" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "responsable" ADD CONSTRAINT "FK_2b29916447b393add867638fcd6" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "authenticate_tracking" ADD CONSTRAINT "FK_3da89a284e9efa891055fd6e102" FOREIGN KEY ("responsable_id") REFERENCES "responsable"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vaccine_center" ADD CONSTRAINT "FK_d684eb8e2e1f90f0ec7122dbaa2" FOREIGN KEY ("ubigeo_id") REFERENCES "ubigeo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD CONSTRAINT "FK_e8406252266c9ebfe7d3f3892c8" FOREIGN KEY ("vaccine_center_id") REFERENCES "vaccine_center"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD CONSTRAINT "FK_ca7fe48915fc9efbf4bf7e225ba" FOREIGN KEY ("vaccine_id") REFERENCES "vaccine"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "FK_ca7fe48915fc9efbf4bf7e225ba"`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "FK_e8406252266c9ebfe7d3f3892c8"`);
        await queryRunner.query(`ALTER TABLE "vaccine_center" DROP CONSTRAINT "FK_d684eb8e2e1f90f0ec7122dbaa2"`);
        await queryRunner.query(`ALTER TABLE "authenticate_tracking" DROP CONSTRAINT "FK_3da89a284e9efa891055fd6e102"`);
        await queryRunner.query(`ALTER TABLE "responsable" DROP CONSTRAINT "FK_2b29916447b393add867638fcd6"`);
        await queryRunner.query(`DROP TABLE "inventory"`);
        await queryRunner.query(`DROP TABLE "vaccine_center"`);
        await queryRunner.query(`DROP TABLE "ubigeo"`);
        await queryRunner.query(`DROP TABLE "vaccine"`);
        await queryRunner.query(`DROP TABLE "authenticate_tracking"`);
        await queryRunner.query(`DROP TABLE "responsable"`);
        await queryRunner.query(`DROP TABLE "account"`);
    }

}
