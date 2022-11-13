"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORM = void 0;
const tslib_1 = require("tslib");
const DbConfig_1 = require("./DbConfig");
const path_1 = tslib_1.__importDefault(require("path"));
const typeorm_1 = require("typeorm");
exports.ORM = new typeorm_1.DataSource({
    type: "postgres",
    host: DbConfig_1.DB_HOST,
    port: DbConfig_1.DB_PORT,
    username: DbConfig_1.DB_USER,
    password: DbConfig_1.DB_PASS,
    database: DbConfig_1.DB_NAME,
    entities: [path_1.default.join(__dirname, "../infras/data/entities/**/*{.js,.ts}")],
    migrations: [path_1.default.join(__dirname, "../infras/data/migrations/*{.js,.ts}")],
    logging: true,
    synchronize: false,
    ssl: true,
    extra: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
});
exports.default = {
    type: "postgres",
    host: DbConfig_1.DB_HOST,
    port: DbConfig_1.DB_PORT,
    username: DbConfig_1.DB_USER,
    password: DbConfig_1.DB_PASS,
    database: DbConfig_1.DB_NAME,
    entities: [path_1.default.join(__dirname, "../infras/data/entities/**/*{.js,.ts}")],
    migrations: [path_1.default.join(__dirname, "../infras/data/migrations/*{.js,.ts}")],
    logging: true,
    synchronize: false,
    cli: {
        entitiesDir: path_1.default.join(__dirname, "../").replace(process.cwd(), ".") +
            "/infras/data/entities",
        migrationsDir: path_1.default.join(__dirname, "../").replace(process.cwd(), ".") +
            "/infras/data/migrations",
    },
};
