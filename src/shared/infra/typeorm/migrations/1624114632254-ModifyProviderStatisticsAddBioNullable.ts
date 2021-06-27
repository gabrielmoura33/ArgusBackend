import { MigrationInterface, QueryRunner } from 'typeorm';

export default class ModifyProviderStatisticsAddBioNullable1624114632254
  implements MigrationInterface {
  name = 'ModifyProviderStatisticsAddBioNullable1624114632254';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "statistics" ALTER COLUMN "bio" DROP NOT NULL`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "statistics" ALTER COLUMN "bio" SET NOT NULL`,
      undefined,
    );
  }
}
