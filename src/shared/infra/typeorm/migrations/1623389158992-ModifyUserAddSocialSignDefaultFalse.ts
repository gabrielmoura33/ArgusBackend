import {MigrationInterface, QueryRunner} from "typeorm";

export class ModifyUserAddSocialSignDefaultFalse1623389158992 implements MigrationInterface {
    name = 'ModifyUserAddSocialSignDefaultFalse1623389158992'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isFacebookUser" SET DEFAULT false`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isGoogleUser" SET DEFAULT false`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isGoogleUser" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isFacebookUser" DROP DEFAULT`, undefined);
    }

}
