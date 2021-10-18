import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AlterAppointmentsDateFormat1634517714453
  implements MigrationInterface {
  name = 'AlterAppointmentsDateFormat1634517714453';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointments" DROP COLUMN "date"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD "date" TIMESTAMP WITH TIME ZONE NOT NULL`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointments" DROP COLUMN "date"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD "date" TIME WITH TIME ZONE NOT NULL`,
      undefined,
    );
  }
}
