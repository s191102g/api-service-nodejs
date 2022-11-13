"use strict";
var BoardDb_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardDb = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Board_1 = require("../../../../core/domain/entities/board/Board");
const boardEnum_1 = require("../../../../core/domain/enums/boardEnum");
const BoardSchema_1 = require("../../schemas/board/BoardSchema");
const BaseDbEntity_1 = require("../base/BaseDbEntity");
const DataDb_1 = require("../datas/DataDb");
const TemplateDb_1 = require("../template/TemplateDb");
const WorkSpaceDb_1 = require("../workspace/WorkSpaceDb");
let BoardDb = BoardDb_1 = class BoardDb extends BaseDbEntity_1.BaseDbEntity {
    toEntity() {
        return new Board_1.Board(this);
    }
    fromEntity(entity) {
        return entity.toData();
    }
};
tslib_1.__decorate([
    (0, typeorm_1.Column)("varchar", { name: BoardSchema_1.BOARD_SCHEMA.COLUMNS.TITLE, length: 200 }),
    (0, typeorm_1.Index)({ where: BoardDb_1.getIndexFilterDeletedColumn() }),
    tslib_1.__metadata("design:type", String)
], BoardDb.prototype, "title", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("varchar", { name: BoardSchema_1.BOARD_SCHEMA.COLUMNS.ICON, length: 200 }),
    tslib_1.__metadata("design:type", String)
], BoardDb.prototype, "icon", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("integer", { name: BoardSchema_1.BOARD_SCHEMA.COLUMNS.POSITION }),
    tslib_1.__metadata("design:type", Number)
], BoardDb.prototype, "position", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("text", { name: BoardSchema_1.BOARD_SCHEMA.COLUMNS.DESCRIPTION }),
    tslib_1.__metadata("design:type", String)
], BoardDb.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("enum", { name: BoardSchema_1.BOARD_SCHEMA.COLUMNS.FAVOURITE, enum: boardEnum_1.FavouriteType, default: boardEnum_1.FavouriteType.UnFavourite, }),
    tslib_1.__metadata("design:type", String)
], BoardDb.prototype, "favourite", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("integer", { name: BoardSchema_1.BOARD_SCHEMA.COLUMNS.FAVOURITE_POSITION }),
    tslib_1.__metadata("design:type", Number)
], BoardDb.prototype, "favouritePosition", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("uuid", { name: BoardSchema_1.BOARD_SCHEMA.COLUMNS.WORKSPACE_ID }),
    tslib_1.__metadata("design:type", String)
], BoardDb.prototype, "workSpaceId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("uuid", { name: BoardSchema_1.BOARD_SCHEMA.COLUMNS.TEMPLATE_ID }),
    tslib_1.__metadata("design:type", String)
], BoardDb.prototype, "templateId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => WorkSpaceDb_1.WorkSpaceDb, (workSpace) => workSpace.board),
    (0, typeorm_1.JoinColumn)({ name: BoardSchema_1.BOARD_SCHEMA.COLUMNS.WORKSPACE_ID }),
    tslib_1.__metadata("design:type", Object)
], BoardDb.prototype, "workSpace", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => TemplateDb_1.TemplateDb, (template) => template.board),
    (0, typeorm_1.JoinColumn)({ name: BoardSchema_1.BOARD_SCHEMA.COLUMNS.TEMPLATE_ID }),
    tslib_1.__metadata("design:type", Object)
], BoardDb.prototype, "template", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(() => DataDb_1.DataDb, (data) => data.board),
    tslib_1.__metadata("design:type", Array)
], BoardDb.prototype, "datas", void 0);
BoardDb = BoardDb_1 = tslib_1.__decorate([
    (0, typeorm_1.Entity)(BoardSchema_1.BOARD_SCHEMA.TABLE_NAME)
], BoardDb);
exports.BoardDb = BoardDb;
