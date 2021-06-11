import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateUsersAdministrativeTables1623386388267
  implements MigrationInterface {
  name = 'CreateUsersAdministrativeTables1623386388267';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_1b05689f6b6456680d538c3d2ea"`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "city" character varying, "street" character varying, "neighborhood" character varying, "state" character varying, "country" character varying, "cep" character varying, "number" integer, "location" geography(Point,4326), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "REL_16aac8a9f6f9c1dd6bcb75ec02" UNIQUE ("user_id"), CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_619ee872ed71e76ad6600490fb" ON "addresses" USING GiST ("location") `,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "statistics" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "favorites" integer, "reviews" integer, "average_review" integer NOT NULL DEFAULT 0, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "provider_id" uuid, CONSTRAINT "REL_ec835a261592bb62354fe683ee" UNIQUE ("provider_id"), CONSTRAINT "PK_c3769cca342381fa827a0f246a7" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "profiles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" integer, "price" integer NOT NULL DEFAULT 0, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "profile_id" uuid, CONSTRAINT "UQ_4e9da7cade0e9edd393329bb326" UNIQUE ("name"), CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "mail_confirmed" boolean NOT NULL DEFAULT false`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "addresses" ADD CONSTRAINT "FK_16aac8a9f6f9c1dd6bcb75ec023" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "statistics" ADD CONSTRAINT "FK_ec835a261592bb62354fe683ee8" FOREIGN KEY ("provider_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_1b05689f6b6456680d538c3d2ea" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "profiles" ADD CONSTRAINT "FK_6a23df60690da92fd263eca2e93" FOREIGN KEY ("profile_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "profiles" DROP CONSTRAINT "FK_6a23df60690da92fd263eca2e93"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_1b05689f6b6456680d538c3d2ea"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "statistics" DROP CONSTRAINT "FK_ec835a261592bb62354fe683ee8"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "addresses" DROP CONSTRAINT "FK_16aac8a9f6f9c1dd6bcb75ec023"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "mail_confirmed"`,
      undefined,
    );
    await queryRunner.query(`DROP TABLE "profiles"`, undefined);
    await queryRunner.query(`DROP TABLE "statistics"`, undefined);
    await queryRunner.query(
      `DROP INDEX "IDX_619ee872ed71e76ad6600490fb"`,
      undefined,
    );
    await queryRunner.query(`DROP TABLE "addresses"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_1b05689f6b6456680d538c3d2ea" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
  }
}
