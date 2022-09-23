

export interface IDbContext{
    connect(connectionName: string): Promise<void>;
    connect(): Promise<void>;
}
