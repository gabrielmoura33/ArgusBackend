import { MigrationInterface, QueryRunner } from 'typeorm';

export default class ModifyUserChangeBirthDate1623948336509
  implements MigrationInterface {
  name = 'ModifyUserChangeBirthDate1623948336509';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "birth_date"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "birth_date" TIMESTAMP`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "birth_date"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "birth_date" integer`,
      undefined,
    );
  }
}
