import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyBoard1668521353066 implements MigrationInterface {
    name = 'ModifyBoard1668521353066'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board" ALTER COLUMN "icon" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "board" ALTER COLUMN "position" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "board" ALTER COLUMN "favourite_position" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board" ALTER COLUMN "favourite_position" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "board" ALTER COLUMN "position" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "board" ALTER COLUMN "icon" SET NOT NULL`);
    }

}
