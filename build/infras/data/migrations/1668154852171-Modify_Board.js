"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModifyBoard1668154852171 = void 0;
class ModifyBoard1668154852171 {
    constructor() {
        this.name = 'ModifyBoard1668154852171';
    }
    async up(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_f84b6556e851c5aa76be7b5304"`);
        await queryRunner.query(`CREATE INDEX "IDX_f84b6556e851c5aa76be7b5304" ON "board" ("title") WHERE deleted_at IS NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_f84b6556e851c5aa76be7b5304"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_f84b6556e851c5aa76be7b5304" ON "board" ("title") WHERE (deleted_at IS NULL)`);
    }
}
exports.ModifyBoard1668154852171 = ModifyBoard1668154852171;
