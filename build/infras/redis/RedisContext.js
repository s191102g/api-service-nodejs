"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisContext = void 0;
const tslib_1 = require("tslib");
const redis_1 = require("redis");
const typedi_1 = require("typedi");
const DbConfig_1 = require("../../configs/DbConfig");
const MessageError_1 = require("../../core/shared/exceptions/message/MessageError");
const SystemError_1 = require("../../core/shared/exceptions/SystemError");
let RedisContext = class RedisContext {
    constructor(connection) {
        if (connection) {
            this._connection = connection;
        }
    }
    get redisClient() {
        if (!this._connection) {
            throw new SystemError_1.SystemError(MessageError_1.MessageError.PARAM_NOT_EXISTS, "redis connection");
        }
        return this._connection;
    }
    async createConnection() {
        if (this._connection && this._connection.connected) {
            return this._connection;
        }
        this._connection = (0, redis_1.createClient)({
            host: DbConfig_1.DB_CACHING_HOST,
            port: DbConfig_1.DB_CACHING_PORT,
            password: DbConfig_1.DB_CACHING_PASSWORD,
            prefix: DbConfig_1.DB_CACHING_PREFIX,
        });
        this._connection.on("error", (error) => {
            console.error(error);
        });
        await this._connection.connect();
        return this._connection;
    }
};
RedisContext = tslib_1.__decorate([
    (0, typedi_1.Service)("redis.context"),
    tslib_1.__metadata("design:paramtypes", [Object])
], RedisContext);
exports.RedisContext = RedisContext;
