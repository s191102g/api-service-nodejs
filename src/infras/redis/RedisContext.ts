/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */


import redis, { createClient } from "redis";
import { Service } from "typedi"; 
import { DB_CACHING_HOST, DB_CACHING_PASSWORD, DB_CACHING_PORT, DB_CACHING_PREFIX } from "../../configs/DbConfig";
import { IRedisContext } from "../../core/shared/database/interfaces/IRedisContext";
import { MessageError } from "../../core/shared/exceptions/message/MessageError";
import { SystemError } from "../../core/shared/exceptions/SystemError";
@Service("redis.context")
export class RedisContext implements IRedisContext {
  private _connection: any;

  constructor(connection?: any) {
    if (connection) {
      this._connection = connection;
    }
  }

  get redisClient(): any {
    if (!this._connection) {
      throw new SystemError(MessageError.PARAM_NOT_EXISTS, "redis connection");
    }
    return this._connection;
  }

 async createConnection(): Promise<any>  {
    if (this._connection && this._connection.connected) {
      return this._connection;
    }

    this._connection = createClient({
      host: DB_CACHING_HOST,
      port: DB_CACHING_PORT,
      password: DB_CACHING_PASSWORD,
      prefix: DB_CACHING_PREFIX,
    } as redis.RedisClientOptions) ;
    this._connection.on("error",(error)=>{
       console.error(error);
       
    })
   await this._connection.connect()
    return this._connection;
  }
}

