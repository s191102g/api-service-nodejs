import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } from "./DbConfig";
import path from "path";
import { DataSource, ConnectionOptions } from "typeorm";

export const ORM = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  entities: [path.join(__dirname, "../infras/data/entities/**/*{.js,.ts}")],
  migrations: [path.join(__dirname, "../infras/data/migrations/*{.js,.ts}")],
  logging: true,
  synchronize: false,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
// export default {
//     type: "postgres",
//     host: DB_HOST,
//     port: DB_PORT,
//     username: DB_USER,
//     password: DB_PASS,
//     database: DB_NAME,
//     entities: [path.join(__dirname, '../infras/data/entities/**/*{.js,.ts}')],
//     migrations: [path.join(__dirname, "../infras/data/migrations/*{.js,.ts}")],
//     logging: true,
//     synchronize: false,
//     cli: {
//       entitiesDir:
//       path.join(__dirname, "../").replace(process.cwd(), ".") +
//       "/infras/data/entities",
//     migrationsDir:
//       path.join(__dirname, "../").replace(process.cwd(), ".") +
//       "/infras/data/migrations",
//     },
//   ssl: true,
//   extra: {
//   ssl: {
//     "rejectUnauthorized": false
//   }
// },
// } as ConnectionOptions

export default {
  type: "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  entities: [path.join(__dirname, "../infras/data/entities/**/*{.js,.ts}")],
  migrations: [path.join(__dirname, "../infras/data/migrations/*{.js,.ts}")],
  logging: true,
  synchronize: false,
  cli: {
    entitiesDir:
      path.join(__dirname, "../").replace(process.cwd(), ".") +
      "/infras/data/entities",
    migrationsDir:
      path.join(__dirname, "../").replace(process.cwd(), ".") +
      "/infras/data/migrations",
  },
} as ConnectionOptions;
