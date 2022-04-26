import {MigrationInterface, QueryRunner} from "typeorm";

export class capacityAttribute1650663339198 implements MigrationInterface {
    name = 'capacityAttribute1650663339198'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vaccine_center" ADD "capacity" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vaccine_center" DROP COLUMN "capacity"`);
    }

}
