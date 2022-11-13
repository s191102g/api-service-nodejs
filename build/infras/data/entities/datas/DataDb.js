"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataDb = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Data_1 = require("../../../../core/domain/entities/datas/Data");
const DataSchema_1 = require("../../schemas/datas/DataSchema");
const BaseDbEntity_1 = require("../base/BaseDbEntity");
const BoardDb_1 = require("../board/BoardDb");
const TaskDb_1 = require("../task/TaskDb");
let DataDb = class DataDb extends BaseDbEntity_1.BaseDbEntity {
    toEntity() {
        return new Data_1.Data(this);
    }
    fromEntity(entity) {
        return entity.toData();
    }
};
tslib_1.__decorate([
    (0, typeorm_1.Column)("varchar", { name: DataSchema_1.DATA_SCHEMA.COLUMNS.HEADING, length: 200 }),
    tslib_1.__metadata("design:type", String)
], DataDb.prototype, "heading", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("uuid", { name: DataSchema_1.DATA_SCHEMA.COLUMNS.BOARD_ID }),
    tslib_1.__metadata("design:type", String)
], DataDb.prototype, "boardId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(() => BoardDb_1.BoardDb, (board) => board.datas),
    (0, typeorm_1.JoinColumn)({ name: DataSchema_1.DATA_SCHEMA.COLUMNS.BOARD_ID }),
    tslib_1.__metadata("design:type", Object)
], DataDb.prototype, "board", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => TaskDb_1.TaskDb, (task) => task.datas),
    tslib_1.__metadata("design:type", Array)
], DataDb.prototype, "tasks", void 0);
DataDb = tslib_1.__decorate([
    (0, typeorm_1.Entity)(DataSchema_1.DATA_SCHEMA.TABLE_NAME)
], DataDb);
exports.DataDb = DataDb;
