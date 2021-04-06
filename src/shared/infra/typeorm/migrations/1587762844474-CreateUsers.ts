import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUsers1587762844474 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'age',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'isProvider',
            type: 'boolean',
            isNullable: true,
            default: false,
          },
          {
            name: 'isFacebookUser',
            type: 'boolean',
            isNullable: true,
            default: false,
          },
          {
            name: 'isGoogleUser',
            type: 'boolean',
            isNullable: true,
            default: false,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
