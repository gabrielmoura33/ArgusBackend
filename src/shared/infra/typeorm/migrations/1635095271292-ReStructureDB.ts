import { MigrationInterface, QueryRunner } from 'typeorm';

export default class ReStructureDB1635095271292 implements MigrationInterface {
  name = 'ReStructureDB1635095271292';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "services" DROP CONSTRAINT "FK_e7a40b21f8fd548be206fcc89b2"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_7aafbd15402dbaa91d7909a04c5"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" DROP CONSTRAINT "FK_2b35dd864ffc9740d944427f790"`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "provider_info" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "favorites" integer, "reviews" integer, "average_review" integer NOT NULL DEFAULT 0, "bio" text, "work_schedule" character varying NOT NULL, "week_schedule" character varying NOT NULL, "video_url" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7e9a5144b597eb66b5929dc8050" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "providers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "mail_confirmed" boolean NOT NULL DEFAULT false, "password" character varying NOT NULL, "birth_date" TIMESTAMP, "isArgusArtist" boolean NOT NULL DEFAULT false, "avatar" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "address_id" uuid, "provider_info_id" uuid, CONSTRAINT "UQ_32fe6bfe82d8e4959ba9d9fad42" UNIQUE ("email"), CONSTRAINT "REL_f42865f77305d097c39af6624f" UNIQUE ("address_id"), CONSTRAINT "REL_a2c0e348effa460c91381450fe" UNIQUE ("provider_info_id"), CONSTRAINT "PK_af13fc2ebf382fe0dad2e4793aa" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_7aafbd15402dbaa91d7909a04c5"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "statistics_id"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" DROP COLUMN "status_id"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "addresses" ADD "provider_id" uuid`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "addresses" ADD CONSTRAINT "UQ_953bf36faaa96a770e19b8ab820" UNIQUE ("provider_id")`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "addresses" ADD CONSTRAINT "FK_953bf36faaa96a770e19b8ab820" FOREIGN KEY ("provider_id") REFERENCES "providers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "providers" ADD CONSTRAINT "FK_f42865f77305d097c39af6624fb" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "providers" ADD CONSTRAINT "FK_a2c0e348effa460c91381450fef" FOREIGN KEY ("provider_info_id") REFERENCES "provider_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "services" ADD CONSTRAINT "FK_e7a40b21f8fd548be206fcc89b2" FOREIGN KEY ("provider_id") REFERENCES "providers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "services" DROP CONSTRAINT "FK_e7a40b21f8fd548be206fcc89b2"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "providers" DROP CONSTRAINT "FK_a2c0e348effa460c91381450fef"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "providers" DROP CONSTRAINT "FK_f42865f77305d097c39af6624fb"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "addresses" DROP CONSTRAINT "FK_953bf36faaa96a770e19b8ab820"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "addresses" DROP CONSTRAINT "UQ_953bf36faaa96a770e19b8ab820"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "addresses" DROP COLUMN "provider_id"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD "status_id" uuid`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "statistics_id" uuid`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_7aafbd15402dbaa91d7909a04c5" UNIQUE ("statistics_id")`,
      undefined,
    );
    await queryRunner.query(`DROP TABLE "providers"`, undefined);
    await queryRunner.query(`DROP TABLE "provider_info"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD CONSTRAINT "FK_2b35dd864ffc9740d944427f790" FOREIGN KEY ("status_id") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_7aafbd15402dbaa91d7909a04c5" FOREIGN KEY ("statistics_id") REFERENCES "statistics"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "services" ADD CONSTRAINT "FK_e7a40b21f8fd548be206fcc89b2" FOREIGN KEY ("provider_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
  }
}
