import {MigrationInterface, QueryRunner} from "typeorm";

export class updateResponsableAuthenticatetrackingRelation1642946205414 implements MigrationInterface {
    name = 'updateResponsableAuthenticatetrackingRelation1642946205414'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "authenticate_tracking" DROP CONSTRAINT "UQ_3da89a284e9efa891055fd6e102"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "authenticate_tracking" ADD CONSTRAINT "UQ_3da89a284e9efa891055fd6e102" UNIQUE ("responsable_id")`);
    }

}
