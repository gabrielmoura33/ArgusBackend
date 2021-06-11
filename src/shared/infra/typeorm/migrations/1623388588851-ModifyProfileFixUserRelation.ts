import { MigrationInterface, QueryRunner } from 'typeorm';

export default class ModifyProfileFixUserRelation1623388588851
  implements MigrationInterface {
  name = 'ModifyProfileFixUserRelation1623388588851';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "profiles" DROP CONSTRAINT "FK_6a23df60690da92fd263eca2e93"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "profiles" DROP COLUMN "profile_id"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "profile_id" uuid`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_23371445bd80cb3e413089551bf" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_23371445bd80cb3e413089551bf"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "profile_id"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "profiles" ADD "profile_id" uuid`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "profiles" ADD CONSTRAINT "FK_6a23df60690da92fd263eca2e93" FOREIGN KEY ("profile_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
  }
}
