import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyClient1669556176028 implements MigrationInterface {
    name = 'ModifyClient1669556176028'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."client_type_use_enum" AS ENUM('normal', 'withgg')`);
        await queryRunner.query(`ALTER TABLE "client" ADD "type_use" "public"."client_type_use_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "type_use"`);
        await queryRunner.query(`DROP TYPE "public"."client_type_use_enum"`);
    }

}
