import { MigrationInterface, QueryRunner } from 'typeorm';

export default class ModifyProfileChangeNumber1624035451836
  implements MigrationInterface {
  name = 'ModifyProfileChangeNumber1624035451836';

  public async up(queryRunner: QueryRunner): Promise<void> {
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
  }
}
