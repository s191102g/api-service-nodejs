

export interface IRedisContext {
  readonly redisClient: any;

  createConnection(): Promise<any> ;
  createConnection(redisLib: any): Promise<any>;
}
