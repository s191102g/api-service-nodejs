"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRelationshipTask1666155246067 = void 0;
class UpdateRelationshipTask1666155246067 {
    constructor() {
        this.name = 'UpdateRelationshipTask1666155246067';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_b5bd7850f0e80fdf5bfa59e5331" FOREIGN KEY ("data-id") REFERENCES "data"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_b5bd7850f0e80fdf5bfa59e5331"`);
    }
}
exports.UpdateRelationshipTask1666155246067 = UpdateRelationshipTask1666155246067;
