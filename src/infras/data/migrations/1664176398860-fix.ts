import { MigrationInterface, QueryRunner } from "typeorm"

export class fix1664176398860 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'alter table "user" add column "deleted_at" timestamp with time zone '
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'alter table "user" drop column "deleted_at"'
        )
    }

}
