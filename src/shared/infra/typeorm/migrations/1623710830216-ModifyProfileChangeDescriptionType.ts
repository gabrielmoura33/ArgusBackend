import { MigrationInterface, QueryRunner } from 'typeorm';

export default class ModifyProfileChangeDescriptionType1623710830216
  implements MigrationInterface {
  name = 'ModifyProfileChangeDescriptionType1623710830216';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "profiles" DROP COLUMN "description"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "profiles" ADD "description" character varying`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "profiles" DROP COLUMN "description"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "profiles" ADD "description" integer`,
      undefined,
    );
  }
}
