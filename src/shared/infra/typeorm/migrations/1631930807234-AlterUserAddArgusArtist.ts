import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AlterUserAddArgusArtist1631930807234
  implements MigrationInterface {
  name = 'AlterUserAddArgusArtist1631930807234';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "isArgusArtist" boolean NOT NULL DEFAULT false`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "isArgusArtist"`,
      undefined,
    );
  }
}
