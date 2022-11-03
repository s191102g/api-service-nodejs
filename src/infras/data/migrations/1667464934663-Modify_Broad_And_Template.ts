import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyBroadAndTemplate1667464934663 implements MigrationInterface {
    name = 'ModifyBroadAndTemplate1667464934663'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board" DROP CONSTRAINT "FK_262b64bba57c3fafd907d79a472"`);
        await queryRunner.query(`ALTER TABLE "board" DROP CONSTRAINT "REL_262b64bba57c3fafd907d79a47"`);
        await queryRunner.query(`ALTER TABLE "board" ADD CONSTRAINT "FK_262b64bba57c3fafd907d79a472" FOREIGN KEY ("template_id") REFERENCES "template"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board" DROP CONSTRAINT "FK_262b64bba57c3fafd907d79a472"`);
        await queryRunner.query(`ALTER TABLE "board" ADD CONSTRAINT "REL_262b64bba57c3fafd907d79a47" UNIQUE ("template_id")`);
        await queryRunner.query(`ALTER TABLE "board" ADD CONSTRAINT "FK_262b64bba57c3fafd907d79a472" FOREIGN KEY ("template_id") REFERENCES "template"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
