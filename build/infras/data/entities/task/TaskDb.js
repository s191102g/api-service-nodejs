"use strict";
var TaskDb_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskDb = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Task_1 = require("../../../../core/domain/entities/task/Task");
const TaskSchema_1 = require("../../schemas/task/TaskSchema");
const BaseDbEntity_1 = require("../base/BaseDbEntity");
const DataDb_1 = require("../datas/DataDb");
let TaskDb = TaskDb_1 = class TaskDb extends BaseDbEntity_1.BaseDbEntity {
    toEntity() {
        return new Task_1.Task(this);
    }
    fromEntity(entity) {
        return entity.toData();
    }
};
tslib_1.__decorate([
    (0, typeorm_1.Column)("varchar", { name: TaskSchema_1.TASK_SCHEMA.COLUMNS.TITLE, length: 200 }),
    (0, typeorm_1.Index)({ unique: true, where: TaskDb_1.getIndexFilterDeletedColumn() }),
    tslib_1.__metadata("design:type", String)
], TaskDb.prototype, "title", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("text", { name: TaskSchema_1.TASK_SCHEMA.COLUMNS.CONTENT }),
    tslib_1.__metadata("design:type", String)
], TaskDb.prototype, "content", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("integer", { name: TaskSchema_1.TASK_SCHEMA.COLUMNS.POSITION }),
    tslib_1.__metadata("design:type", Number)
], TaskDb.prototype, "position", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("uuid", { name: TaskSchema_1.TASK_SCHEMA.COLUMNS.DATA_ID }),
    tslib_1.__metadata("design:type", String)
], TaskDb.prototype, "dataId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => DataDb_1.DataDb, (datas) => datas.tasks),
    (0, typeorm_1.JoinColumn)({ name: TaskSchema_1.TASK_SCHEMA.COLUMNS.DATA_ID }),
    tslib_1.__metadata("design:type", Object)
], TaskDb.prototype, "datas", void 0);
TaskDb = TaskDb_1 = tslib_1.__decorate([
    (0, typeorm_1.Entity)(TaskSchema_1.TASK_SCHEMA.TABLE_NAME)
], TaskDb);
exports.TaskDb = TaskDb;
