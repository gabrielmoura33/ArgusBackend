import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterStatusRemoveAppointmentID1634528302421 implements MigrationInterface {
    name = 'AlterStatusRemoveAppointmentID1634528302421'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "status" DROP COLUMN "appointment_id"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "status" ADD "appointment_id" character varying`, undefined);
    }

}
