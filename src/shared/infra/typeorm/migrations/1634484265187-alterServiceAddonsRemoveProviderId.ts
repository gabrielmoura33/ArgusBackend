import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AlterServiceAddonsRemoveProviderId1634484265187
  implements MigrationInterface {
  name = 'alterServiceAddonsRemoveProviderId1634484265187';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "service_addons" DROP COLUMN "provider_id"`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "service_addons" ADD "provider_id" character varying NOT NULL`,
      undefined,
    );
  }
}
