import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AlterAppointmentserviceId1634515988097
  implements MigrationInterface {
  name = 'AlterAppointmentserviceId1634515988097';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointments" DROP CONSTRAINT "FK_699c993cc00c87fea12cb84748e"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" RENAME COLUMN "servicesId" TO "service_id"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" ALTER COLUMN "service_id" SET NOT NULL`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD CONSTRAINT "FK_2a2088e8eaa8f28d8de2bdbb857" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointments" DROP CONSTRAINT "FK_2a2088e8eaa8f28d8de2bdbb857"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" ALTER COLUMN "service_id" DROP NOT NULL`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" RENAME COLUMN "service_id" TO "servicesId"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD CONSTRAINT "FK_699c993cc00c87fea12cb84748e" FOREIGN KEY ("servicesId") REFERENCES "services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
  }
}
