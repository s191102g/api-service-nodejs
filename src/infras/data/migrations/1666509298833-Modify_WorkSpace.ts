import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyWorkSpace1666509298833 implements MigrationInterface {
    name = 'ModifyWorkSpace1666509298833'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workspace" ADD "name" character varying(200) NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_406f56fc2a42ad5f541973cdbe" ON "workspace" ("name") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_406f56fc2a42ad5f541973cdbe"`);
        await queryRunner.query(`ALTER TABLE "workspace" DROP COLUMN "name"`);
    }

}
