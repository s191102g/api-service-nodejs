"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConnection = void 0;
const MessageError_1 = require("../../core/shared/exceptions/message/MessageError");
const SystemError_1 = require("../../core/shared/exceptions/SystemError");
class DbConnection {
    constructor(_connection) {
        this._connection = _connection;
    }
    async clearCaching(keyCaching) {
        if (!keyCaching) {
            throw new SystemError_1.SystemError(MessageError_1.MessageError.PARAM_REQUIRED, "key caching");
        }
        if (!this._connection.queryResultCache) {
            throw new SystemError_1.SystemError(MessageError_1.MessageError.PARAM_NOT_SUPPORTED, "caching feature");
        }
        await this._connection.queryResultCache.remove([keyCaching]);
    }
    async runTransaction(runInTransaction, rollback = null, done = null, isolationLevel = null) {
        const queryRunner = this._connection.createQueryRunner();
        if (isolationLevel) {
            await queryRunner.startTransaction(isolationLevel);
        }
        else {
            await queryRunner.startTransaction();
        }
        return await runInTransaction(queryRunner)
            .then(async (result) => {
            await queryRunner.commitTransaction();
            await queryRunner.release();
            if (done) {
                await done();
            }
            return result;
        })
            .catch(async (error) => {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            if (rollback) {
                await rollback(error);
            }
            throw error;
        });
    }
}
exports.DbConnection = DbConnection;
