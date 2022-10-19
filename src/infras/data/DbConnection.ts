
import { Connection } from "typeorm";
import { IDbConnection } from "../../core/shared/database/interfaces/IDbConnection";
import { IDbQueryRunner } from "../../core/shared/database/interfaces/IDbQueryRunner";
import { TransactionIsolationLevel } from "../../core/shared/database/TransactionIsolationLevel";
import { MessageError } from "../../core/shared/exceptions/message/MessageError";
import { SystemError } from "../../core/shared/exceptions/SystemError";

export class DbConnection implements IDbConnection {
  constructor(private _connection: Connection) {}
 

  async clearCaching(keyCaching: string): Promise<void> {
    if (!keyCaching) {
      throw new SystemError(MessageError.PARAM_REQUIRED, "key caching");
    }

    if (!this._connection.queryResultCache) {
      throw new SystemError(
        MessageError.PARAM_NOT_SUPPORTED,
        "caching feature"
      );
    }

    await this._connection.queryResultCache.remove([keyCaching]);
  }

  async runTransaction<T>(
    runInTransaction: (queryRunner: IDbQueryRunner) => Promise<T>,
    rollback: ((error: Error) => Promise<void>) | null = null,
    done: (() => Promise<void>) | null = null,
    isolationLevel: TransactionIsolationLevel | null = null
  ): Promise<T> {
    const queryRunner = this._connection.createQueryRunner();
    if (isolationLevel) {
      await queryRunner.startTransaction(isolationLevel);
    } else {
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
