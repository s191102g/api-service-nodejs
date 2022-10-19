
import { createConnection, Connection, getConnection } from "typeorm";
import { Service } from "typedi";
import { IDbContext } from "../../core/shared/database/interfaces/IDbContext";
import ORM from "../../configs/ORM";
import { IDbConnection } from "../../core/shared/database/interfaces/IDbConnection";
import { SystemError } from "../../core/shared/exceptions/SystemError";
import { MessageError } from "../../core/shared/exceptions/message/MessageError";
import { DbConnection } from "./DbConnection";




@Service('db.context')
export class DbContext implements IDbContext {
  getConnection(connectionName = "default"): IDbConnection {
    let connection: Connection | null = null;
    try {
      connection = getConnection(connectionName);
    } catch {}
    if (!connection || !connection.isConnected) {
      throw new SystemError(
        MessageError.PARAM_NOT_EXISTS,
        "database connection"
      );
    }
    return new DbConnection(connection);
  }
   async connect(connectionName = "default"): Promise<void>  {
    
    let connection: Connection | undefined;
    try {
      connection = getConnection(connectionName);
    } catch (e) {}

    try {
      if (connection) {
        if (!connection.isConnected) {
          await connection.connect();
        }
      } else {
        await createConnection(ORM);
      }
      console.log("🌴 🌴 Database connection was successful!");
    } catch (e) {
      console.error("ERROR: Database connection failed!!", e);
      throw e;
    }
    
  }
}
