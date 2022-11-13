"use strict";
var TemplateDb_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateDb = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Template_1 = require("../../../../core/domain/entities/template/Template");
const TemplateSchema_1 = require("../../schemas/template/TemplateSchema");
const BaseDbEntity_1 = require("../base/BaseDbEntity");
const BoardDb_1 = require("../board/BoardDb");
let TemplateDb = TemplateDb_1 = class TemplateDb extends BaseDbEntity_1.BaseDbEntity {
    toEntity() {
        return new Template_1.Template(this);
    }
    fromEntity(entity) {
        return entity.toData();
    }
};
tslib_1.__decorate([
    (0, typeorm_1.Column)("varchar", { name: TemplateSchema_1.TEMPLATE_SCHEMA.COLUMNS.TYPE_BY_STRING, length: 50 }),
    (0, typeorm_1.Index)({ unique: true, where: TemplateDb_1.getIndexFilterDeletedColumn() }),
    tslib_1.__metadata("design:type", String)
], TemplateDb.prototype, "typeByString", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("jsonb", { name: TemplateSchema_1.TEMPLATE_SCHEMA.COLUMNS.USAGE_FIELDS }),
    tslib_1.__metadata("design:type", Array)
], TemplateDb.prototype, "usageFields", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => BoardDb_1.BoardDb, (board) => board.template),
    tslib_1.__metadata("design:type", Object)
], TemplateDb.prototype, "board", void 0);
TemplateDb = TemplateDb_1 = tslib_1.__decorate([
    (0, typeorm_1.Entity)(TemplateSchema_1.TEMPLATE_SCHEMA.TABLE_NAME)
], TemplateDb);
exports.TemplateDb = TemplateDb;
