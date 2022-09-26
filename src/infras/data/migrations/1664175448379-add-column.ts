import { MigrationInterface, QueryRunner } from "typeorm"

export class addColumn1664175448379 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'create table "user"( "id" uuid not null default uuid_generate_v4(), "created_at" timestamp with time zone not null default now(), constraint "user_pkey" primary key(id)  )'
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'drop table "user"'
        )
    }

}
