import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterServiceAddAddons1634394921304 implements MigrationInterface {
    name = 'AlterServiceAddAddons1634394921304'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "service_addons" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "provider_id" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying, "price" integer NOT NULL, "min_value" integer, "max_value" integer, "default" boolean NOT NULL DEFAULT false, "selectable" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "service_id" uuid, CONSTRAINT "PK_880297192a9485434563928ce83" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "service_addons" ADD CONSTRAINT "FK_6e71f711fb858ddb69b26b1628e" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service_addons" DROP CONSTRAINT "FK_6e71f711fb858ddb69b26b1628e"`, undefined);
        await queryRunner.query(`DROP TABLE "service_addons"`, undefined);
    }

}
