"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRepository = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const AdminDb_1 = require("../../entities/user/AdminDb");
const AdminSchema_1 = require("../../schemas/user/AdminSchema");
const BaseRepository_1 = require("../base/BaseRepository");
let AdminRepository = class AdminRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(AdminDb_1.AdminDb, AdminSchema_1.ADMIN_SCHEMA);
    }
    async getByUsername(username) {
        const query = this.repository
            .createQueryBuilder(AdminSchema_1.ADMIN_SCHEMA.TABLE_NAME)
            .where(`LOWER(${AdminSchema_1.ADMIN_SCHEMA.TABLE_NAME}.${AdminSchema_1.ADMIN_SCHEMA.COLUMNS.USER_NAME}) = LOWER(:username)`, { username });
        const result = await query.getOne();
        return result ? result.toEntity() : null;
    }
};
AdminRepository = tslib_1.__decorate([
    (0, typedi_1.Service)('admin.repository'),
    tslib_1.__metadata("design:paramtypes", [])
], AdminRepository);
exports.AdminRepository = AdminRepository;
