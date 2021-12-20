import { MigrationInterface, QueryRunner } from 'typeorm';

export default class UpdateUsersAddStripeId1639958324394
  implements MigrationInterface {
  name = 'updateUsersAddStripeId1639958324394';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "stripe_id" character varying`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "stripe_id"`,
      undefined,
    );
  }
}
