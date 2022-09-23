"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SangDb = void 0;
const typeorm_1 = require("typeorm");
const Sang_1 = require("../../../../core/domain/entities/sang/Sang");
const SangSchema_1 = require("../../schemas/sang/SangSchema");
const BaseDbEntity_1 = require("../base/BaseDbEntity");
let SangDb = class SangDb extends BaseDbEntity_1.BaseDbEntity {
    toEntity() {
        return new Sang_1.Sang(this);
    }
    fromEntity(entity) {
        return entity.toData();
    }
};
__decorate([
    (0, typeorm_1.Column)("varchar", { name: SangSchema_1.SANG_SCHEMA.COLUMNS.NAME, length: 50 }),
    __metadata("design:type", String)
], SangDb.prototype, "name", void 0);
SangDb = __decorate([
    (0, typeorm_1.Entity)(SangSchema_1.SANG_SCHEMA.TABLE_NAME)
], SangDb);
exports.SangDb = SangDb;
