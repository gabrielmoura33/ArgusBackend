import { MigrationInterface, QueryRunner } from 'typeorm';

export default class ModifyUserAddProviderDefaultFalse1623388848512
  implements MigrationInterface {
  name = 'ModifyUserAddProviderDefaultFalse1623388848512';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "isProvider" SET DEFAULT false`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "isProvider" DROP DEFAULT`,
      undefined,
    );
  }
}
