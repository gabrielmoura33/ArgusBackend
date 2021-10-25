import { MigrationInterface, QueryRunner } from 'typeorm';

export default class ReStructureDatabase1635160940593
  implements MigrationInterface {
  name = 'ReStructureDatabase1635160940593';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "city" character varying, "street" character varying, "neighborhood" character varying, "state" character varying, "country" character varying, "cep" character varying, "number" integer, "location" geography(Point,4326), "user_id" uuid, "provider_id" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_16aac8a9f6f9c1dd6bcb75ec02" UNIQUE ("user_id"), CONSTRAINT "REL_953bf36faaa96a770e19b8ab82" UNIQUE ("provider_id"), CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_619ee872ed71e76ad6600490fb" ON "addresses" USING GiST ("location") `,
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
      `CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "image_url" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "service_addons" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "price" double precision NOT NULL, "min_value" double precision, "max_value" double precision, "default" boolean NOT NULL DEFAULT false, "active" boolean NOT NULL DEFAULT false, "type" character varying NOT NULL, "selectable" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "service_id" uuid, CONSTRAINT "PK_880297192a9485434563928ce83" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "services" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "provider_id" uuid NOT NULL, "category_id" uuid NOT NULL, "name" character varying NOT NULL, "description" character varying, "price" double precision NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ba2d347a3168a296416c6c5ccb2" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "profiles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "price" double precision NOT NULL DEFAULT 0, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_4e9da7cade0e9edd393329bb326" UNIQUE ("name"), CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "mail_confirmed" boolean NOT NULL DEFAULT false, "password" character varying NOT NULL, "birth_date" TIMESTAMP, "isProvider" boolean NOT NULL DEFAULT false, "isArgusArtist" boolean NOT NULL DEFAULT false, "avatar" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "address_id" uuid, "profile_id" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_1b05689f6b6456680d538c3d2e" UNIQUE ("address_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "status" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "appointments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "provider_id" uuid NOT NULL, "user_id" uuid NOT NULL, "status_id" uuid NOT NULL, "service_id" uuid NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "scheduled_time" integer NOT NULL DEFAULT 60, "final_price" double precision NOT NULL, "audience" integer NOT NULL DEFAULT 0, "open_environment" boolean NOT NULL DEFAULT false, "rented_equipment" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4a437a9a27e948726b8bb3e36ad" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "user_tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_63764db9d9aaa4af33e07b2f4bf" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "addresses" ADD CONSTRAINT "FK_16aac8a9f6f9c1dd6bcb75ec023" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE "service_addons" ADD CONSTRAINT "FK_6e71f711fb858ddb69b26b1628e" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "services" ADD CONSTRAINT "FK_e7a40b21f8fd548be206fcc89b2" FOREIGN KEY ("provider_id") REFERENCES "providers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "services" ADD CONSTRAINT "FK_1f8d1173481678a035b4a81a4ec" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_1b05689f6b6456680d538c3d2ea" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_23371445bd80cb3e413089551bf" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD CONSTRAINT "FK_e3e268ed1125872144e68b9a41c" FOREIGN KEY ("provider_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD CONSTRAINT "FK_66dee3bea82328659a4db8e54b7" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD CONSTRAINT "FK_2a2088e8eaa8f28d8de2bdbb857" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD CONSTRAINT "FK_2b35dd864ffc9740d944427f790" FOREIGN KEY ("status_id") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointments" DROP CONSTRAINT "FK_2b35dd864ffc9740d944427f790"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" DROP CONSTRAINT "FK_2a2088e8eaa8f28d8de2bdbb857"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" DROP CONSTRAINT "FK_66dee3bea82328659a4db8e54b7"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" DROP CONSTRAINT "FK_e3e268ed1125872144e68b9a41c"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_23371445bd80cb3e413089551bf"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_1b05689f6b6456680d538c3d2ea"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "services" DROP CONSTRAINT "FK_1f8d1173481678a035b4a81a4ec"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "services" DROP CONSTRAINT "FK_e7a40b21f8fd548be206fcc89b2"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "service_addons" DROP CONSTRAINT "FK_6e71f711fb858ddb69b26b1628e"`,
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
      `ALTER TABLE "addresses" DROP CONSTRAINT "FK_16aac8a9f6f9c1dd6bcb75ec023"`,
      undefined,
    );
    await queryRunner.query(`DROP TABLE "user_tokens"`, undefined);
    await queryRunner.query(`DROP TABLE "appointments"`, undefined);
    await queryRunner.query(`DROP TABLE "status"`, undefined);
    await queryRunner.query(`DROP TABLE "users"`, undefined);
    await queryRunner.query(`DROP TABLE "profiles"`, undefined);
    await queryRunner.query(`DROP TABLE "services"`, undefined);
    await queryRunner.query(`DROP TABLE "service_addons"`, undefined);
    await queryRunner.query(`DROP TABLE "categories"`, undefined);
    await queryRunner.query(`DROP TABLE "providers"`, undefined);
    await queryRunner.query(`DROP TABLE "provider_info"`, undefined);
    await queryRunner.query(
      `DROP INDEX "IDX_619ee872ed71e76ad6600490fb"`,
      undefined,
    );
    await queryRunner.query(`DROP TABLE "addresses"`, undefined);
  }
}
