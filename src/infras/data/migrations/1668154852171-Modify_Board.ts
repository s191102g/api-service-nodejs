import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyBoard1668154852171 implements MigrationInterface {
    name = 'ModifyBoard1668154852171'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_f84b6556e851c5aa76be7b5304"`);
        await queryRunner.query(`CREATE INDEX "IDX_f84b6556e851c5aa76be7b5304" ON "board" ("title") WHERE deleted_at IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_f84b6556e851c5aa76be7b5304"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_f84b6556e851c5aa76be7b5304" ON "board" ("title") WHERE (deleted_at IS NULL)`);
    }

}
