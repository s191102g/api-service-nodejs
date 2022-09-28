
import { createConnection, Connection, getConnection } from "typeorm";
import { Service } from "typedi";
import ORM from "../../configs/ORM";
import { IDbContext } from "../../core/shared/database/interfaces/IDbContext";



@Service('db.context')
export class DbContext implements IDbContext {
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
      console.log("🌴 Database connection was successful!");
    } catch (e) {
      console.error("ERROR: Database connection failed!!", e);
      throw e;
    }

    return console.log('ok');
    
  }
}
