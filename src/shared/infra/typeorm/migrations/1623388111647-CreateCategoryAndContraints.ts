import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateCategoryAndContraints1623388111647
  implements MigrationInterface {
  name = 'CreateCategoryAndContraints1623388111647';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "services" ADD "name" character varying NOT NULL`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "services" ADD "category_id" uuid`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "services" ALTER COLUMN "description" DROP NOT NULL`,
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
      `ALTER TABLE "services" ALTER COLUMN "description" SET NOT NULL`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "services" DROP COLUMN "category_id"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "services" DROP COLUMN "name"`,
      undefined,
    );
    await queryRunner.query(`DROP TABLE "categories"`, undefined);
  }
}
