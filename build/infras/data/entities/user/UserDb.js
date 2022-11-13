"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDb = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const User_1 = require("../../../../core/domain/entities/user/User");
const userEnum_1 = require("../../../../core/domain/enums/userEnum");
const UserSchema_1 = require("../../schemas/user/UserSchema");
const BaseDbEntity_1 = require("../base/BaseDbEntity");
let UserDb = class UserDb extends BaseDbEntity_1.BaseDbEntity {
    toEntity() {
        return new User_1.User(this);
    }
    fromEntity(entity) {
        return entity.toData();
    }
};
tslib_1.__decorate([
    (0, typeorm_1.Column)("varchar", { name: UserSchema_1.USER_SCHEMA.COLUMNS.ROLE, length: 10 }),
    (0, typeorm_1.Index)(),
    tslib_1.__metadata("design:type", String)
], UserDb.prototype, "role", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("varchar", { name: UserSchema_1.USER_SCHEMA.COLUMNS.FIRST_NAME, length: 50 }),
    tslib_1.__metadata("design:type", String)
], UserDb.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: UserSchema_1.USER_SCHEMA.COLUMNS.LAST_NAME,
        nullable: true,
        length: 50,
    }),
    tslib_1.__metadata("design:type", String)
], UserDb.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: UserSchema_1.USER_SCHEMA.COLUMNS.AVATAR,
        length: 200,
        nullable: true,
    }),
    tslib_1.__metadata("design:type", Object)
], UserDb.prototype, "avatar", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: UserSchema_1.USER_SCHEMA.COLUMNS.GENDER,
        length: 6,
        nullable: true,
    }),
    tslib_1.__metadata("design:type", Object)
], UserDb.prototype, "gender", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("timestamptz", { name: UserSchema_1.USER_SCHEMA.COLUMNS.BIRTHDAY, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], UserDb.prototype, "birthDay", void 0);
UserDb = tslib_1.__decorate([
    (0, typeorm_1.Entity)(UserSchema_1.USER_SCHEMA.TABLE_NAME)
], UserDb);
exports.UserDb = UserDb;
