"use strict";
var ClientDb_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientDb = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Client_1 = require("../../../../core/domain/entities/user/Client");
const userEnum_1 = require("../../../../core/domain/enums/userEnum");
const ClientSchema_1 = require("../../schemas/user/ClientSchema");
const WorkSpaceDb_1 = require("../workspace/WorkSpaceDb");
const UserDb_1 = require("./UserDb");
let ClientDb = ClientDb_1 = class ClientDb extends UserDb_1.UserDb {
    toEntity() {
        return new Client_1.Client(this);
    }
    fromEntity(entity) {
        return entity.toData();
    }
};
tslib_1.__decorate([
    (0, typeorm_1.Column)("varchar", { name: ClientSchema_1.CLIENT_SCHEMA.COLUMNS.USER_NAME, length: 50, nullable: true }),
    (0, typeorm_1.Index)({ unique: true, where: ClientDb_1.getIndexFilterDeletedColumn() }),
    tslib_1.__metadata("design:type", String)
], ClientDb.prototype, "userName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("varchar", { name: ClientSchema_1.CLIENT_SCHEMA.COLUMNS.PASS_WORD, length: 50 }),
    tslib_1.__metadata("design:type", String)
], ClientDb.prototype, "passWord", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("varchar", { name: ClientSchema_1.CLIENT_SCHEMA.COLUMNS.EMAIL, length: 50 }),
    (0, typeorm_1.Index)({ unique: true, where: ClientDb_1.getIndexFilterDeletedColumn() }),
    tslib_1.__metadata("design:type", String)
], ClientDb.prototype, "email", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("varchar", { name: ClientSchema_1.CLIENT_SCHEMA.COLUMNS.ACTIVEKEY, length: 20, nullable: true }),
    (0, typeorm_1.Index)(),
    tslib_1.__metadata("design:type", Object)
], ClientDb.prototype, "activeKey", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("enum", { name: ClientSchema_1.CLIENT_SCHEMA.COLUMNS.STATUS, enum: userEnum_1.StatusType, nullable: true }),
    tslib_1.__metadata("design:type", String)
], ClientDb.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => WorkSpaceDb_1.WorkSpaceDb, (workspaces) => workspaces.client),
    tslib_1.__metadata("design:type", Array)
], ClientDb.prototype, "workSpaces", void 0);
ClientDb = ClientDb_1 = tslib_1.__decorate([
    (0, typeorm_1.Entity)(ClientSchema_1.CLIENT_SCHEMA.TABLE_NAME)
], ClientDb);
exports.ClientDb = ClientDb;
