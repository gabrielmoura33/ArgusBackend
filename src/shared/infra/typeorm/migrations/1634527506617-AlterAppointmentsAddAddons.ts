import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AlterAppointmentsAddAddons1634527506617
  implements MigrationInterface {
  name = 'AlterAppointmentsAddAddons1634527506617';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD "audience" integer NOT NULL DEFAULT 0`,
      undefined,
    );

    await queryRunner.query(
      `ALTER TABLE "appointments" ADD "open_environment" boolean NOT NULL DEFAULT false`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD "rented_equipment" boolean NOT NULL DEFAULT false`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointments" DROP COLUMN "rented_equipment"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" DROP COLUMN "open_environment"`,
      undefined,
    );

    await queryRunner.query(
      `ALTER TABLE "appointments" DROP COLUMN "audience"`,
      undefined,
    );
  }
}
