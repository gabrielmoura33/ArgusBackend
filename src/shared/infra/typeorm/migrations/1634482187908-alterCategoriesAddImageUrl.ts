import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AlterCategoriesAddImageUrl1634482187908
  implements MigrationInterface {
  name = 'alterCategoriesAddImageUrl1634482187908';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "categories" ADD "image_url" character varying`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "categories" DROP COLUMN "image_url"`,
      undefined,
    );
  }
}
