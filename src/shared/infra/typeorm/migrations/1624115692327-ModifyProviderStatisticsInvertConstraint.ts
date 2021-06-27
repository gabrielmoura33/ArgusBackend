import { MigrationInterface, QueryRunner } from 'typeorm';

export default class ModifyProviderStatisticsInvertConstraint1624115692327
  implements MigrationInterface {
  name = 'ModifyProviderStatisticsInvertConstraint1624115692327';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "statistics" DROP CONSTRAINT "FK_ec835a261592bb62354fe683ee8"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "statistics" DROP CONSTRAINT "REL_ec835a261592bb62354fe683ee"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "statistics" DROP COLUMN "provider_id"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "statistics_id" uuid`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_7aafbd15402dbaa91d7909a04c5" UNIQUE ("statistics_id")`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_7aafbd15402dbaa91d7909a04c5" FOREIGN KEY ("statistics_id") REFERENCES "statistics"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_7aafbd15402dbaa91d7909a04c5"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_7aafbd15402dbaa91d7909a04c5"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "statistics_id"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "statistics" ADD "provider_id" uuid`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "statistics" ADD CONSTRAINT "REL_ec835a261592bb62354fe683ee" UNIQUE ("provider_id")`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "statistics" ADD CONSTRAINT "FK_ec835a261592bb62354fe683ee8" FOREIGN KEY ("provider_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
  }
}
