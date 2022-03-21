import {MigrationInterface, QueryRunner} from "typeorm";

export class updateLengthPassword1647876849234 implements MigrationInterface {
    name = 'updateLengthPassword1647876849234'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" ALTER COLUMN "password" TYPE character varying(65)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" ALTER COLUMN "password" character varying(50)`);
    }

}
