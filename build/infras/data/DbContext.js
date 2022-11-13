"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbContext = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const typedi_1 = require("typedi");
const ORM_1 = tslib_1.__importDefault(require("../../configs/ORM"));
const SystemError_1 = require("../../core/shared/exceptions/SystemError");
const MessageError_1 = require("../../core/shared/exceptions/message/MessageError");
const DbConnection_1 = require("./DbConnection");
let DbContext = class DbContext {
    getConnection(connectionName = "default") {
        let connection = null;
        try {
            connection = (0, typeorm_1.getConnection)(connectionName);
        }
        catch { }
        if (!connection || !connection.isConnected) {
            throw new SystemError_1.SystemError(MessageError_1.MessageError.PARAM_NOT_EXISTS, "database connection");
        }
        return new DbConnection_1.DbConnection(connection);
    }
    async createConnection(connectionName = "default") {
        let connection = null;
        try {
            connection = (0, typeorm_1.getConnection)(connectionName);
        }
        catch { }
        if (connection && connection.isConnected) {
            return new DbConnection_1.DbConnection(connection);
        }
        connection = await (0, typeorm_1.createConnection)({
            ...ORM_1.default,
            name: connectionName,
        });
        return new DbConnection_1.DbConnection(connection);
    }
};
DbContext = tslib_1.__decorate([
    (0, typedi_1.Service)('db.context')
], DbContext);
exports.DbContext = DbContext;
