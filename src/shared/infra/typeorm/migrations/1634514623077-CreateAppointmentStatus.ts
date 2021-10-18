import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateAppointmentStatus1634514623077
  implements MigrationInterface {
  name = 'CreateAppointmentStatus1634514623077';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "status" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "appointment_id" uuid NOT NULL, "status" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_bad25209fb59545d6c3282a7c2" UNIQUE ("appointment_id"), CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "status" ADD CONSTRAINT "FK_bad25209fb59545d6c3282a7c24" FOREIGN KEY ("appointment_id") REFERENCES "appointments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "status" DROP CONSTRAINT "FK_bad25209fb59545d6c3282a7c24"`,
      undefined,
    );
    await queryRunner.query(`DROP TABLE "status"`, undefined);
  }
}
