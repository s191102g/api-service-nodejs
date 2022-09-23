
import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } from "./DbConfig"
import path from "path"
import { ConnectionOptions } from "typeorm";

export default {
    type: "postgres",
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    entities: [path.join(__dirname, '../infras/data/entities/**/*{.js,.ts}')],
    migrations: [
        path.join(__dirname, "../infras/data/migrations/*{.js,.ts}"),
      ],
    logging: true,
    synchronize: false,
} as ConnectionOptions

