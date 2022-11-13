"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModifyWorkSpace1666509298833 = void 0;
class ModifyWorkSpace1666509298833 {
    constructor() {
        this.name = 'ModifyWorkSpace1666509298833';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "workspace" ADD "name" character varying(200) NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_406f56fc2a42ad5f541973cdbe" ON "workspace" ("name") `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_406f56fc2a42ad5f541973cdbe"`);
        await queryRunner.query(`ALTER TABLE "workspace" DROP COLUMN "name"`);
    }
}
exports.ModifyWorkSpace1666509298833 = ModifyWorkSpace1666509298833;
