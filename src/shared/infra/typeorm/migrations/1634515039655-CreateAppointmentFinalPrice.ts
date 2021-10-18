import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateAppointmentFinalPrice1634515039655
  implements MigrationInterface {
  name = 'CreateAppointmentFinalPrice1634515039655';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD "final_price" double precision NOT NULL`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointments" DROP COLUMN "final_price"`,
      undefined,
    );
  }
}
