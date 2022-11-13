"use strict";
var WorkSpaceDb_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkSpaceDb = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const WorkSpace_1 = require("../../../../core/domain/entities/workspace/WorkSpace");
const WorkSpaceSchema_1 = require("../../schemas/workspace/WorkSpaceSchema");
const BaseDbEntity_1 = require("../base/BaseDbEntity");
const BoardDb_1 = require("../board/BoardDb");
const ClientDb_1 = require("../user/ClientDb");
let WorkSpaceDb = WorkSpaceDb_1 = class WorkSpaceDb extends BaseDbEntity_1.BaseDbEntity {
    toEntity() {
        return new WorkSpace_1.WorkSpace(this);
    }
    fromEntity(entity) {
        return entity.toData();
    }
};
tslib_1.__decorate([
    (0, typeorm_1.Column)("varchar", { name: WorkSpaceSchema_1.WORKSPACE_SCHEMA.COLUMNS.NAME, length: 200 }),
    (0, typeorm_1.Index)(),
    tslib_1.__metadata("design:type", String)
], WorkSpaceDb.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("varchar", { name: WorkSpaceSchema_1.WORKSPACE_SCHEMA.COLUMNS.IMAGE, length: 200 }),
    tslib_1.__metadata("design:type", String)
], WorkSpaceDb.prototype, "image", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("jsonb", { name: WorkSpaceSchema_1.WORKSPACE_SCHEMA.COLUMNS.MEMBER }),
    tslib_1.__metadata("design:type", Array)
], WorkSpaceDb.prototype, "member", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("uuid", { name: WorkSpaceSchema_1.WORKSPACE_SCHEMA.COLUMNS.USER_ID }),
    (0, typeorm_1.Index)({ where: WorkSpaceDb_1.getIndexFilterDeletedColumn() }),
    tslib_1.__metadata("design:type", String)
], WorkSpaceDb.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => ClientDb_1.ClientDb, (client) => client.workSpaces),
    (0, typeorm_1.JoinColumn)({ name: WorkSpaceSchema_1.WORKSPACE_SCHEMA.COLUMNS.USER_ID }),
    tslib_1.__metadata("design:type", Object)
], WorkSpaceDb.prototype, "client", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => BoardDb_1.BoardDb, (board) => board.workSpace),
    tslib_1.__metadata("design:type", Array)
], WorkSpaceDb.prototype, "board", void 0);
WorkSpaceDb = WorkSpaceDb_1 = tslib_1.__decorate([
    (0, typeorm_1.Entity)(WorkSpaceSchema_1.WORKSPACE_SCHEMA.TABLE_NAME)
], WorkSpaceDb);
exports.WorkSpaceDb = WorkSpaceDb;
