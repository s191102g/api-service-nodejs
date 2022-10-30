import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyClient1667120871848 implements MigrationInterface {
    name = 'ModifyClient1667120871848'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" ADD "active_key" character varying(20)`);
        await queryRunner.query(`CREATE TYPE "public"."client_status_enum" AS ENUM('actived', 'Inactive')`);
        await queryRunner.query(`ALTER TABLE "client" ADD "status" "public"."client_status_enum"`);
        await queryRunner.query(`ALTER TABLE "client" ALTER COLUMN "username" DROP NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_6376cac90cf2c7378f369a271c" ON "client" ("email") WHERE deleted_at IS NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_ba64ba4a3c7192b800d56e4c24" ON "client" ("active_key") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_ba64ba4a3c7192b800d56e4c24"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6376cac90cf2c7378f369a271c"`);
        await queryRunner.query(`ALTER TABLE "client" ALTER COLUMN "username" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."client_status_enum"`);
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "active_key"`);
    }

}
