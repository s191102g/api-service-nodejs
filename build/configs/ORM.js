"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DbConfig_1 = require("./DbConfig");
const path_1 = __importDefault(require("path"));
exports.default = {
    type: "postgres",
    host: DbConfig_1.DB_HOST,
    port: DbConfig_1.DB_PORT,
    username: DbConfig_1.DB_USER,
    password: DbConfig_1.DB_PASS,
    database: DbConfig_1.DB_NAME,
    entities: [path_1.default.join(__dirname, '../infras/data/entities/**/*{.js,.ts}')],
    migrations: [
        path_1.default.join(__dirname, "../infras/data/migrations/*{.js,.ts}"),
    ],
    logging: true,
    synchronize: false,
};
