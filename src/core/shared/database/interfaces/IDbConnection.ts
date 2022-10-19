
import { IDbQueryRunner } from "./IDbQueryRunner";
import { TransactionIsolationLevel } from "../TransactionIsolationLevel";

export interface IDbConnection {
  clearCaching(keyCaching: string): Promise<void>;

  runTransaction<T>(
    runInTransaction: (queryRunner: IDbQueryRunner) => Promise<T>
  ): Promise<T>;
  runTransaction<T>(
    runInTransaction: (queryRunner: IDbQueryRunner) => Promise<T>,
    rollback: (error: Error) => Promise<void>
  ): Promise<T>;
  runTransaction<T>(
    runInTransaction: (queryRunner: IDbQueryRunner) => Promise<T>,
    rollback: (error: Error) => Promise<void>,
    done: () => Promise<void>
  ): Promise<T>;
  runTransaction<T>(
    runInTransaction: (queryRunner: IDbQueryRunner) => Promise<T>,
    rollback: (error: Error) => Promise<void>,
    done: () => Promise<void>,
    isolationLevel: TransactionIsolationLevel
  ): Promise<T>;

  
}
