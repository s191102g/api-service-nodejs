"use strict";
var AdminDb_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminDb = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Admin_1 = require("../../../../core/domain/entities/user/Admin");
const AdminSchema_1 = require("../../schemas/user/AdminSchema");
const UserDb_1 = require("./UserDb");
let AdminDb = AdminDb_1 = class AdminDb extends UserDb_1.UserDb {
    toEntity() {
        return new Admin_1.Admin(this);
    }
    fromEntity(entity) {
        return entity.toData();
    }
};
tslib_1.__decorate([
    (0, typeorm_1.Column)("varchar", { name: AdminSchema_1.ADMIN_SCHEMA.COLUMNS.USER_NAME, length: 50, nullable: true }),
    (0, typeorm_1.Index)({ unique: true, where: AdminDb_1.getIndexFilterDeletedColumn() }),
    tslib_1.__metadata("design:type", String)
], AdminDb.prototype, "userName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("varchar", { name: AdminSchema_1.ADMIN_SCHEMA.COLUMNS.PASS_WORD, length: 50 }),
    tslib_1.__metadata("design:type", String)
], AdminDb.prototype, "passWord", void 0);
AdminDb = AdminDb_1 = tslib_1.__decorate([
    (0, typeorm_1.Entity)(AdminSchema_1.ADMIN_SCHEMA.TABLE_NAME)
], AdminDb);
exports.AdminDb = AdminDb;
