import { MigrationInterface, QueryRunner } from 'typeorm';

export default class UpdateProviderAddCategory1644580177567
  implements MigrationInterface {
  name = 'updateProviderAddCategory1644580177567';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "providers" ADD "category_id" uuid`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "providers" ADD CONSTRAINT "UQ_cfaf8d4b2fe553f33fad44c2913" UNIQUE ("category_id")`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "providers" ADD CONSTRAINT "FK_cfaf8d4b2fe553f33fad44c2913" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "providers" DROP CONSTRAINT "FK_cfaf8d4b2fe553f33fad44c2913"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "providers" DROP CONSTRAINT "UQ_cfaf8d4b2fe553f33fad44c2913"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "providers" DROP COLUMN "category_id"`,
      undefined,
    );
  }
}
