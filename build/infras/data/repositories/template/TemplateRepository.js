"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardRepository = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const TemplateDb_1 = require("../../entities/template/TemplateDb");
const TemplateSchema_1 = require("../../schemas/template/TemplateSchema");
const BaseRepository_1 = require("../base/BaseRepository");
let BoardRepository = class BoardRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(TemplateDb_1.TemplateDb, TemplateSchema_1.TEMPLATE_SCHEMA);
    }
};
BoardRepository = tslib_1.__decorate([
    (0, typedi_1.Service)("template.repository"),
    tslib_1.__metadata("design:paramtypes", [])
], BoardRepository);
exports.BoardRepository = BoardRepository;
