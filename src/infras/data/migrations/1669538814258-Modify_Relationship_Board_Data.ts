import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyRelationshipBoardData1669538814258 implements MigrationInterface {
    name = 'ModifyRelationshipBoardData1669538814258'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "data" DROP CONSTRAINT "FK_0f6b9046ec4321abd99a6de8796"`);
        await queryRunner.query(`ALTER TABLE "data" DROP CONSTRAINT "REL_0f6b9046ec4321abd99a6de879"`);
        await queryRunner.query(`ALTER TABLE "data" ADD CONSTRAINT "FK_0f6b9046ec4321abd99a6de8796" FOREIGN KEY ("board_id") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "data" DROP CONSTRAINT "FK_0f6b9046ec4321abd99a6de8796"`);
        await queryRunner.query(`ALTER TABLE "data" ADD CONSTRAINT "REL_0f6b9046ec4321abd99a6de879" UNIQUE ("board_id")`);
        await queryRunner.query(`ALTER TABLE "data" ADD CONSTRAINT "FK_0f6b9046ec4321abd99a6de8796" FOREIGN KEY ("board_id") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
