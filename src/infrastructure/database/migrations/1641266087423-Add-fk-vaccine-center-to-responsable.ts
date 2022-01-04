import {MigrationInterface, QueryRunner} from "typeorm";

export class AddFkVaccineCenterToResponsable1641266087423 implements MigrationInterface {
    name = 'AddFkVaccineCenterToResponsable1641266087423'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vaccine_center" ADD "responsable_id" character varying`);
        await queryRunner.query(`ALTER TABLE "vaccine_center" ADD CONSTRAINT "UQ_b16237f1445c91fe42769ff04ee" UNIQUE ("responsable_id")`);

        await queryRunner.query(`ALTER TABLE "vaccine_center" ADD CONSTRAINT "FK_b16237f1445c91fe42769ff04ee" FOREIGN KEY ("responsable_id") REFERENCES "responsable"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vaccine_center" DROP CONSTRAINT "FK_b16237f1445c91fe42769ff04ee"`);

        await queryRunner.query(`ALTER TABLE "vaccine_center" DROP CONSTRAINT "UQ_b16237f1445c91fe42769ff04ee"`);
        await queryRunner.query(`ALTER TABLE "vaccine_center" DROP COLUMN "responsable_id"`);
    }

}
