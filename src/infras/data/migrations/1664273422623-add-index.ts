import { MigrationInterface, QueryRunner } from "typeorm"

export class addIndex1664273422623 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'CREATE UNIQUE INDEX "test_index" ON "test" ("name") WHERE deleted_at IS NULL'
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'DROP INDEX "public"."test_index"'
          );
    }

}
