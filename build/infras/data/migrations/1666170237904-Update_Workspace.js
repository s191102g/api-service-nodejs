"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateWorkspace1666170237904 = void 0;
class UpdateWorkspace1666170237904 {
    constructor() {
        this.name = 'UpdateWorkspace1666170237904';
    }
    async up(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_5650371cc7972c69b945cef8e8"`);
        await queryRunner.query(`CREATE INDEX "IDX_5650371cc7972c69b945cef8e8" ON "workspace" ("user_id") WHERE deleted_at IS NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_5650371cc7972c69b945cef8e8"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_5650371cc7972c69b945cef8e8" ON "workspace" ("user_id") WHERE (deleted_at IS NULL)`);
    }
}
exports.UpdateWorkspace1666170237904 = UpdateWorkspace1666170237904;
