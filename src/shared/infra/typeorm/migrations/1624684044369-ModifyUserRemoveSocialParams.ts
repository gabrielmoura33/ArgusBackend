import { MigrationInterface, QueryRunner } from 'typeorm';

export default class ModifyUserRemoveSocialParams1624684044369
  implements MigrationInterface {
  name = 'ModifyUserRemoveSocialParams1624684044369';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "isFacebookUser"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "isGoogleUser"`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "isGoogleUser" boolean DEFAULT false`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "isFacebookUser" boolean DEFAULT false`,
      undefined,
    );
  }
}
