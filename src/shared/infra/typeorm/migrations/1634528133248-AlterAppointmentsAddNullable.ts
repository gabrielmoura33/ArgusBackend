import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterAppointmentsAddNullable1634528133248 implements MigrationInterface {
    name = 'AlterAppointmentsAddNullable1634528133248'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "status" ALTER COLUMN "appointment_id" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "appointments" ALTER COLUMN "scheduled_time" SET DEFAULT 60`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointments" ALTER COLUMN "scheduled_time" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "status" ALTER COLUMN "appointment_id" SET NOT NULL`, undefined);
    }

}
