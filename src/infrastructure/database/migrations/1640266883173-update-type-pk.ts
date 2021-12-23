import {MigrationInterface, QueryRunner} from "typeorm";

export class updateTypePk1640266883173 implements MigrationInterface {
    name = 'updateTypePk1640266883173'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "responsable" DROP CONSTRAINT "FK_2b29916447b393add867638fcd6"`);
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea"`);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "account" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "authenticate_tracking" DROP CONSTRAINT "FK_3da89a284e9efa891055fd6e102"`);
        await queryRunner.query(`ALTER TABLE "responsable" DROP CONSTRAINT "PK_4a49c7b18592ee4ee474538cf7c"`);
        await queryRunner.query(`ALTER TABLE "responsable" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "responsable" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "responsable" ADD CONSTRAINT "PK_4a49c7b18592ee4ee474538cf7c" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "responsable" DROP CONSTRAINT "REL_2b29916447b393add867638fcd"`);
        await queryRunner.query(`ALTER TABLE "responsable" DROP COLUMN "account_id"`);
        await queryRunner.query(`ALTER TABLE "responsable" ADD "account_id" character varying`);
        await queryRunner.query(`ALTER TABLE "responsable" ADD CONSTRAINT "UQ_2b29916447b393add867638fcd6" UNIQUE ("account_id")`);
        await queryRunner.query(`ALTER TABLE "authenticate_tracking" DROP CONSTRAINT "PK_ef46fbbd093bf2c222179a1dc5b"`);
        await queryRunner.query(`ALTER TABLE "authenticate_tracking" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "authenticate_tracking" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "authenticate_tracking" ADD CONSTRAINT "PK_ef46fbbd093bf2c222179a1dc5b" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "authenticate_tracking" DROP CONSTRAINT "REL_3da89a284e9efa891055fd6e10"`);
        await queryRunner.query(`ALTER TABLE "authenticate_tracking" DROP COLUMN "responsable_id"`);
        await queryRunner.query(`ALTER TABLE "authenticate_tracking" ADD "responsable_id" character varying`);
        await queryRunner.query(`ALTER TABLE "authenticate_tracking" ADD CONSTRAINT "UQ_3da89a284e9efa891055fd6e102" UNIQUE ("responsable_id")`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "FK_ca7fe48915fc9efbf4bf7e225ba"`);
        await queryRunner.query(`ALTER TABLE "vaccine" DROP CONSTRAINT "PK_3879829f8d2e396157ebffab918"`);
        await queryRunner.query(`ALTER TABLE "vaccine" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "vaccine" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vaccine" ADD CONSTRAINT "PK_3879829f8d2e396157ebffab918" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "vaccine_center" DROP CONSTRAINT "FK_d684eb8e2e1f90f0ec7122dbaa2"`);
        await queryRunner.query(`ALTER TABLE "ubigeo" DROP CONSTRAINT "PK_0694cc46b01fb7e212e5901c87e"`);
        await queryRunner.query(`ALTER TABLE "ubigeo" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "ubigeo" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ubigeo" ADD CONSTRAINT "PK_0694cc46b01fb7e212e5901c87e" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "FK_e8406252266c9ebfe7d3f3892c8"`);
        await queryRunner.query(`ALTER TABLE "vaccine_center" DROP CONSTRAINT "PK_447c70b701506706fe8c475ea3f"`);
        await queryRunner.query(`ALTER TABLE "vaccine_center" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "vaccine_center" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vaccine_center" ADD CONSTRAINT "PK_447c70b701506706fe8c475ea3f" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "vaccine_center" DROP COLUMN "ubigeo_id"`);
        await queryRunner.query(`ALTER TABLE "vaccine_center" ADD "ubigeo_id" character varying`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "PK_82aa5da437c5bbfb80703b08309"`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD CONSTRAINT "PK_82aa5da437c5bbfb80703b08309" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP COLUMN "vaccine_center_id"`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD "vaccine_center_id" character varying`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP COLUMN "vaccine_id"`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD "vaccine_id" character varying`);
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
        await queryRunner.query(`ALTER TABLE "inventory" DROP COLUMN "vaccine_id"`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD "vaccine_id" integer`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP COLUMN "vaccine_center_id"`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD "vaccine_center_id" integer`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "PK_82aa5da437c5bbfb80703b08309"`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD CONSTRAINT "PK_82aa5da437c5bbfb80703b08309" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "vaccine_center" DROP COLUMN "ubigeo_id"`);
        await queryRunner.query(`ALTER TABLE "vaccine_center" ADD "ubigeo_id" integer`);
        await queryRunner.query(`ALTER TABLE "vaccine_center" DROP CONSTRAINT "PK_447c70b701506706fe8c475ea3f"`);
        await queryRunner.query(`ALTER TABLE "vaccine_center" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "vaccine_center" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vaccine_center" ADD CONSTRAINT "PK_447c70b701506706fe8c475ea3f" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD CONSTRAINT "FK_e8406252266c9ebfe7d3f3892c8" FOREIGN KEY ("vaccine_center_id") REFERENCES "vaccine_center"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ubigeo" DROP CONSTRAINT "PK_0694cc46b01fb7e212e5901c87e"`);
        await queryRunner.query(`ALTER TABLE "ubigeo" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "ubigeo" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ubigeo" ADD CONSTRAINT "PK_0694cc46b01fb7e212e5901c87e" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "vaccine_center" ADD CONSTRAINT "FK_d684eb8e2e1f90f0ec7122dbaa2" FOREIGN KEY ("ubigeo_id") REFERENCES "ubigeo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vaccine" DROP CONSTRAINT "PK_3879829f8d2e396157ebffab918"`);
        await queryRunner.query(`ALTER TABLE "vaccine" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "vaccine" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vaccine" ADD CONSTRAINT "PK_3879829f8d2e396157ebffab918" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD CONSTRAINT "FK_ca7fe48915fc9efbf4bf7e225ba" FOREIGN KEY ("vaccine_id") REFERENCES "vaccine"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "authenticate_tracking" DROP CONSTRAINT "UQ_3da89a284e9efa891055fd6e102"`);
        await queryRunner.query(`ALTER TABLE "authenticate_tracking" DROP COLUMN "responsable_id"`);
        await queryRunner.query(`ALTER TABLE "authenticate_tracking" ADD "responsable_id" integer`);
        await queryRunner.query(`ALTER TABLE "authenticate_tracking" ADD CONSTRAINT "REL_3da89a284e9efa891055fd6e10" UNIQUE ("responsable_id")`);
        await queryRunner.query(`ALTER TABLE "authenticate_tracking" DROP CONSTRAINT "PK_ef46fbbd093bf2c222179a1dc5b"`);
        await queryRunner.query(`ALTER TABLE "authenticate_tracking" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "authenticate_tracking" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "authenticate_tracking" ADD CONSTRAINT "PK_ef46fbbd093bf2c222179a1dc5b" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "responsable" DROP CONSTRAINT "UQ_2b29916447b393add867638fcd6"`);
        await queryRunner.query(`ALTER TABLE "responsable" DROP COLUMN "account_id"`);
        await queryRunner.query(`ALTER TABLE "responsable" ADD "account_id" integer`);
        await queryRunner.query(`ALTER TABLE "responsable" ADD CONSTRAINT "REL_2b29916447b393add867638fcd" UNIQUE ("account_id")`);
        await queryRunner.query(`ALTER TABLE "responsable" DROP CONSTRAINT "PK_4a49c7b18592ee4ee474538cf7c"`);
        await queryRunner.query(`ALTER TABLE "responsable" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "responsable" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "responsable" ADD CONSTRAINT "PK_4a49c7b18592ee4ee474538cf7c" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "authenticate_tracking" ADD CONSTRAINT "FK_3da89a284e9efa891055fd6e102" FOREIGN KEY ("responsable_id") REFERENCES "responsable"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea"`);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "account" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "responsable" ADD CONSTRAINT "FK_2b29916447b393add867638fcd6" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
