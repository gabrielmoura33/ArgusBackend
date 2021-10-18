import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AlterAppointmentsStatusId1634517273518
  implements MigrationInterface {
  name = 'AlterAppointmentsStatusId1634517273518';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "status" DROP CONSTRAINT "FK_bad25209fb59545d6c3282a7c24"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD "status_id" uuid`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "status" DROP CONSTRAINT "REL_bad25209fb59545d6c3282a7c2"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "status" DROP COLUMN "appointment_id"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "status" ADD "appointment_id" character varying NOT NULL`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD CONSTRAINT "FK_2b35dd864ffc9740d944427f790" FOREIGN KEY ("status_id") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointments" DROP CONSTRAINT "FK_2b35dd864ffc9740d944427f790"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "status" DROP COLUMN "appointment_id"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "status" ADD "appointment_id" uuid NOT NULL`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "status" ADD CONSTRAINT "REL_bad25209fb59545d6c3282a7c2" UNIQUE ("appointment_id")`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" DROP COLUMN "status_id"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "status" ADD CONSTRAINT "FK_bad25209fb59545d6c3282a7c24" FOREIGN KEY ("appointment_id") REFERENCES "appointments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
  }
}
