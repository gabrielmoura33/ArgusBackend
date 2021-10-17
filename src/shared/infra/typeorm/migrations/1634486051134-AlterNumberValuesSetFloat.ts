import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AlterNumberValuesSetFloat1634486051134
  implements MigrationInterface {
  name = 'AlterNumberValuesSetFloat1634486051134';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "service_addons" DROP COLUMN "price"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "service_addons" ADD "price" double precision NOT NULL`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "service_addons" DROP COLUMN "min_value"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "service_addons" ADD "min_value" double precision`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "service_addons" DROP COLUMN "max_value"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "service_addons" ADD "max_value" double precision`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "services" DROP CONSTRAINT "FK_1f8d1173481678a035b4a81a4ec"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "services" ALTER COLUMN "category_id" SET NOT NULL`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "services" DROP COLUMN "price"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "services" ADD "price" double precision NOT NULL`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "services" ADD CONSTRAINT "FK_1f8d1173481678a035b4a81a4ec" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "services" DROP CONSTRAINT "FK_1f8d1173481678a035b4a81a4ec"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "services" DROP COLUMN "price"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "services" ADD "price" integer NOT NULL`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "services" ALTER COLUMN "category_id" DROP NOT NULL`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "services" ADD CONSTRAINT "FK_1f8d1173481678a035b4a81a4ec" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "service_addons" DROP COLUMN "max_value"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "service_addons" ADD "max_value" integer`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "service_addons" DROP COLUMN "min_value"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "service_addons" ADD "min_value" integer`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "service_addons" DROP COLUMN "price"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "service_addons" ADD "price" integer NOT NULL`,
      undefined,
    );
  }
}
