import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateWorkspace1666170237904 implements MigrationInterface {
    name = 'UpdateWorkspace1666170237904'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_5650371cc7972c69b945cef8e8"`);
        await queryRunner.query(`CREATE INDEX "IDX_5650371cc7972c69b945cef8e8" ON "workspace" ("user_id") WHERE deleted_at IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_5650371cc7972c69b945cef8e8"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_5650371cc7972c69b945cef8e8" ON "workspace" ("user_id") WHERE (deleted_at IS NULL)`);
    }

}
