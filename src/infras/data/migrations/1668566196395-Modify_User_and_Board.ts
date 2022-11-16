import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyUserAndBoard1668566196395 implements MigrationInterface {
    name = 'ModifyUserAndBoard1668566196395'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board" ALTER COLUMN "description" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board" ALTER COLUMN "description" SET NOT NULL`);
    }

}
