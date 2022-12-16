import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyTaskAndClient1671178256853 implements MigrationInterface {
    name = 'ModifyTaskAndClient1671178256853'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "dead_line" character varying`);
        await queryRunner.query(`CREATE TYPE "public"."client_pay_enum" AS ENUM('ispay', 'notpay')`);
        await queryRunner.query(`ALTER TABLE "client" ADD "pay" "public"."client_pay_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "pay"`);
        await queryRunner.query(`DROP TYPE "public"."client_pay_enum"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "dead_line"`);
    }

}
