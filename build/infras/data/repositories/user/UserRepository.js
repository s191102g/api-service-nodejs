"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientRepository = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const UserDb_1 = require("../../entities/user/UserDb");
const UserSchema_1 = require("../../schemas/user/UserSchema");
const BaseRepository_1 = require("../base/BaseRepository");
let ClientRepository = class ClientRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(UserDb_1.UserDb, UserSchema_1.USER_SCHEMA);
    }
};
ClientRepository = tslib_1.__decorate([
    (0, typedi_1.Service)('user.repository'),
    tslib_1.__metadata("design:paramtypes", [])
], ClientRepository);
exports.ClientRepository = ClientRepository;
