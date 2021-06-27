import { MigrationInterface, QueryRunner } from 'typeorm';

export default class ModifyProviderStatisticsAddBio1624114154012
  implements MigrationInterface {
  name = 'ModifyProviderStatisticsAddBio1624114154012';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "statistics" ADD "bio" text NOT NULL`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "profiles" DROP COLUMN "price"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "profiles" ADD "price" double precision NOT NULL DEFAULT 0`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "profiles" DROP COLUMN "price"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "profiles" ADD "price" integer NOT NULL DEFAULT 0`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "statistics" DROP COLUMN "bio"`,
      undefined,
    );
  }
}
