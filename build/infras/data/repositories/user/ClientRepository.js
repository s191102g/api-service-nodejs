"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientRepository = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const ClientDb_1 = require("../../entities/user/ClientDb");
const ClientSchema_1 = require("../../schemas/user/ClientSchema");
const BaseRepository_1 = require("../base/BaseRepository");
let ClientRepository = class ClientRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(ClientDb_1.ClientDb, ClientSchema_1.CLIENT_SCHEMA);
    }
    async CheckUserExist(param) {
        const result = await this.repository
            .createQueryBuilder(ClientSchema_1.CLIENT_SCHEMA.TABLE_NAME)
            .where(`LOWER(${ClientSchema_1.CLIENT_SCHEMA.TABLE_NAME}.${ClientSchema_1.CLIENT_SCHEMA.COLUMNS.EMAIL}) = LOWER(:email)`, { email: param })
            .getOne();
        return !!result;
    }
    async getByEmail(email) {
        const query = this.repository
            .createQueryBuilder(ClientSchema_1.CLIENT_SCHEMA.TABLE_NAME)
            .where(`LOWER(${ClientSchema_1.CLIENT_SCHEMA.TABLE_NAME}.${ClientSchema_1.CLIENT_SCHEMA.COLUMNS.EMAIL}) = LOWER(:email)`, { email });
        const result = await query.getOne();
        return result ? result.toEntity() : null;
    }
};
ClientRepository = tslib_1.__decorate([
    (0, typedi_1.Service)('client.repository'),
    tslib_1.__metadata("design:paramtypes", [])
], ClientRepository);
exports.ClientRepository = ClientRepository;
