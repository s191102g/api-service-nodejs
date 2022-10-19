import { IDbConnection } from "./IDbConnection";


export interface IDbContext{
    connect(connectionName: string): Promise<void>;
    connect(): Promise<void>;

    getConnection(): IDbConnection;
    getConnection(connectionName: string): IDbConnection;

}
