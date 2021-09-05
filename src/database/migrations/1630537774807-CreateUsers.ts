import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsers1630537774807 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'UNIQUEIDENTIFIER',
            isPrimary: true
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'email',
            type: 'varchar'
          },
          {
            name: 'admin',
            type: 'bit',
            default: 0,
            isNullable: false
          },
          {
            name: 'created_at',
            type: 'datetime',
            default: 'GETDATE()'
          },
          {
            name: 'updated_at',
            type: 'datetime',
            default: 'GETDATE()'
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
