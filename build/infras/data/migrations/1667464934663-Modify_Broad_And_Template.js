"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModifyBroadAndTemplate1667464934663 = void 0;
class ModifyBroadAndTemplate1667464934663 {
    constructor() {
        this.name = 'ModifyBroadAndTemplate1667464934663';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "board" DROP CONSTRAINT "FK_262b64bba57c3fafd907d79a472"`);
        await queryRunner.query(`ALTER TABLE "board" DROP CONSTRAINT "REL_262b64bba57c3fafd907d79a47"`);
        await queryRunner.query(`ALTER TABLE "board" ADD CONSTRAINT "FK_262b64bba57c3fafd907d79a472" FOREIGN KEY ("template_id") REFERENCES "template"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "board" DROP CONSTRAINT "FK_262b64bba57c3fafd907d79a472"`);
        await queryRunner.query(`ALTER TABLE "board" ADD CONSTRAINT "REL_262b64bba57c3fafd907d79a47" UNIQUE ("template_id")`);
        await queryRunner.query(`ALTER TABLE "board" ADD CONSTRAINT "FK_262b64bba57c3fafd907d79a472" FOREIGN KEY ("template_id") REFERENCES "template"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.ModifyBroadAndTemplate1667464934663 = ModifyBroadAndTemplate1667464934663;
