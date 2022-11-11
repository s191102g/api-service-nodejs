import { IDbConnection } from "./IDbConnection";


export interface IDbContext{
    // connect(connectionName: string): Promise<void>;
    // connect(): Promise<void>;

    createConnection(): Promise<IDbConnection>;
  createConnection(connectionName: string): Promise<IDbConnection>;

    getConnection(): IDbConnection;
    getConnection(connectionName: string): IDbConnection;

}
