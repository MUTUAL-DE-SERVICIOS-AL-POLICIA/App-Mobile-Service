import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRecordsTable1756476484267 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
        new Table({
            name: 'records',
            columns: [
            {
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
            },
            {
                name: 'action',
                type: 'varchar',
                length: '150',
                isNullable: false,
            },
            {
                name: 'description',
                type: 'text',
                isNullable: true,
            },
            {
                name: 'metadata',
                type: 'jsonb',
                isNullable: true,
            },
            {
                name: 'created_at',
                type: 'timestamp',
                default: 'CURRENT_TIMESTAMP',
            },
            ],
        }),
        true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('records');
    }

}
