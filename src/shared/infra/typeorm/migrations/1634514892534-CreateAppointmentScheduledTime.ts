import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateAppointmentScheduledTime1634514892534
  implements MigrationInterface {
  name = 'CreateAppointmentScheduledTime1634514892534';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD "scheduled_time" integer NOT NULL`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointments" DROP COLUMN "scheduled_time"`,
      undefined,
    );
  }
}
