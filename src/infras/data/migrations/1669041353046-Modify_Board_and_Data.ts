import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyBoardAndData1669041353046 implements MigrationInterface {
    name = 'ModifyBoardAndData1669041353046'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "data" ADD "title" character varying(200)`);
        await queryRunner.query(`ALTER TABLE "data" ADD "content" text`);
        await queryRunner.query(`ALTER TABLE "data" ALTER COLUMN "heading" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "board" ALTER COLUMN "title" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "board" DROP COLUMN "icon"`);
        await queryRunner.query(`ALTER TABLE "board" ADD "icon" character varying(1000)`);
        await queryRunner.query(`CREATE INDEX "IDX_0f6b9046ec4321abd99a6de879" ON "data" ("board_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_31496d48054fe218ee366a3010" ON "board" ("workspace_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_262b64bba57c3fafd907d79a47" ON "board" ("template_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_262b64bba57c3fafd907d79a47"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_31496d48054fe218ee366a3010"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0f6b9046ec4321abd99a6de879"`);
        await queryRunner.query(`ALTER TABLE "board" DROP COLUMN "icon"`);
        await queryRunner.query(`ALTER TABLE "board" ADD "icon" character varying(200)`);
        await queryRunner.query(`ALTER TABLE "board" ALTER COLUMN "title" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "data" ALTER COLUMN "heading" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "data" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "data" DROP COLUMN "title"`);
    }

}
