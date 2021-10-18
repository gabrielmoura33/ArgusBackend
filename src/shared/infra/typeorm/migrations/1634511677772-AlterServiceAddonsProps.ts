import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AlterServiceAddonsProps1634511677772
  implements MigrationInterface {
  name = 'AlterServiceAddonsProps1634511677772';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "service_addons" ADD "active" boolean NOT NULL DEFAULT false`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "service_addons" ADD "type" character varying NOT NULL`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "service_addons" DROP COLUMN "type"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "service_addons" DROP COLUMN "active"`,
      undefined,
    );
  }
}
