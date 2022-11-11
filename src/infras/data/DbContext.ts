
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

  async createConnection(connectionName = "default"): Promise<IDbConnection> {
    let connection: Connection | null = null;
    try {
      connection = getConnection(connectionName);
    } catch {}
    if (connection && connection.isConnected) {
      return new DbConnection(connection);
    }

    connection = await createConnection({
      ...ORM,
      name: connectionName,
    } as any);
    return new DbConnection(connection);
  }
}
