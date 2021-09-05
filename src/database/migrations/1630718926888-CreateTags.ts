import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTags1630718926888 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tags',
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
    queryRunner.dropTable('tags');
  }
}
